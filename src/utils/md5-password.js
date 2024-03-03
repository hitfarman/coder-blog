const crypto = require('crypto')

function md5Password(password) {
  const md5 = crypto.createHash('md5')

  //md5加密完是二进制,调用digest('hex'),以十六进制显示
  const md5Password = md5.update(password).digest('hex') 

  return md5Password
}

module.exports = md5Password