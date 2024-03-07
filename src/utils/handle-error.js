const app = require('../app')
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXIST, USER_IS_NOT_EXIST, PASSWORD_IS_NOT_CORRECT, UNAUTHORIZATION_USER, GENERATE_TOKEN_FAILED, OPERATION_IS_NOT_ALLOWED, ADD_LABEL_FOR_MOMENT_ERROR } = require('../config/error')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = 'username or password cannot be empty!'
      break;
    case NAME_IS_ALREADY_EXIST:
      code = -1002
      message = 'username already exists, cannot register!'
      break
    case USER_IS_NOT_EXIST:
      code = -1003
      message = 'username not exists, cannot login!'
      break
    case PASSWORD_IS_NOT_CORRECT:
      code = -1004
      message = 'your password is not correct, cannot login!'
      break
    case UNAUTHORIZATION_USER:
      code = -1005
      message = 'invalid token or token expired!'
      break
    case GENERATE_TOKEN_FAILED:
      code = -1006
      message = 'generate token failed!'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -2001
      message = 'no authorization to manipulate this moment!'
      break
    case ADD_LABEL_FOR_MOMENT_ERROR:
      code = -3001
      message = 'add label for moment error!'
      break

    default:
      break;
  }

  ctx.body = {
    code,
    message
  }
})