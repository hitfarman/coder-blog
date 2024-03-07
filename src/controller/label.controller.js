const labelService = require("../service/label.service")

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body

    const result = await labelService.create(name)

    ctx.body = {
      code: 0,
      message: 'create label succeed',
      data: result
    }
  }

  async getAllLabel(ctx, next) {
    const { size, offset } = ctx.request.query
    
    const result  = await labelService.queryList(size, offset)

    ctx.body = {
      code: 0,
      data: result
    }
  }
}

module.exports = new LabelController()