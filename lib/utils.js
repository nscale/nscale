const fs = require('fs')
const path = require('path')
const CommandError = require('./commandError')

function isNonExistentOrEmptyDir(dir) {
  try {
    return fs.statSync(dir).isDirectory() && fs.readdirSync(dir).length === 0
  } catch (error) {
    if (error.code === 'ENOENT') {
      return true
    }
    throw error
  }
}

function metaPath(overridePath) {
  const file = '.nscale/namespace.yml'
  return overridePath || path.join(process.cwd(), file)
}

function validateProjectName(name) {
  const results = { errors: [], warnings: [] }

  if (!/^[a-z0-9@.\-_]+$/i.test(name)) {
    results.errors.push(
      'The project name can only contain URL-friendly characters.'
    )
  }

  if (typeof name !== 'string' || name === '') {
    results.errors.push('The project name can not be empty.')
  }

  if (!results.errors.length) {
    results.valid = true
  }

  return results
}

function printValidationResults(results) {
  if (typeof results !== 'undefined') {
    results.forEach(error => {
      console.error(chalk.red(`  *  ${error}`))
    })
  }
}

function checkName(name) {
  const validationResult = validateProjectName(name)

  if (!validationResult.valid) {
    console.error(
      `Could not create a namespace called ${chalk.red(
        `"${name}"`
      )} because of naming restrictions:`
    )
    printValidationResults(validationResult.errors)
    printValidationResults(validationResult.warnings)
    process.exit(1)
  }
}

module.exports = {
  metaPath,
  checkName,
  checkSpaceName: checkName,
  checkServiceName: checkName,
  isNonExistentOrEmptyDir
}
