const path = require('path')
const spawn = require('cross-spawn')
const fs = require('fs-extra')
const shell = require('shelljs')
const chalk = require('chalk')
const yaml = require('js-yaml')
const mkdirp = require('mkdirp')

const CommandError = require('../commandError')
const log = require('../log')
const importTemplate = require('../import-template')
const { checkName } = require('../utils')

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

// Clean up
function getCdPath(projectPath) {
  let cdPath = path.relative(process.cwd(), projectPath)

  if (cdPath.length > projectPath.length) {
    cdPath = projectPath
  }

  return cdPath
}

async function action(projectName, options) {
  const root = path.resolve(projectName)
  const name = path.basename(root)
  const configPath = path.join(root, '.nscale')

  checkName(name)

  // TODO: check if you can create dir with name
  console.log()
  console.log()
  console.log(`Creating a namespace ${name} in ${chalk.green(root)}.`)
  console.log()

  fs.ensureDirSync(configPath)

  console.log(`  ${chalk.green('created')} default namespace configuration`)
  console.log()

  const vars = {
    projectName
  }

  const createdFiles = await importTemplate(
    path.join(__dirname, `../templates/namespace`),
    configPath,
    vars
  ).catch(err => {
    // TODO clean up on failure
    console.log(err)
    process.exit(1)
  })

  // Initialize mesh network with npm
  const proc = spawn.sync('npm', ['install', '--save'], {
    cwd: path.join(configPath, 'mesh'),
    stdio: 'inherit'
  })
  if (proc.status !== 0) {
    console.error(`\`${command} ${args.join(' ')}\` failed`)
    return
  }

  const cdpath = getCdPath(root)
  const displayedCommand = 'nscale'

  console.log()
  console.log(`Success! Created ${chalk.green(name)} namespace at ${root}`)
  console.log('Inside your local namespace, you can run several commands:')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} create [service_name]`))
  console.log('    Creates a new service.')
  console.log()
  console.log()
  console.log('We suggest that you begin by typing:')
  console.log()
  console.log(chalk.cyan('  cd'), cdpath)
  console.log(`  ${chalk.cyan(`${displayedCommand} create my_service`)}`)
  console.log()
  console.log('Happy hacking! Go change the world...')
  console.log()
  console.log()
}

module.exports = function(program) {
  const desc = 'Initializes a localized nscale namespace'

  program
    .command('init [project-dir]')
    .alias('i')
    .description(desc)
    .option('-t, --template [name]', 'Specify which template to use.')
    .action(action)
}
