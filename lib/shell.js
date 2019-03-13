const readline = require('readline')
const tpm = require('tpmorp')
const death = require('death')
const FugeDns = require('fuge-dns')
const FugeRunner = require('fuge-runner')

const cmds = require('./shell-commands')()

require('colors')

function Shell({ hardExit }) {
  let context
  let morp
  let dns
  let runner
  let commands

  function stopSystem(args, system, cb) {
    runner.stopAll(system, function() {
      if (dns) {
        dns.stop()
      }
      if (morp) {
        morp.stop()
      }
      if (hardExit) {
        process.exit(0)
      } else {
        cb && cb()
      }
    })
  }

  function initCommands(system, runner, dns) {
    commands = cmds.init(system, runner, dns)
    commands.exit = {
      action: stopSystem,
      description: 'exit fuge',
      isExit: true
    }
  }

  function initCrashHandler(system) {
    death({ uncaughtException: false })(function(signal, err) {
      console.log('ERROR: '.red)
      console.log(('' + signal).red)
      if (err) {
        console.log(err.red)
      }
      console.log('cleanup...'.red)
      stopSystem(null, system, function() {})
    })
  }

  function repl() {
    //initCrashHandler(context)

    const prmpt = 'nscale> '.white
    morp = tpm(readline)

    var rl = morp.start(prmpt, commands, function(err, command, args, line) {
      if (err) {
        if (line && line.length > 0) {
          cmds.shell(line, context, function(err) {
            if (err) {
              console.log(err.red)
            }
            morp.displayPrompt()
          })
        } else {
          morp.displayPrompt()
        }
      } else {
        command.action(args, context, function(err) {
          if (err) {
            console.log(err.red)
          }
          if (!command.isExit) {
            morp.displayPrompt()
          }
        })
      }
    })

    morp.displayPrompt()

    return rl
  }

  // NOTE: Using cb until we replace dns implementation
  function run(ctx, cb) {
    let rl

    context = ctx
    runner = FugeRunner()

    if (context.global.dns_enabled) {
      console.log(
        'starting fuge dns [' +
          context.global.dns_host +
          ':' +
          context.global.dns_port +
          ']..'
      )

      dns = FugeDns({
        host: context.global.dns_host,
        port: context.global.dns_port
      })

      initCommands(context, runner, dns)

      dns.addZone(context.global.dns)

      dns.start(function() {
        console.log('starting shell..')
        rl = repl()
        cb && cb(rl)
      })
    } else {
      initCommands(context, runner, dns)
      console.log('starting shell..')
      rl = repl()
      cb && cb(rl)
    }
  }

  function runCommand(ctx, cmd) {
    context = ctx
    runner = FugeRunner()

    initCommands(context, runner, null)
    console.log({ cmd })
    if (['pull', 'status', 'test'].indexOf(cmd) !== -1) {
      commands[cmd].action(['all'], context, function(err) {
        if (err) {
          console.log(err.red)
        }
      })
    } else {
      console.log('unknown command'.red)
    }
  }

  return {
    run,
    command: runCommand
  }
}

module.exports = Shell
