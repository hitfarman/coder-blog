const { ADD_LABEL_FOR_MOMENT_ERROR } = require("../config/error")
const momentService = require("../service/moment.service")

class MomentController {
  async createMoment(ctx, next) {
    // 1.获取动态的内容
    const { content } = ctx.request.body

    // 2.动态由谁发布(通过token拿到用户信息: id, name)
    const { id } = ctx.user

    // 3.将动态相关数据保存到数据库中
    const result = await momentService.create(content, id)

    ctx.body = {
      code: 0,
      message: '发表动态成功!',
      data: result
    }
  }

  async getAllMoments(ctx, next) {
    const { size, offset } = ctx.request.query
    const result  = await momentService.queryList(size, offset)

    ctx.body = {
      code: 0,
      data: result
    }
  }

  async getMomentById(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.queryById(momentId)

    ctx.body = {
      code: 0,
      data: result[0]
    }
  }

  async deleteMomentById(ctx, next) {
    const { momentId } = ctx.params

    const result = await momentService.deleteById(momentId)

    ctx.body = {
      code: 0,
      message: '删除moment成功',
      data: result
    }
  }

  async updateMomentById(ctx, next) {
    // 要修改moment的id
    const { momentId } = ctx.params
    // 要修改moment的content
    const { content } = ctx.request.body

    const result = await momentService.updateById(momentId, content)
    
    ctx.body = {
      code: 0,
      message: `update moment succeed`,
      data: result
    }
  }

  // 为moment添加label
  async addLabels(ctx, next) {
    // 1.获取一些传入的参数
    const { labels } = ctx
    const { momentId } = ctx.params

    // 2.将moment_id和label_id添加到moment_label关系表中
    try {
      for (const label of labels) {
        // 2.1判断label_id是否已经和moment_id已经存在该数据
        const isExists = await momentService.hashLabel(momentId, label.id)
        if (!isExists) {
          // 2.2不存在,插入
          const result = await momentService.addLabel(momentId, label.id)
        }
      }

      ctx.body = {
        code: 0,
        message: 'add label for moment succeed'
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit('error', ADD_LABEL_FOR_MOMENT_ERROR, ctx)
    }
  }
}

module.exports = new MomentController()