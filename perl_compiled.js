if(!lt.util.load.provided_QMARK_('lt.objs.langs.perl')) {
goog.provide('lt.objs.langs.perl');
goog.require('cljs.core');
goog.require('lt.util.cljs');
goog.require('lt.objs.plugins');
goog.require('lt.objs.files');
goog.require('lt.objs.platform');
goog.require('lt.objs.popup');
goog.require('lt.objs.dialogs');
goog.require('lt.objs.popup');
goog.require('lt.objs.notifos');
goog.require('lt.objs.proc');
goog.require('lt.objs.notifos');
goog.require('clojure.string');
goog.require('lt.util.cljs');
goog.require('lt.objs.command');
goog.require('lt.objs.platform');
goog.require('lt.objs.files');
goog.require('lt.objs.clients.tcp');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.plugins');
goog.require('lt.plugins.watches');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.clients.tcp');
goog.require('lt.util.load');
goog.require('clojure.string');
goog.require('lt.plugins.watches');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.dialogs');
goog.require('lt.util.load');
goog.require('lt.objs.console');
goog.require('lt.objs.proc');
goog.require('lt.objs.console');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.command');
goog.require('lt.objs.editor');
lt.objs.langs.perl.shell = lt.util.load.node_module.call(null,"shelljs");
lt.objs.langs.perl.perl_path = lt.objs.files.join.call(null,lt.objs.plugins._STAR_plugin_dir_STAR_,"perl-src/ltrepl.pl");
lt.objs.langs.perl.liveness = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"live","live",1017226334),false], null));
lt.objs.langs.perl.__BEH__on_out = (function __BEH__on_out(this$,data){var out = data.toString();lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"buffer","buffer",3930752946)], null),cljs.core.str,out);
if((out.indexOf("Connected") > -1))
{lt.objs.notifos.done_working.call(null);
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connected","connected",4729661051),true], null));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","on-out","lt.objs.langs.perl/on-out",3005273039),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__on_out,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.out","proc.out",4302083112),null], null), null));
lt.objs.langs.perl.__BEH__on_error = (function __BEH__on_error(this$,data){var out = data.toString();if((new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).indexOf("Connected") > -1))
{return null;
} else
{return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"buffer","buffer",3930752946)], null),cljs.core.str,data);
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","on-error","lt.objs.langs.perl/on-error",1838246529),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__on_error,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.error","proc.error",4143512802),null], null), null));
lt.objs.langs.perl.__BEH__on_exit = (function __BEH__on_exit(this$,data){if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",4729661051).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))
{} else
{lt.objs.notifos.done_working.call(null);
lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"We couldn't connect.",new cljs.core.Keyword(null,"body","body",1016933652),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1017440956),"Looks like there was an issue trying to connect\n                                                      to the project. Here's what we got:",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",1014015509),new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))], null)], null),new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"close"], null)], null)], null));
lt.objs.clients.rem_BANG_.call(null,new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
}
lt.objs.proc.kill_all.call(null,new cljs.core.Keyword(null,"procs","procs",1120844623).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
return lt.object.destroy_BANG_.call(null,this$);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","on-exit","lt.objs.langs.perl/on-exit",4689566195),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__on_exit,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.exit","proc.exit",4162906152),null], null), null));
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","connecting-notifier","lt.objs.langs.perl/connecting-notifier",1634433282),new cljs.core.Keyword(null,"triggers","triggers",2516997421),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"behaviors","behaviors",607554515),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.langs.perl","on-exit","lt.objs.langs.perl/on-exit",4689566195),new cljs.core.Keyword("lt.objs.langs.perl","on-error","lt.objs.langs.perl/on-error",1838246529),new cljs.core.Keyword("lt.objs.langs.perl","on-out","lt.objs.langs.perl/on-out",3005273039)], null),new cljs.core.Keyword(null,"init","init",1017141378),(function (this$,client){lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"client","client",3951159101),client,new cljs.core.Keyword(null,"buffer","buffer",3930752946),""], null));
return null;
}));
lt.objs.langs.perl.escape_behaviors = (function escape_behaviors(s){if(cljs.core._EQ_.call(null,lt.objs.files.separator,"\\"))
{return [cljs.core.str("\""),cljs.core.str(s),cljs.core.str("\"")].join('');
} else
{return s;
}
});
lt.objs.langs.perl.run_perl = (function run_perl(p__7852){var map__7854 = p__7852;var map__7854__$1 = ((cljs.core.seq_QMARK_.call(null,map__7854))?cljs.core.apply.call(null,cljs.core.hash_map,map__7854):map__7854);var info = map__7854__$1;var client = cljs.core.get.call(null,map__7854__$1,new cljs.core.Keyword(null,"client","client",3951159101));var name = cljs.core.get.call(null,map__7854__$1,new cljs.core.Keyword(null,"name","name",1017277949));var project_path = cljs.core.get.call(null,map__7854__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var path = cljs.core.get.call(null,map__7854__$1,new cljs.core.Keyword(null,"path","path",1017337751));var n = lt.objs.notifos.working.call(null,"Connecting..");var obj = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.langs.perl","connecting-notifier","lt.objs.langs.perl/connecting-notifier",1634433282),client);var env = cljs.core.PersistentArrayMap.EMPTY;var cmd = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"command","command",1964298941),(function (){var or__6371__auto__ = new cljs.core.Keyword(null,"perl-exe","perl-exe",1448629670).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.langs.perl.perl));if(cljs.core.truth_(or__6371__auto__))
{return or__6371__auto__;
} else
{return "perl";
}
})(),new cljs.core.Keyword(null,"args","args",1016906831),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.langs.perl.escape_behaviors.call(null,lt.objs.langs.perl.perl_path),lt.objs.clients.tcp.port,lt.objs.clients.__GT_id.call(null,client)], null),new cljs.core.Keyword(null,"cwd","cwd",1014003170),project_path,new cljs.core.Keyword(null,"env","env",1014004831),env,new cljs.core.Keyword(null,"obj","obj",1014014057),obj], null);return lt.objs.proc.exec.call(null,cmd);
});
lt.objs.langs.perl.check_perl = (function check_perl(obj){var path = (function (){var or__6371__auto__ = new cljs.core.Keyword(null,"perl-exe","perl-exe",1448629670).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.langs.perl.perl));if(cljs.core.truth_(or__6371__auto__))
{return or__6371__auto__;
} else
{return lt.objs.langs.perl.shell.which("perl");
}
})();return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"perl","perl",1017341537),path);
});
lt.objs.langs.perl.check_client = (function check_client(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"perl-client","perl-client",2524611547),lt.objs.files.exists_QMARK_.call(null,lt.objs.langs.perl.perl_path));
});
lt.objs.langs.perl.find_project = (function find_project(obj){var p = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(obj);var roots = lt.objs.files.get_roots.call(null);var cur = p;var prev = "";while(true){
if(cljs.core.truth_((function (){var or__6371__auto__ = cljs.core.empty_QMARK_.call(null,cur);if(or__6371__auto__)
{return or__6371__auto__;
} else
{var or__6371__auto____$1 = roots.call(null,cur);if(cljs.core.truth_(or__6371__auto____$1))
{return or__6371__auto____$1;
} else
{return cljs.core._EQ_.call(null,cur,prev);
}
}
})()))
{return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"project-path","project-path",1907176907),null);
} else
{if(cljs.core.truth_((function (){var and__6359__auto__ = cljs.core.not.call(null,lt.objs.files.exists_QMARK_.call(null,lt.objs.files.join.call(null,cur,"Gemfile")));if(and__6359__auto__)
{return lt.objs.files.dir_QMARK_.call(null,cur);
} else
{return and__6359__auto__;
}
})()))
{return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"project-path","project-path",1907176907),cur);
} else
{{
var G__7896 = lt.objs.files.parent.call(null,cur);
var G__7897 = cur;
cur = G__7896;
prev = G__7897;
continue;
}
}
}
break;
}
});
lt.objs.langs.perl.notify = (function notify(obj){var map__7856 = obj;var map__7856__$1 = ((cljs.core.seq_QMARK_.call(null,map__7856))?cljs.core.apply.call(null,cljs.core.hash_map,map__7856):map__7856);var client = cljs.core.get.call(null,map__7856__$1,new cljs.core.Keyword(null,"client","client",3951159101));var perl_client = cljs.core.get.call(null,map__7856__$1,new cljs.core.Keyword(null,"perl-client","perl-client",2524611547));var path = cljs.core.get.call(null,map__7856__$1,new cljs.core.Keyword(null,"path","path",1017337751));var project_path = cljs.core.get.call(null,map__7856__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var perl = cljs.core.get.call(null,map__7856__$1,new cljs.core.Keyword(null,"perl","perl",1017341537));if((cljs.core.not.call(null,perl)) || (cljs.core.empty_QMARK_.call(null,perl)))
{lt.objs.clients.rem_BANG_.call(null,client);
lt.objs.notifos.done_working.call(null);
lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"We couldn't find Perl.",new cljs.core.Keyword(null,"body","body",1016933652),"In order to evaluate in Perl files, a Perl interpreter has to be installed and on your system PATH.",new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Download Perl",new cljs.core.Keyword(null,"action","action",3885920680),((function (map__7856,map__7856__$1,client,perl_client,path,project_path,perl){
return (function (){return lt.objs.platform.open.call(null,"http://www.perl.org/get.html");
});})(map__7856,map__7856__$1,client,perl_client,path,project_path,perl))
], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"ok"], null)], null)], null));
} else
{if(cljs.core.not.call(null,project_path))
{lt.objs.clients.rem_BANG_.call(null,client);
lt.objs.notifos.done_working.call(null);
lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"We couldn't find this file.",new cljs.core.Keyword(null,"body","body",1016933652),"In order to evaluate in Perl files, the file has to be on disk somewhere.",new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Save this file",new cljs.core.Keyword(null,"action","action",3885920680),((function (map__7856,map__7856__$1,client,perl_client,path,project_path,perl){
return (function (){lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"save","save",1017427183));
return lt.objs.langs.perl.try_connect.call(null,obj);
});})(map__7856,map__7856__$1,client,perl_client,path,project_path,perl))
], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Cancel",new cljs.core.Keyword(null,"action","action",3885920680),((function (map__7856,map__7856__$1,client,perl_client,path,project_path,perl){
return (function (){return null;
});})(map__7856,map__7856__$1,client,perl_client,path,project_path,perl))
], null)], null)], null));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{lt.objs.langs.perl.run_perl.call(null,obj);
} else
{}
}
}
return obj;
});
lt.objs.langs.perl.check_all = (function check_all(obj){return lt.objs.langs.perl.notify.call(null,lt.objs.langs.perl.find_project.call(null,lt.objs.langs.perl.check_client.call(null,lt.objs.langs.perl.check_perl.call(null,obj))));
});
lt.objs.langs.perl.try_connect = (function try_connect(p__7857){var map__7859 = p__7857;var map__7859__$1 = ((cljs.core.seq_QMARK_.call(null,map__7859))?cljs.core.apply.call(null,cljs.core.hash_map,map__7859):map__7859);var info = cljs.core.get.call(null,map__7859__$1,new cljs.core.Keyword(null,"info","info",1017141280));var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(info);var client = lt.objs.clients.client_BANG_.call(null,new cljs.core.Keyword(null,"perl.client","perl.client",3412115228));lt.objs.langs.perl.check_all.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path","path",1017337751),path,new cljs.core.Keyword(null,"client","client",3951159101),client], null));
return client;
});
lt.objs.langs.perl.perl_watch = (function perl_watch(meta,src){var meta__$1 = JSON.stringify(cljs.core.clj__GT_js.call(null,meta));return [cljs.core.str("$ltinit::watch->("),cljs.core.str(src),cljs.core.str(", '"),cljs.core.str(meta__$1),cljs.core.str("')")].join('');
});
lt.objs.langs.perl.__BEH__watch_src = (function __BEH__watch_src(editor,cur,meta,src){return lt.objs.langs.perl.perl_watch.call(null,meta,src);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","watch-src","lt.objs.langs.perl/watch-src",3599139669),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__watch_src,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watch.src+","watch.src+",868749304),null], null), null));
lt.objs.langs.perl.__BEH__eval_on_change = (function __BEH__eval_on_change(this$){if(cljs.core.truth_(new cljs.core.Keyword(null,"live","live",1017226334).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.langs.perl.liveness))))
{return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"eval","eval",1017029646),true);
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","eval-on-change","lt.objs.langs.perl/eval-on-change",4660466388),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__eval_on_change,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"change","change",3947235106),null], null), null),new cljs.core.Keyword(null,"debounce","debounce",1556599227),800);
lt.objs.langs.perl.__BEH__on_eval = (function __BEH__on_eval(editor){return lt.object.raise.call(null,lt.objs.langs.perl.perl,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),cljs.core.assoc.call(null,cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",1017141280)),new cljs.core.Keyword(null,"code","code",1016963423),lt.plugins.watches.watched_range.call(null,editor,null,null,lt.objs.langs.perl.perl_watch))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","on-eval","lt.objs.langs.perl/on-eval",4689568625),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__on_eval,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval","eval",1017029646),null], null), null));
lt.objs.langs.perl.__BEH__on_eval__DOT__one = (function __BEH__on_eval__DOT__one(editor){var code = lt.plugins.watches.watched_range.call(null,editor,null,null,lt.objs.langs.perl.perl_watch);var pos = lt.objs.editor.__GT_cursor.call(null,editor);var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));var info__$1 = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,editor))?cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.editor.selection.call(null,editor),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"start")),new cljs.core.Keyword(null,"end","end",1014004813),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"end"))], null)):cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"pos","pos",1014015430),pos,new cljs.core.Keyword(null,"code","code",1016963423),code));return lt.object.raise.call(null,lt.objs.langs.perl.perl,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),info__$1], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","on-eval.one","lt.objs.langs.perl/on-eval.one",4663460841),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__on_eval__DOT__one,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval.one","eval.one",1173589382),null], null), null));
lt.objs.langs.perl.__BEH__perl_watch = (function __BEH__perl_watch(editor,res){var temp__4092__auto__ = cljs.core.get.call(null,new cljs.core.Keyword(null,"watches","watches",2139868463).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)),new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)));if(cljs.core.truth_(temp__4092__auto__))
{var watch = temp__4092__auto__;var str_result = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);return lt.object.raise.call(null,new cljs.core.Keyword(null,"inline-result","inline-result",656479555).cljs$core$IFn$_invoke$arity$1(watch),new cljs.core.Keyword(null,"update!","update!",779473898),str_result);
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","perl-watch","lt.objs.langs.perl/perl-watch",798860960),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__perl_watch,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.perl.watch","editor.eval.perl.watch",1407165075),null], null), null));
lt.objs.langs.perl.__BEH__perl_result = (function __BEH__perl_result(editor,res){lt.objs.notifos.done_working.call(null);
return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","perl-result","lt.objs.langs.perl/perl-result",1121508962),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__perl_result,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.perl.result","editor.eval.perl.result",4475591549),null], null), null));
lt.objs.langs.perl.__BEH__perl_success = (function __BEH__perl_success(editor,res){lt.objs.notifos.done_working.call(null);
return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),"\u2713",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","perl-success","lt.objs.langs.perl/perl-success",811778828),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__perl_success,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.perl.success","editor.eval.perl.success",2282279239),null], null), null));
lt.objs.langs.perl.__BEH__perl_exception = (function __BEH__perl_exception(editor,ex){lt.objs.notifos.done_working.call(null);
return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.exception","editor.exception",3983021184),new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(ex),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(ex)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(ex))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","perl-exception","lt.objs.langs.perl/perl-exception",1159344928),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__perl_exception,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.perl.exception","editor.eval.perl.exception",687027475),null], null), null));
lt.objs.langs.perl.image = (function image(src){var e__7768__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1014008629),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",1014018390),[cljs.core.str("data:image/png;base64,"),cljs.core.str(src)].join('')], null)], null));var seq__7866_7898 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,cljs.core.PersistentVector.EMPTY));var chunk__7867_7899 = null;var count__7868_7900 = 0;var i__7869_7901 = 0;while(true){
if((i__7869_7901 < count__7868_7900))
{var vec__7870_7902 = cljs.core._nth.call(null,chunk__7867_7899,i__7869_7901);var ev__7769__auto___7903 = cljs.core.nth.call(null,vec__7870_7902,0,null);var func__7770__auto___7904 = cljs.core.nth.call(null,vec__7870_7902,1,null);lt.util.dom.on.call(null,e__7768__auto__,ev__7769__auto___7903,func__7770__auto___7904);
{
var G__7905 = seq__7866_7898;
var G__7906 = chunk__7867_7899;
var G__7907 = count__7868_7900;
var G__7908 = (i__7869_7901 + 1);
seq__7866_7898 = G__7905;
chunk__7867_7899 = G__7906;
count__7868_7900 = G__7907;
i__7869_7901 = G__7908;
continue;
}
} else
{var temp__4092__auto___7909 = cljs.core.seq.call(null,seq__7866_7898);if(temp__4092__auto___7909)
{var seq__7866_7910__$1 = temp__4092__auto___7909;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7866_7910__$1))
{var c__7119__auto___7911 = cljs.core.chunk_first.call(null,seq__7866_7910__$1);{
var G__7912 = cljs.core.chunk_rest.call(null,seq__7866_7910__$1);
var G__7913 = c__7119__auto___7911;
var G__7914 = cljs.core.count.call(null,c__7119__auto___7911);
var G__7915 = 0;
seq__7866_7898 = G__7912;
chunk__7867_7899 = G__7913;
count__7868_7900 = G__7914;
i__7869_7901 = G__7915;
continue;
}
} else
{var vec__7871_7916 = cljs.core.first.call(null,seq__7866_7910__$1);var ev__7769__auto___7917 = cljs.core.nth.call(null,vec__7871_7916,0,null);var func__7770__auto___7918 = cljs.core.nth.call(null,vec__7871_7916,1,null);lt.util.dom.on.call(null,e__7768__auto__,ev__7769__auto___7917,func__7770__auto___7918);
{
var G__7919 = cljs.core.next.call(null,seq__7866_7910__$1);
var G__7920 = null;
var G__7921 = 0;
var G__7922 = 0;
seq__7866_7898 = G__7919;
chunk__7867_7899 = G__7920;
count__7868_7900 = G__7921;
i__7869_7901 = G__7922;
continue;
}
}
} else
{}
}
break;
}
return e__7768__auto__;
});
lt.objs.langs.perl.canvas = (function canvas(){var e__7768__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"canvas","canvas",3941165258)], null));var seq__7878_7923 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,cljs.core.PersistentVector.EMPTY));var chunk__7879_7924 = null;var count__7880_7925 = 0;var i__7881_7926 = 0;while(true){
if((i__7881_7926 < count__7880_7925))
{var vec__7882_7927 = cljs.core._nth.call(null,chunk__7879_7924,i__7881_7926);var ev__7769__auto___7928 = cljs.core.nth.call(null,vec__7882_7927,0,null);var func__7770__auto___7929 = cljs.core.nth.call(null,vec__7882_7927,1,null);lt.util.dom.on.call(null,e__7768__auto__,ev__7769__auto___7928,func__7770__auto___7929);
{
var G__7930 = seq__7878_7923;
var G__7931 = chunk__7879_7924;
var G__7932 = count__7880_7925;
var G__7933 = (i__7881_7926 + 1);
seq__7878_7923 = G__7930;
chunk__7879_7924 = G__7931;
count__7880_7925 = G__7932;
i__7881_7926 = G__7933;
continue;
}
} else
{var temp__4092__auto___7934 = cljs.core.seq.call(null,seq__7878_7923);if(temp__4092__auto___7934)
{var seq__7878_7935__$1 = temp__4092__auto___7934;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7878_7935__$1))
{var c__7119__auto___7936 = cljs.core.chunk_first.call(null,seq__7878_7935__$1);{
var G__7937 = cljs.core.chunk_rest.call(null,seq__7878_7935__$1);
var G__7938 = c__7119__auto___7936;
var G__7939 = cljs.core.count.call(null,c__7119__auto___7936);
var G__7940 = 0;
seq__7878_7923 = G__7937;
chunk__7879_7924 = G__7938;
count__7880_7925 = G__7939;
i__7881_7926 = G__7940;
continue;
}
} else
{var vec__7883_7941 = cljs.core.first.call(null,seq__7878_7935__$1);var ev__7769__auto___7942 = cljs.core.nth.call(null,vec__7883_7941,0,null);var func__7770__auto___7943 = cljs.core.nth.call(null,vec__7883_7941,1,null);lt.util.dom.on.call(null,e__7768__auto__,ev__7769__auto___7942,func__7770__auto___7943);
{
var G__7944 = cljs.core.next.call(null,seq__7878_7935__$1);
var G__7945 = null;
var G__7946 = 0;
var G__7947 = 0;
seq__7878_7923 = G__7944;
chunk__7879_7924 = G__7945;
count__7880_7925 = G__7946;
i__7881_7926 = G__7947;
continue;
}
}
} else
{}
}
break;
}
return e__7768__auto__;
});
lt.objs.langs.perl.__BEH__perl_image = (function __BEH__perl_image(editor,img){return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.result.underline","editor.result.underline",541343758),lt.objs.langs.perl.image.call(null,new cljs.core.Keyword(null,"image","image",1114217677).cljs$core$IFn$_invoke$arity$1(img)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(img)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(img))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","perl-image","lt.objs.langs.perl/perl-image",819821860),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__perl_image,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.perl.image","editor.eval.perl.image",1394575135),null], null), null));
lt.objs.langs.perl.__BEH__perl_printer = (function __BEH__perl_printer(editor,p){return lt.objs.console.loc_log.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"file","file",1017047278),lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"file","file",1017047278).cljs$core$IFn$_invoke$arity$1(p)),new cljs.core.Keyword(null,"line","line",1017226086),"stdout",new cljs.core.Keyword(null,"content","content",1965434859),new cljs.core.Keyword(null,"msg","msg",1014012659).cljs$core$IFn$_invoke$arity$1(p)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","perl-printer","lt.objs.langs.perl/perl-printer",4643830499),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__perl_printer,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.perl.print","editor.eval.perl.print",1401196657),null], null), null));
lt.objs.langs.perl.__BEH__eval_BANG_ = (function __BEH__eval_BANG_(this$,event){var map__7885 = event;var map__7885__$1 = ((cljs.core.seq_QMARK_.call(null,map__7885))?cljs.core.apply.call(null,cljs.core.hash_map,map__7885):map__7885);var origin = cljs.core.get.call(null,map__7885__$1,new cljs.core.Keyword(null,"origin","origin",4300251800));var info = cljs.core.get.call(null,map__7885__$1,new cljs.core.Keyword(null,"info","info",1017141280));var client = new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,origin)));lt.objs.notifos.working.call(null,"");
return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"editor.eval.perl","editor.eval.perl",3156689202),new cljs.core.Keyword(null,"origin","origin",4300251800),origin,new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"create","create",3956577390),lt.objs.langs.perl.try_connect], null)),new cljs.core.Keyword(null,"editor.eval.perl","editor.eval.perl",3156689202),info,new cljs.core.Keyword(null,"only","only",1017320222),origin);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","eval!","lt.objs.langs.perl/eval!",1868095276),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__eval_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval!","eval!",1110791799),null], null), null));
lt.objs.langs.perl.__BEH__connect = (function __BEH__connect(this$,path){return lt.objs.langs.perl.try_connect.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",1017337751),path], null)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","connect","lt.objs.langs.perl/connect",2382824017),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__connect,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1965255772),null], null), null));
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","perl-lang","lt.objs.langs.perl/perl-lang",2465613875),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"perl.lang","perl.lang",1606600959),null], null), null));
lt.objs.langs.perl.perl = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.langs.perl","perl-lang","lt.objs.langs.perl/perl-lang",2465613875));
lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"Perl",new cljs.core.Keyword(null,"desc","desc",1016984067),"Select a directory to serve as the root of your perl project.",new cljs.core.Keyword(null,"connect","connect",1965255772),(function (){return lt.objs.dialogs.dir.call(null,lt.objs.langs.perl.perl,new cljs.core.Keyword(null,"connect","connect",1965255772));
})], null));
lt.objs.langs.perl.__BEH__perl_exe = (function __BEH__perl_exe(this$,exe){return lt.object.merge_BANG_.call(null,lt.objs.langs.perl.perl,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"perl-exe","perl-exe",1448629670),exe], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.perl","perl-exe","lt.objs.langs.perl/perl-exe",1798953947),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.langs.perl.__BEH__perl_exe,new cljs.core.Keyword(null,"desc","desc",1016984067),"Perl: Set the path to the perl executable for clients",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"path",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"path","path",1017337751)], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"instarepl.toggle-live","instarepl.toggle-live",2218373139),new cljs.core.Keyword(null,"desc","desc",1016984067),"Perl: Toggle instarepl mode",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (this$){if(cljs.core.truth_(new cljs.core.Keyword(null,"live","live",1017226334).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.langs.perl.liveness))))
{return cljs.core.swap_BANG_.call(null,lt.objs.langs.perl.liveness,cljs.core.conj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"live","live",1017226334),false], null));
} else
{return cljs.core.swap_BANG_.call(null,lt.objs.langs.perl.liveness,cljs.core.conj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"live","live",1017226334),true], null));
}
})], null));
}

//# sourceMappingURL=perl_compiled.js.map