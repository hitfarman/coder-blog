const KoaRouter = require('@koa/router')
const loginController = require('../controller/login.controller')
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, loginController.signToken)
loginRouter.get('/test', verifyAuth, loginController.test)

module.exports = loginRouter