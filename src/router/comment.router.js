const KoaRouter = require('@koa/router')

const { verifyAuth } = require('../middleware/login.middleware')
const { verifyPermission } = require('../middleware/permission.middleware')
const { create, reply } = require('../controller/comment.cotroller')

const commentRouter = new KoaRouter({ prefix: '/comment' })

// 增: 新增comment
commentRouter.post('/', verifyAuth, create)
// 增: 回复comment
commentRouter.post('/reply', verifyAuth, reply)

module.exports = commentRouter