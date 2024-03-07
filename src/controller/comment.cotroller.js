const commentService = require("../service/comment.service")

class CommentController {
  async create(ctx, next) {
    // 1.获取body中的参数
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user

    // 2.操作数据库存储comment
    const result = await commentService.create(content, momentId, id)
    ctx.body = {
      code: 0,
      message: 'issuing comment succeed',
      data: result
    }
  }

  async reply(ctx, next) {
    // 1.获取body中的参数
    const { content, momentId, commentId } = ctx.request.body
    const { id } = ctx.user
    
    // 2.操作数据库存储comment
    const result = await commentService.reply(content, momentId, id, commentId)

    ctx.body = {
      code: 0,
      message: 'replying comment succeed',
      data: result
    }
  }
}

module.exports = new CommentController()