const connection = require("../app/database")

class MomentService {
  async create(content, userId) {
    const ps = 'INSERT INTO moment(content, user_id) VALUES(?, ?)'
    const [ result ] = await connection.execute(ps, [content, userId])
    return result
  }

  async queryList(size = 10, offset = 0) {
    try {
      const ps = `
        SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
          JSON_OBJECT('id', u.id, 'name', u.name, 'avatarURL', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
          (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
          (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LIMIT ? OFFSET ?`
      const [ result ] = await connection.execute(ps, [String(size), String(offset)])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async queryById(id) {
    const ps = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarURL', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
        (
          SELECT 
            JSON_ARRAYAGG(JSON_OBJECT(
            'id', c.id, 'content', c.content, 'moment_id', c.moment_id, 'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarURL', u.avatar_url)
            ))
          FROM comment c
          LEFT JOIN user cu ON c.user_id = cu.id
          WHERE c.moment_id = m.id
        ) comments,
        (
          JSON_ARRAYAGG(JSON_OBJECT(
            'id', l.id, 'name', l.name
          ))
        ) labels
      FROM moment m 
      LEFT JOIN user u ON m.user_id = u.id
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON ml.label_id = l.id
      
      WHERE m.id = ?
      GROUP BY m.id
    `
    const [ result ] = await connection.execute(ps, [id])
    return result
  }

  async deleteById(id) {
    const ps = 'DELETE FROM moment WHERE id = ?'
    const [ result ] = await connection.execute(ps, [id])
    return result
  }

  async updateById(id, content) {
    const ps = `UPDATE moment SET content = ? WHERE id = ?`
    const [ result ] = await connection.execute(ps, [content, id])
    return result
  }

  async hashLabel(momentId, labelId) {
    const ps = 'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?'
    const [ result ] = await connection.execute(ps, [momentId, labelId])

    return !!result.length
  }

  async addLabel(momentId, labelId) {
    const ps = 'INSERT INTO moment_label(moment_id, label_id) VALUES(?, ?)'
    const [ result ] = await connection.execute(ps, [momentId, labelId])
    return result
  }
}

module.exports = new MomentService()