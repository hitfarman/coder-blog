const connection = require("../app/database")

class FileService {
  async create(filename, mimetype, size, userId) {
    const ps = 'INSERT INTO avatar(filename, mimetype, size, user_id) VALUES(?, ?, ?, ?)'
    try {
      const [ result ] = await connection.execute(ps, [filename, mimetype, size, userId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async queryAvatarByUserId(userId) {
    const ps = 'SELECT * FROM avatar WHERE user_id = ?'
    try {
      const [ result ] = await connection.execute(ps, [userId])
      return result.pop() //返回最后一条数据
      // return result[result.length - 1]
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new FileService()