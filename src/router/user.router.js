const koaRouter = require('@koa/router')
const { create, showAvatar } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

// 1.创建路由对象
const userRouter = new koaRouter({prefix: '/users'})

// 2.定义路由映射
// 2.1.用户注册接口
userRouter.post('/', verifyUser, handlePassword, create)

// 2.2.为用户提供头像展示(不需要验证登录)
userRouter.get('/avatar/:userId', showAvatar)

// 3.导出路由
module.exports = userRouter
