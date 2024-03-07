const labelService = require("../service/label.service")

/**
 * 传入labels时,不确定labels是否所有name已经存在于label表中
 * 所以,需要将所有labels都保存在label表中,获取labels的id
 * 将获取到id,name的数据传递给下一个middleware
 * @param {*} ctx 
 * @param {*} next 
 */
const verifyLabelExists = async (ctx, next) => {
  // 1.获取客户端传递过来的所有labels
  const { labels } = ctx.request.body

  // 2.判断所有labels中的name是否已经存在label表中
  const newLabels = []
  for (const name of labels) {
    const result = await labelService.queryByName(name)
    const labelObj = { name }
    if (result) {
      // name存在,获取name对应label的id
      labelObj.id = result.id
    } else {
      // name不存在,插入name,并且获取插入之后的id
      const insertResult = await labelService.create(name)
      labelObj.id = insertResult.insertId
    }
    newLabels.push(labelObj)
  }

  // 3.所有的labels => [{name: 'xxx', id: yyy}, ..., {}],把labels传递到下一个middleware
  ctx.labels = newLabels

  await next()
}

module.exports = {
  verifyLabelExists
}