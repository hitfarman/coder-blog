const jwt = require('jsonwebtoken')

const {
  NAME_OR_PASSWORD_IS_REQUIRED, 
  USER_IS_NOT_EXIST, 
  PASSWORD_IS_NOT_CORRECT, 
  UNAUTHORIZATION_USER
} = require('../config/error')
const userService = require('../service/user.service')
const md5Password = require('../utils/md5-password')
const { PUBLIC_KEY } = require('../config/secrect')

const verifyLogin = async (ctx, next) => {
  const {name, password} = ctx.request.body
  
  // 1.判断用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 2.查询该用户在数据库中是否存在
  const users = await userService.findUserByName(name)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', USER_IS_NOT_EXIST, ctx)
  }

  // 3.查询数据库中的密码和用户传递的密码是否一致
  if (user.password !== md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_NOT_CORRECT, ctx)
  }

  // 4.将从数据库查询到的user对象保存在ctx里面
  ctx.user = user

  // 验证通过执行下一个中间件
  await next()
}

const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    ctx.app.emit('error', UNAUTHORIZATION_USER, ctx)
    return 
  }
  const token = authorization.replace('Bearer ', '')

  // 2.验证token是否是有效的
  try {
    // 2.1获取token中的信息
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    
    // 2.2将token中的信息放到ctx中保存下来
    ctx.user = result

    // 2.3执行下一个中间件
    await next()
  } catch (error) {
    ctx.app.emit('error', UNAUTHORIZATION_USER, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}