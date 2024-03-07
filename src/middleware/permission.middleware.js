const { OPERATION_IS_NOT_ALLOWED } = require("../config/error")
const permissionService = require("../service/permission.service")

// const verifyMomentPermission = async (ctx, next) => {
//   // 1.获取登录用户的id; 已经要修改的moment的id
//   const userId = ctx.user.id
//   const { momentId } = ctx.params

//   // 2.根据momentId查询moment表,获取该moment的userId
//   const result = await momentService.queryById(momentId)
//   if (result[0].user.id != userId) {
//     ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
//     return
//   }

//   // 3.执行下一个中间件
//   await next()
// }


// const verifyPermission = (resource) => {
//   return async (ctx, next) => {
//     // 1.获取登录用户的id; 已经要修改的moment的id
//     const userId = ctx.user.id
//     const { momentId } = ctx.params
  
//     // 2.根据momentId查询moment表,获取该moment的userId
//     const result = await momentService.queryById(momentId)
//     if (result[0].user.id != userId) {
//       ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
//       return
//     }
  
//     // 3.执行下一个中间件
//     await next()
//   }
// }


const verifyPermission = async (ctx, next) => {
  // 1.获取登录用户的id; 已经要修改的moment的id
  const { id } = ctx.user

  // 2.获取资源的name/id
  // name => moment/user/comment/label
  // params: { momentId: 4 }
  // keyName => momentId
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace('Id', '')

  // 2.根据momentId查询moment表,获取该moment的userId
    // 2.查询user的id是否有修改momentId的权限
    const isPermission = await permissionService.checkResouce(resourceName, resourceId, id)
    if (!isPermission) {
      return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
    }

  // 3.执行下一个中间件
  await next()
}

module.exports = {
  verifyPermission
}