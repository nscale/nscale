const path = require('path')
const fs = require('fs')
const { parser } = require('./context')()

function Compile() {
  function resolveLogPath(contextPath) {
    const dir = contextPath ? path.dirname(contextPath) : process.cwd()
    return path.resolve(path.join(dir, 'log'))
  }

  return async function exec(ctxPath) {
    const contextPath = path.resolve(ctxPath)
    const logPath = resolveLogPath(ctxPath)

    if (!fs.existsSync(contextPath)) {
      return console.log('path not found: ' + contextPath)
    }

    if (!fs.existsSync(logPath)) {
      fs.mkdirSync(logPath)
    }

    const system = await parser({ contextPath, logPath })

    return system
  }
}

module.exports = Compile
