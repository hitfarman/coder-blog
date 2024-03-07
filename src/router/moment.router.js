const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { 
  createMoment, 
  getAllMoments, 
  getMomentById, 
  updateMomentById,
  deleteMomentById,
  addLabels
} = require('../controller/moment.controller')
const { verifyPermission } = require('../middleware/permission.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

const momentRouter = new KoaRouter({ prefix: '/moment' })

// 1.增:新增moment
momentRouter.post('/', verifyAuth, createMoment)

// 2.查:查询moment(列表/id)
momentRouter.get('/', getAllMoments)
momentRouter.get('/:momentId', getMomentById)

// // 3.删:删除moment
// momentRouter.delete('/:momentId', verifyAuth, verifyMomentPermission, deleteMomentById)
// // 4.改:修改moment
// // 验证: 登录的用户才能修改moment
// momentRouter.patch('/:momentId', verifyAuth, verifyMomentPermission, updateMomentById)

// 3.删:删除moment
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, deleteMomentById)

// 4.改:修改moment
// 验证: 登录的用户才能修改moment
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, updateMomentById)


// 5.添加标签:
/**
 * 中间件:
    1.是否登录(完成)
    2.验证是否有操作这个动态的权限(完成)
    3.额外中间件: 验证label的name是否已经存在于label表中
    * 如果存在, 那么直接使用即可
    * 如果没有存在, 那么需要先将label的name添加label表
    4.最终步骤
    * 所有的labels都在已经在label表
    * 动态 2, 和labels关系, 添加到关系表中
 */
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)

module.exports = momentRouter