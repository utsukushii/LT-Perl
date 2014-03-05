(ns lt.objs.langs.perl
  (:require [lt.object :as object]
            [lt.objs.eval :as eval]
            [lt.objs.console :as console]
            [lt.objs.command :as cmd]
            [lt.objs.clients.tcp :as tcp]
            [lt.objs.sidebar.clients :as scl]
            [lt.objs.dialogs :as dialogs]
            [lt.objs.files :as files]
            [lt.objs.popup :as popup]
            [lt.objs.platform :as platform]
            [lt.objs.editor :as ed]
            [lt.objs.plugins :as plugins]
            [lt.plugins.watches :as watches]
            [lt.objs.proc :as proc]
            [clojure.string :as string]
            [lt.objs.clients :as clients]
            [lt.objs.notifos :as notifos]
            [lt.util.load :as load]
            [lt.util.cljs :refer [js->clj]])
  (:require-macros [lt.macros :refer [behavior defui]]))

;;****************************************************
;; Proc
;;****************************************************

(def shell (load/node-module "shelljs"))
(def perl-path (files/join plugins/*plugin-dir* "perl-src/ltrepl.pl"))
(def liveness (atom { :live false }))

(behavior ::on-out
                  :triggers #{:proc.out}
                  :reaction (fn [this data]
                              (let [out (.toString data)]
                                (object/update! this [:buffer] str out)
                                (when (> (.indexOf out "Connected") -1)
                                  (do
                                    (notifos/done-working)
                                    (object/merge! this {:connected true})
                                    ;(object/destroy! this)
                                    )))))

(behavior ::on-error
                  :triggers #{:proc.error}
                  :reaction (fn [this data]
                              (let [out (.toString data)]
                                (when-not (> (.indexOf (:buffer @this) "Connected") -1)
                                  (object/update! this [:buffer] str data)
                                  ))
                              ))

(behavior ::on-exit
                  :triggers #{:proc.exit}
                  :reaction (fn [this data]
                              ;(object/update! this [:buffer] str data)
                              (when-not (:connected @this)
                                (notifos/done-working)
                                (popup/popup! {:header "We couldn't connect."
                                               :body [:span "Looks like there was an issue trying to connect
                                                      to the project. Here's what we got:" [:pre (:buffer @this)]]
                                               :buttons [{:label "close"}]})
                                (clients/rem! (:client @this)))
                              (proc/kill-all (:procs @this))
                              (object/destroy! this)
                              ))

(object/object* ::connecting-notifier
                :triggers []
                :behaviors [::on-exit ::on-error ::on-out]
                :init (fn [this client]
                        (object/merge! this {:client client :buffer ""})
                        nil))

(defn escape-behaviors [s]
  (if (= files/separator "\\")
    (str "\"" s "\"")
    s))


(defn run-perl [{:keys [path project-path name client] :as info}]
  (let [n (notifos/working "Connecting..")
        obj (object/create ::connecting-notifier client)
        env {}
        cmd {:command (or (:perl-exe @perl) "perl")
                :args [(escape-behaviors perl-path) tcp/port (clients/->id client)]
                :cwd project-path
                :env env
                :obj obj}
        ;result (doall (print (str "Run-Perl: " cmd)))
        ]
    (proc/exec cmd)
    ))




(defn check-perl [obj]
  (let [path (or (:perl-exe @perl) (.which shell "perl"))
        ;result (doall (println (str "Perl-Path: " path)))
        ]
  (assoc obj :perl path)))

(defn check-client [obj]
  (assoc obj :perl-client (files/exists? perl-path)))

(defn find-project [obj]
  (let [p (:path obj)
        roots (files/get-roots)]
    (loop [cur p
           prev ""]
      (if (or (empty? cur)
              (roots cur)
              (= cur prev))
        (assoc obj :project-path nil)
        (if (and (not (files/exists? (files/join cur "Gemfile")))
                 (files/dir? cur))
          (assoc obj :project-path cur)
          (recur (files/parent cur) cur))))))

(defn notify [obj]
  (let [{:keys [perl project-path path perl-client client]} obj]
    (cond
     (or (not perl) (empty? perl)) (do
                                         (clients/rem! client)
                                         (notifos/done-working)
                                         (popup/popup! {:header "We couldn't find Perl."
                                                      :body "In order to evaluate in Perl files, a Perl interpreter has to be installed and on your system PATH."
                                                      :buttons [{:label "Download Perl"
                                                                 :action (fn []
                                                                           (platform/open "http://www.perl.org/get.html"))}
                                                                {:label "ok"}]}))
     (not project-path) (do
                          (clients/rem! client)
                          (notifos/done-working)
                          (popup/popup! {:header "We couldn't find this file."
                                       :body "In order to evaluate in Perl files, the file has to be on disk somewhere."
                                       :buttons [{:label "Save this file"
                                                  :action (fn []
                                                            (cmd/exec! :save)
                                                            (try-connect obj))}
                                                 {:label "Cancel"
                                                  :action (fn []
                                                            )}]}))
     :else (run-perl obj))
    obj))

(defn check-all [obj]
  (-> obj
      (check-perl)
      (check-client)
      (find-project)
      (notify)
      ))

;;****************************************************
;; Eval
;;****************************************************

(defn try-connect [{:keys [info]}]
  (let [path (:path info)
        client (clients/client! :perl.client)]
    (check-all {:path path
                :client client})
    client))

(defn perl-watch [meta src]
  (let [meta (js/JSON.stringify (clj->js meta))]
    (str "$ltinit::watch->(" src ", '" meta "')")))

(behavior ::watch-src
                  :triggers #{:watch.src+}
                  :reaction (fn [editor cur meta src]
                              (perl-watch meta src)))

(behavior ::eval-on-change
          :triggers #{:change}
          :debounce 300
          :reaction (fn [this]
                        (if (:live @liveness)
                          (do
                            (object/raise this :eval true)))))

(behavior ::on-eval
                  :triggers #{:eval}
                  :reaction (fn [editor]
                              (object/raise perl :eval! {:origin editor
                                                             :info (assoc (@editor :info)
                                                                     :code (watches/watched-range editor nil nil perl-watch))})))

(behavior ::on-eval.one
                  :triggers #{:eval.one}
                  :reaction (fn [editor]
                              (let [code (watches/watched-range editor nil nil perl-watch)
                                    pos (ed/->cursor editor)
                                    info (:info @editor)
                                    info (if (ed/selection? editor)
                                           (assoc info
                                             :code (ed/selection editor)
                                             :meta {:start (-> (ed/->cursor editor "start") :line)
                                                    :end (-> (ed/->cursor editor "end") :line)})
                                           (assoc info :pos pos :code code))]
                                (object/raise perl :eval! {:origin editor
                                                             :info info}))))

(behavior ::perl-watch
                  :triggers #{:editor.eval.perl.watch}
                  :reaction (fn [editor res]
                              (when-let [watch (get (:watches @editor) (-> res :meta :id))]
                                (let [str-result (:result res)]
                                  (object/raise (:inline-result watch) :update! str-result)))))

(behavior ::perl-result
                  :triggers #{:editor.eval.perl.result}
                  :reaction (fn [editor res]
                              (notifos/done-working)
                              (object/raise editor :editor.result (:result res) {:line (:end (:meta res))
                                                                                 :start-line (-> res :meta :start)})))

(behavior ::perl-success
                  :triggers #{:editor.eval.perl.success}
                  :reaction (fn [editor res]
                              (notifos/done-working)
                              (object/raise editor :editor.result "✓" {:line (-> res :meta :end)
                                                                       :start-line (-> res :meta :start)})))

(behavior ::perl-exception
                  :triggers #{:editor.eval.perl.exception}
                  :reaction (fn [editor ex]
                              (notifos/done-working)
                              (object/raise editor :editor.exception (:ex ex) {:line (-> ex :meta :end)
                                                                               :start-line (-> ex :meta :start)})
                              ))

(defui image [src]
  [:img {:src (str "data:image/png;base64," src)}])

(defui canvas []
  [:canvas])

(behavior ::perl-image
                  :triggers #{:editor.eval.perl.image}
                  :reaction (fn [editor img]
                              ;(console/log (pr-str img))
                              (object/raise editor :editor.result.underline (image (:image img)) {:line (-> img :meta :end)
                                                                                                  :start-line (-> img :meta :start)})
                              ))

(behavior ::perl-printer
                  :triggers #{:editor.eval.perl.print}
                  :reaction (fn [editor p]
                              (console/loc-log {:file (files/basename (:file p))
                                                :line "stdout"
                                                :content (:msg p)})))

(behavior ::eval!
                  :triggers #{:eval!}
                  :reaction (fn [this event]
                              (let [{:keys [info origin]} event
                                    client (-> @origin :client :default)]
                                (notifos/working "")
                                (clients/send (eval/get-client! {:command :editor.eval.perl
                                                                 :origin origin
                                                                 :info info
                                                                 :create try-connect})
                                              :editor.eval.perl
                                              info
                                              :only
                                              origin))))

(behavior ::connect
                  :triggers #{:connect}
                  :reaction (fn [this path]
                              (try-connect {:info {:path path}})))


(object/object* ::perl-lang
                :tags #{:perl.lang})

(def perl (object/create ::perl-lang))

(scl/add-connector {:name "Perl"
                    :desc "Select a directory to serve as the root of your perl project."
                    :connect (fn []
                               (dialogs/dir perl :connect))})

(behavior ::perl-exe
                  :triggers #{:object.instant}
                  :desc "Perl: Set the path to the perl executable for clients"
                  :type :user
                  :params [{:label "path"
                            :type :path}]
                  :exclusive true
                  :reaction (fn [this exe]
                              (object/merge! perl {:perl-exe exe})))

(cmd/command {:command :instarepl.toggle-live
              :desc "Perl: Toggle instarepl mode"
              :exec (fn [this]
                          (if (:live @liveness)
                            (swap! liveness conj {:live false})
                            (swap! liveness conj {:live true})))})

