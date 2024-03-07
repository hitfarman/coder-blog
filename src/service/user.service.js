const connection = require('../app/database')

class UserService {
  async create(user) {
    // 1.获取 user
    const {name, password} = user

    // 2.拼接statement
    const ps = 'INSERT INTO user(name, password) VALUES(?, ?)'

    // 3.执行sql语句
    const [result] = await connection.execute(ps, [name, password])
    return result
  }

  async findUserByName(name) {
    const ps = 'SELECT * FROM user WHERE name = ?'
    const [values] = await connection.execute(ps, [name])
    return values
  }

  async updateUserAvatar(avatarUrl, userId) {
    const ps = 'UPDATE user SET avatar_url = ? WHERE id = ?'
    const [ result ] = await connection.execute(ps, [avatarUrl, userId])
    return result
  }
}

module.exports = new UserService()