#! /usr/bin/env node

'use strict';

var parse = require('../parser').default;
var header = require('../header').default;
var fs = require('fs');
var yargs = require('yargs')
  .usage('$0 [OPTIONS] [FILES]')
  .help('help')
  .options({
    'output': {
      alias: 'o',
      type: 'string',
      nargs: 1,
      requiresArg: true,
      description: 'File to output to'
    },
    'silent': {
      type: 'boolean',
      alias: 's',
      default: false,
      description: 'Silent parse errors'
    },
    'absolutePaths': {
      type: 'boolean',
      default: false,
      alias: 'ap',
      description: 'Use absolute paths vs relative paths'
    },
    'header': {
      type: 'boolean',
      alias: 'h',
      default: false,
      description: 'Whether to include the header with stdout'
    },
    'sourceType': {
      type: 'string',
      alias: 'st',
      choices: ['script', 'module'],
      default: 'module',
      nargs: 1,
      requiresArg: true,
      description: 'Babylon parsing file source type'
    },
    'plugins': {
      type: 'array',
      alias: 'p',
      choices: [
        '*',
        'decorators',
        'asyncFunctions',
        'asyncGenerators',
        'exponentiationOperator'
      ],
      default: '*',
      nargs: 1,
      requiresArg: true,
      description: 'Babel plugins to enable while parsing'
    }
  });

var argv = yargs.argv;

if (!argv._.length) {
  console.log(yargs.help());
  process.exit(0);
}

var tags = parse(argv._, {
  silent: argv.silent,
  absolutePaths: argv.absolutePaths,
  parsing: {
    sourceType: argv.sourceType,
    plugins: argv.plugins
  }
});

if (argv.output) {
  fs.writeFileSync(argv.output, header + '\n' + tags.join('\n'));
} else {
  if (argv.header) {
    process.stdout.write(header + '\n');
  }

  process.stdout.write(tags.join('\n'));
}
