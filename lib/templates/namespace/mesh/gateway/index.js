const Seneca = require('seneca')
const Mesh = require('seneca-mesh')
const Divy = require('divyproxy')

const seneca = Seneca({
  tag: 'gateway',
  log: 'silent',
  legacy: {
    error: false,
    transport: false
  }
}).use(Mesh, {
  isbase: false,
  bases: ['0.0.0.0:39999'],
  host: '0.0.0.0'
})

const transport = seneca.act.bind(seneca)

seneca.ready(function() {
  const divy = Divy({
    bases: ['0.0.0.0:39999'],
    host: '0.0.0.0',
    transport
  })

  divy.listen(
    {
      port: 5000,
      host: '0.0.0.0'
    },
    function(err, address) {
      if (err) {
        console.log(err)
        process.exit(1)
      }

      divy.join()
    }
  )
})
