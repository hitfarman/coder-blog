const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const {create, getAllLabel} = require('../controller/label.controller')

const labelRouter = new KoaRouter({ prefix: '/label' })

// 1.创建label
labelRouter.post('/', verifyAuth, create)
// 2.获取label列表
labelRouter.get('/', getAllLabel)

module.exports = labelRouter