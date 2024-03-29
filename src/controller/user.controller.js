const fs = require('fs')
const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { UPLOAD_PATH } = require('../config/path')

class UserController {
  async create(ctx, next) {
    // // 1.获取用户传递过来的信息
    const user = ctx.request.body

    // 2.将user信息存储到数据库中
    const result = await userService.create(user)
  
    // 3.查看存储的结果,告知前端创建成功
    ctx.body = {
      message: '创建用户成功!',
      data: result
    }
  }

  async showAvatar(ctx, next) {
    // 1.获取userId
    const { userId } = ctx.params

    // 2.获取userId对应的avatar信息
    const avatarInfo = await fileService.queryAvatarByUserId(userId)
    
    // 3.读取头像文件
    const { filename, mimetype } = avatarInfo

    // ctx.body是可以传入一个文件流的
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new UserController()