module.exports = function {{mainFuncName}}() {
  const srv = this

  srv.message('ping:usrv', async msg => {
    return { msg: 'pong' }
  })
}