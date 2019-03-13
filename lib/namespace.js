/**
 * This creates an in memory version of the namespace
 * along with some controls your can do against it
 */
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const { metaPath } = require('./utils')

function loadMeta(overridePath) {
  const filePath = metaPath(overridePath)
  return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
}

function updateMeta(meta) {
  const filePath = metaPath()
  const content = yaml.safeDump(meta)

  fs.writeFileSync(filePath, content)
}

function appendServiceMeta(conf) {
  const { name, ...spec } = conf
  const serviceMeta = { [name]: spec }

  let meta = loadMeta()
  meta = Object.assign(meta, serviceMeta)

  updateMeta(meta)
}

module.exports = {
  loadMeta,
  appendServiceMeta
}
