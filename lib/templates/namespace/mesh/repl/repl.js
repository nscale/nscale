/**
 * In order for services to joi the mesh network we need a base for them to
 * connect too. We are not looking at multicasting use cases as it doesnt
 * work in most cloud enviroments. The goal is to replicate how the production
 * mesh works.
 */

const Seneca = require('seneca')

const opts = {
  tag: 'repl',
  log: 'silent',
  fixedargs: {
    fatal$: false
  },
  legacy: {
    error: false,
    transport: false
  }
}

const meshOpts = {
  bases: ['127.0.0.1']
}

Seneca(opts)
  .use(require('seneca-mesh'), meshOpts)
  .use(require('seneca-repl'))
  .ready(function() {
    this.log.info('Repl is up an running')
  })
