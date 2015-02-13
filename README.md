## Perl Plugin for Light Table

This plugin for [Light Table](http://www.lighttable.com) implements the following features for the Perl language:

  * REPL (Read Eval Print Loop) - The result of evaling a Perl expression gets placed to the right of your code.
  * Instarepl (Instant Read Eval Print Loop) - The code is evaluated as you type. 
  * Watches - You can expose variables used to compute an expression.

## Installation

  From within LightTable perform the following actions:

  1. Run the `Plugins: Show plugin manager` command to select Perl from the available plugin list.
  2. Run the `App: Reload behaviors` command from within LightTable or restart LightTable.

  Note, on Windows you may have to set the path to Perl in user.behaviors with `:editor.perl [(:lt.objs.langs.perl/perl-exe "C:\\Perl\\bin\\perl.exe")]`

## Requirements

You will need to ensure that the following Perl modules are installed on your machine. Some of these come with system Perl.

  * IO::Socket::INET
  * Cwd
  * JSON
  * PPI
  * Devel::REPL
  * Devel::REPL::Plugin::History
  * Devel::REPL::Plugin::LexEnv
  * Devel::REPL::Plugin::MultiLine::PPI
  * Devel::REPL::Plugin::DDC
  * Data::Dumper::Concise
  * Lexical::Persistence

The easiest way to do that is to use [cpanm](http://search.cpan.org/~miyagawa/App-cpanminus-1.7001/bin/cpanm). If you do not have cpanm on your system then you can [install it rather easily](http://search.cpan.org/~miyagawa/App-cpanminus-1.7001/lib/App/cpanminus.pm#Installing_to_system_perl).

## Usage

To start, use the LightTable's workspace manager to open a Perl file.

### REPL

If you want to see the results of evaling your Perl expressions then do the following:

  1. Run the `Connect: Add connection` command and select the Perl client. The plugin will prompt you to select the directory where your Perl project is located.
  2. Press `cntrl/cmd-shift-enter` to evaluate the file.

### Instarepl

If you want to just type your code and have it eval as you type then do the following:

  1. Run the `Connect: Add connection` command and select the Perl client. The plugin will prompt you to select the directory where your Perl project is located.
  2. Run the `Perl: Toggle instarepl mode` command.

### Watches

If you want to see the value of variables used in an expression then you can setup some watches to view them; however, you can only place watches where a function call could also be placed.

  1. Highlight a variable and press `alt-w`.
  2. Press `cntrl/cmd-shift-enter` to evaluate the file.

To remove a watch, just place your cursor over it and press `alt-shift-w`.

## Caveats

I have only tested this in the following environment:

  * Mac OS 10.8.5
  * Perl 5.12
  * LightTable 0.6.4

## Changelog

 * 0.0.8 -- BUGFIX: Compilation errors produced the wrong line number.
 * 0.0.7 -- BUGFIX: Increased debounce for a smoother instarepl experience.
 * 0.0.6 -- BUGFIX: Watches now work in the instarepl.
 * 0.0.5 -- BUGFIX: Watches were broken.
 * 0.0.4 -- Added instarepl.
 * 0.0.3 -- Bump version.
 * 0.0.2 -- Added codemirror code.
 * 0.0.1 -- Initial version with basic REPL and watches.

## Credits

This plugin was heavily inspired-by/copied-from the Python and Ruby Instarepl plugins.

## License

Copyright (C) 2014 utsukushii

Distributed under the GPLv3, see LICENSE.md for the full text.
