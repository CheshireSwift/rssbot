'use strict';

var program = require('commander')
program
  .usage('[options] <feed>')
  .option('-i, --interval <seconds>', 'Update interval')
  .option('-e, --env <path>', 'Environment vars path')
  .option('-d, --database <path>', 'LevelDB path (no persistence when omitted)')
  .action(f => program.feed = f)

module.exports = program