const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/secrect')
const { GENERATE_TOKEN_FAILED } = require('../config/error')

class LoginController {
  signToken(ctx, next) {
    // 1.获取user信息
    const { id, name } = ctx.user

    // 2.颁发令牌token
    try {
      const token = jwt.sign({ id, name }, PRIVATE_KEY, {
        expiresIn: 24 * 60 * 60,
        algorithm: 'RS256'
        // allowInsecureKeySizes: true
      })

      // 3.返回user信息,给客户端返回token
      ctx.body = { code: 0, data: { id, name, token } }
    } catch (error) {
      console.log(error)
      ctx.app.emit('error', GENERATE_TOKEN_FAILED, ctx)
    }
  }

  test(ctx, next) {
    ctx.body = '验证身份通过!'
  }
}

module.exports = new LoginController()