const path = require('path')
const fs = require('fs-extra')
const download = require('download-git-repo')
const copyTemplateDir = require('copy-template-dir')
const yaml = require('js-yaml')
const mkdirp = require('mkdirp')
const chalk = require('chalk')
const shell = require('shelljs')
const inquirer = require('inquirer')

const CommandError = require('../commandError')
const log = require('../log')
const { appendServiceMeta } = require('../namespace')
const { checkServiceName } = require('../utils')

function importTemplate(from, to, vars) {
  return new Promise((resolve, reject) => {
    copyTemplateDir(from, to, vars, (err, createdFiles) => {
      if (err) reject(err)
      resolve(createdFiles)
    })
  })
}

const defaults = {
  version: '1.0.0',
  startcmd: 'npm start'
}

async function action(serviceName, options) {
  const root = path.resolve(serviceName)
  const name = path.basename(root)

  checkServiceName(name)

  // TODO: check to see if you can create the service dir

  console.log()
  console.log()
  console.log(`Creating a service ${name} at ${chalk.green(root)}.`)
  console.log()

  const { version, startcmd, plan } = await inquirer.prompt([
    {
      type: 'input',
      name: 'version',
      message: 'version:',
      default: defaults.version
    },
    {
      type: 'input',
      name: 'startcmd',
      message: 'start command:',
      default: defaults.startcmd
    },
    {
      type: 'list',
      name: 'plan',
      message: 'Select plan:',
      choices: ['Community', 'Managed']
    }
  ])

  fs.ensureDir(root)

  console.log(`  ${chalk.green('created')} directory ${name}`)

  const vars = {
    name,
    version
  }

  const createdFiles = await importTemplate(
    path.join(__dirname, `../templates/create-${plan.toLowerCase()}`),
    root,
    vars
  ).catch(err => {
    // TODO clean up on failure
    console.log(err)
    process.exit(1)
  })

  createdFiles.sort().forEach(createdFile => {
    console.log(
      `  ${chalk.green('created')} ${path.relative(process.cwd(), createdFile)}`
    )
  })

  // get service meta and add it to namespace
  appendServiceMeta({
    name,
    type: 'node',
    path: `../${name}`,
    // change to use npm start
    run: 'npm start'
  })

  // If namespace is running alert it that there is a new service

  // output success log to terminal
  let cdPath = path.relative(process.cwd(), root)

  if (cdPath.length > root.length) {
    cdPath = name
  }

  const displayedCommand = 'nscale'

  console.log()
  console.log(`Success! Created ${chalk.green(name)} service at ${root}`)
  console.log('You can now run your service within your local namespace')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} start`))
  console.log('     Starts your local namspace.')
  console.log()
  console.log()
  console.log(
    'Once running you can see what service are available within the namespace'
  )
  console.log()
  console.log(`${chalk.cyan('  ls')}`)
  console.log('     Lists service in the namespace context.')
  console.log()
  console.log()
  console.log('To run your service just')
  console.log()
  console.log(`${chalk.cyan('  start')} ${name}`)
  console.log('     Start the specified service.')
  console.log()
  console.log()
  console.log('Immutible services are an interesting target!')
  console.log()
  console.log()
}

module.exports = function(program) {
  const desc = 'Initializes a new service'

  program
    .command('create [service-name]')
    .alias('c')
    .description(desc)
    .option('--kind [kind]', 'Specify which kind of service this is.')
    .option('-tmpl, --template [name]', 'Specify which template to use.')
    .action(action)
}
