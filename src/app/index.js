const Koa = require("koa")
const bodyParser = require('koa-bodyparser')
const registerRouters = require("../router")

// 1.创建app
const app = new Koa()

// 2.对app使用中间件
app.use(bodyParser())

registerRouters(app)
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
// app.use(loginRouter.routes())
// app.use(loginRouter.allowedMethods())


// 3.导出app
module.exports = app