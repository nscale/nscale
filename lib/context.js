const fs = require('fs')
const path = require('path')
const fcfg = require('fuge-config')()

module.exports = function() {
  function parser({ contextPath, logPath }) {
    return new Promise(function(resolve, reject) {
      fcfg.load(contextPath, function(err, system) {
        if (err) {
          return reject(err)
        }

        system.global.log_path = logPath

        resolve(system)
      })
    })
  }

  return {
    parser
  }
}
