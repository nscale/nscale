#!/usr/bin/env node
const program = require('commander')
const shell = require('./shell')({ hardExit: true })
const compile = require('./compile')()
const Commands = require('./commands')
const { metaPath } = require('./utils')
const pkg = require('../package.json')

program.version('0.1.0')

// import commands
Commands(program)

program.command('pull').action(runCommand('pull'))
program.command('status').action(runCommand('status'))
program.command('test').action(runCommand('test'))

program
  .command('start [context_path]')
  .description('Start the nscale shell')
  .action(runShell)

program.parse(process.argv)

function runCommand(cmd) {
  return async contextPath => {
    const context = await compile(metaPath(contextPath))
    shell.command(context, cmd)
  }
}

async function runShell(contextPath) {
  console.log('compiling')
  const context = await compile(metaPath(contextPath))
  shell.run(context)
}
