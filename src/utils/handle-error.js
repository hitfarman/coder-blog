const app = require('../app')
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXIST } = require('../config/error')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '用户名或密码不能为空!'
      break;
    case NAME_IS_ALREADY_EXIST:
      code = -1002
      message = '用户名已经存在, 不能注册!'
      break

    default:
      break;
  }

  ctx.body = {
    code,
    message
  }
})