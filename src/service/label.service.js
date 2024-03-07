const connection = require("../app/database")

class LabelService {
  async create(name) {
    const ps = 'INSERT INTO label(name) VALUES(?)'
    const [ result ] = await connection.execute(ps, [name])
    return result
  }

  async queryList(size = 10, offset = 0) {
    try {
      const ps = `SELECT * FROM label LIMIT ? OFFSET ?`
      const [ result ] = await connection.execute(ps, [String(size), String(offset)])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async queryByName(name) {
    const ps = `SELECT * FROM label WHERE name = ? `
    const [ result ] = await connection.execute(ps, [name])
    // 这里拿到的result是个数组,取第一个即可
    return result[0]
  }
}

module.exports = new LabelService()