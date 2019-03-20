module.exports = function importTemplate(from, to, vars) {
  return new Promise((resolve, reject) => {
    copyTemplateDir(from, to, vars, (err, createdFiles) => {
      if (err) reject(err)
      resolve(createdFiles)
    })
  })
}
