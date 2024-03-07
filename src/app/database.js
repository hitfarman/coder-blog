const mysql = require('mysql2')

// 1.创建连接池
const connectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'coderhub1',
  user: 'root',
  password: 'root',
  connectionLimit: 5
})

// 2.获取连接DB是否成功
connectionPool.getConnection((err, connection) =>{
  // 1.判断是否有错误信息
  if (err) {
    console.log('获取链接失败', err)
    return
  }

  // 2.获取connection,尝试和数据库建立连接
  connection.connect((err) => {
    if (err) {
      console.log('database failed!', err)
    } else {
      console.log('database connected!')
    }
  })
})

// 获取到连接池中的一个连接对象(promise)
const connection = connectionPool.promise()
module.exports = connection