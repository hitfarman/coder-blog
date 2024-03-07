const connection = require("../app/database")

class CommentService {
  async create(content, momentId, userId) {
    console.log(content, momentId, userId)
    const ps = 'INSERT INTO comment(content, moment_id, user_id) VALUES(?, ?, ?)'
    try {
      const [ result ] = await connection.execute(ps, [content, momentId, userId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async reply(content, momentId, userId, commentId) {
    const ps = 'INSERT INTO comment(content, moment_id, user_id, comment_id) VALUES(?, ?, ?, ?)'
    const [ result ] = await connection.execute(ps, [content, momentId, userId, commentId])
    return result
  }
}

module.exports = new CommentService()