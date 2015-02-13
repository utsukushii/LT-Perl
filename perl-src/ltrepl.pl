use IO::Socket::INET;
use Cwd;
use JSON;
use PPI;
use Devel::REPL;

$| = 1;

use constant DEBUG        => 0;
use constant LOG_FILENAME => "/lighttable.log";


my $port           = $ARGV[0];
my $client_id      = $ARGV[1];
my $socket;

init_connection($port, $client_id, \$socket);

handle_request(
  port         => $port,
  socket       => $socket,
);


sub close_stdout_stderr {
  close(STDOUT);
  close(STDERR);
}

sub get_forms
# Purpose:  "parse" the code with PPI and return a list of "forms" that
#           we can later eval individually with the repl.
# Input:    A string of forms.
# Output:   An array of forms.
{
  my ( $code ) = @_;

  my $ppi_obj   = PPI::Document->new(\$code);
  $ppi_obj->index_locations;

  my @forms = ();
  my @elems = $ppi_obj->elements;

  for my $elem ( @elems ) {
    my $line = $elem->line_number;
    my $form = "";
    my @tokens = $elem->tokens;
    for my $token ( @tokens ) {
      $form .= $token->add_content();
    }
    push @forms, {form => $form, send => 1, start => $line - 1 };
  }

  # Add the "end" line number for each "form".
  my $end = $elems[$#elems]->line_number;
  for my $index ( reverse 1 .. $#elems ) {
    $forms[$index]->{end} = $end - 1;
    $end = $elems[$index]->line_number;
  }

  return @forms;
}

sub get_log_filename
# Purpose: Gets the name of the default log file.
# Input:   N/A
# Output:  The filename.
{
  my $cwd       = cwd();
  my $logfile   = $cwd . LOG_FILENAME();
  return $logfile;
}

sub get_result
# Purpose:  Collapse results from repl eval into a string.
# Input:    An array of results (from a single eval).
# Output:   A string.
{
  my (@results) = @_;
  my $result = join "", @results;

  # XXX: Remove newlines from most forms, e.g. arrays, hashes, etc., except
  #      from subs since they look better with newlines.
  if ( $result !~ /^sub/ ) {
    $result =~ s/\n//g;
  }

  return $result;
}

sub get_init_code
# Purpose:  Builds some code that gets eval'd before all client code.
# Input:    The port to use.
# Output:   A string of code.
{
  my ($port) = @_;

  my $code = '
    package ltinit;

    use IO::Socket::INET;
    use JSON;

    our $watch = sub {
      my ($exp, $meta_json) = @_;

      my $socket = new IO::Socket::INET(
        PeerHost => "127.0.0.1",
        PeerPort => ' . $port . ',
        Proto    => "tcp",
      ) or die "ERROR in Socket Creation for eval : $!\n";

      my $meta_hr = decode_json($meta_json);
      my $id      = $meta_hr->{"obj"};
      my $data_ar = [undef, "clients.raise-on-object", [$id, "editor.eval.perl.watch", {"meta" => $meta_hr, "result" => $exp }]];
      my $data    = encode_json( $data_ar );
      print $socket "$data\n";

      return $exp;
    };

    1;
  ';

  return $code;
}

sub handle_form
# Purpose:  Handles a single code form (i.e. evals and sends the
#           results to the lighttable server).
# Input:    A hash of params:
#           (
#               id       => $id,
#               name     => $name,
#               form_hr  => $form_hr,
#               repl_obj => $repl_obj,
#           )
# Output:   None.
{
  my (%params) = @_;

  my $id           = $params{id};
  my $name         = $params{name};
  my $form_hr      = $params{form_hr};
  my $repl_obj     = $params{repl_obj};

  my $form = $form_hr->{form};

  unless ( trim($form) ){
    next;
  }

  my $start     = $form_hr->{start};
  my $end       = $form_hr->{end};

  my ($stdout, $stderr) = ("", "");
  redirect_stdout_stderr(\$stdout, \$stderr);

  my @results = ();
  my $compiled = $repl_obj->compile($form);

  if (defined($compiled) and not $repl_obj->is_error($compiled)) {
    @results = $repl_obj->format($repl_obj->execute($compiled));
  } else {
    @results = $repl_obj->format($compiled);
  }

  close_stdout_stderr();

  my $result    = get_result(@results);
  my $send      = $form_hr->{send};

  # When a compilation error occurs the repl eval returns an incorrect 
  # line number so fix it with the real line number.
  if ($repl_obj->is_error($compiled)) {
	my $line_number = ++$start;
    $result =~ s/line (\d+)\./line $line_number./g;
  }

  next unless $send;

  if (is_success($form, $result)) {
    transmit($socket, [$id, "editor.eval.perl.success", { "meta" => { "start" => $start, "end" => $end } }]);
  } else {
    transmit($socket, [$id, "editor.eval.perl.result", { "result" => $result, "meta" => { "start" => $start, "end" => $end } }]);
  }

  if ($stdout) {
    transmit($socket, [$id, "editor.eval.perl.print", { "file" => $name, "msg" => $stdout }]);
  } elsif ($stderr) {
    transmit($socket, [$id, "editor.eval.perl.print", { "file" => $name, "msg" => $stderr }]);
  }
}

sub handle_request
# Purpose:  Handles a user request to eval some code.
# Input:    A hash of params:
#           (
#               port   => $port,
#               socket => $socket,
#           )
# Output:   None.
{
  my (%params) = @_;

  my $port         = $params{port};
  my $socket       = $params{socket};
  my $msg          = "";

  $msg = <$socket>;
  logger($msg) if ( DEBUG );

  my $repl_obj = Devel::REPL->new;
  $repl_obj->load_plugin($_) for qw( History LexEnv MultiLine::PPI DDC );

  my $ref       = decode_json($msg);
  my $id        = $ref->[0] + 0;
  my $code      = $ref->[2]->{'code'};
  my $name      = $ref->[2]->{'name'};
  my $path      = $ref->[2]->{'path'};
  my @raw_forms = get_forms( $code );
  my @forms     = reorder_forms( @raw_forms );

  unshift @forms, { form => get_init_code($port), send => 0};

  for my $form_hr (@forms) {
    handle_form(
      id            => $id,
      name          => $name,
      form_hr       => $form_hr,
      repl_obj      => $repl_obj,
    );
  }

  $socket->close();
}

sub init_connection
# Purpose:  Initializes the connection to the lighttable server.
# Input:    1. The port.
#           2. The client id.
#           3. The socket.
# Output:   None.
{
  my ($port, $client_id, $socket) = @_;

  my $cwd          = cwd();
  my @tokens       = split /\//, $cwd;
  my $name         = pop @tokens;

  $$socket = new IO::Socket::INET(
    PeerHost => '127.0.0.1',
    PeerPort => $port,
    Proto    => 'tcp',
  ) or die "ERROR in Socket Creation : $!\n";

  my $data_hr = {
    "name"      => $name,
    "client-id" => $client_id + 0,
    "dir"       => $cwd,
    "commands"  => ['editor.eval.perl'],
    "type"      => "perl"
  };

  # Send initial connection data.
  transmit($$socket, $data_hr);

  # Tell server we are connected.
  print STDOUT "Connected\n";
}

sub is_success
# Purpose:  Evaluates a form and its result to see if we should send a
#           "success" message to the lighttable server instead of a "result"
#           message.
# Input:    1. A form.
#           2. The result of evaling the form.
# Output:   Boolean.
{
  my ($form, $result) = @_;

  return 1 if ( $form =~ /^sub/ && !$result );
  return 1 if ( $form =~ /^print/ && $result );
}

sub logger
# Purpose:  Log some data to the default log file for debugging.
# Input:    The string to log.
# Output:   None.
{
  my ( $str ) = @_;

  my $filename = get_log_filename();
  open(IFILE, ">>$filename") or die "ERROR: Can not open logfile! $!\n";
  print IFILE $str, "\n";
  close(IFILE);
}

sub redirect_stdout_stderr
# Purpose:  Redirects STDOUT and STDERR to some variables.
# Input:    1. A reference to a variable to hold output to STDOUT.
#           2. A reference to a variable to hold output to STDERR.
# Output:   None.
{
  my ($stdout_ref, $stderr_ref) = @_;

  close(STDOUT);
  open(STDOUT, ">", $stdout_ref);

  close(STDERR);
  open(STDERR, ">", $stderr_ref);
}

sub reorder_forms
# Purpose:  Reorder an array of forms to bubble "subs" to the top. This is to
#           ensure that subs are available to expressions that call them.
# Input:    An array of forms.
# Output:   An array of forms.
{
  my (@forms) = @_;

  my @reordered_forms;
  my @nonsub_forms;

  for my $form_hr (@forms) {
    my $form = $form_hr->{form};

    if ( $form =~ /^sub/ ) {
      push @reordered_forms, $form_hr;
    } else {
      push @nonsub_forms, $form_hr;
    }
  }

  map { push @reordered_forms, $_ } @nonsub_forms;

  return @reordered_forms;
}

sub transmit
# Purpose:  Send the data back to the light table server.
# Input:    1. The socket to use.
#           2. A reference to the data.
# Output:   None.
{
  my ($socket, $data_ref) = @_;
  my $data = encode_json( $data_ref );
  logger($data) if ( DEBUG );
  print $socket "$data\n";
}

sub trim
# Purpose:  Trims the whitespace around the string.
# Input:    A string.
# Output:   A string sans any whitespace before or after non-whitespace characters.
{
  my ($str) = @_;

  $str =~ s/^\s+|\s+$//;

  return $str;
}
