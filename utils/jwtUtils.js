//后端把jwt发送给前端，jwt是一串字符，该字符保存在前端，然后用户进行请求时，再把jwt发回给后端，后端检查jwt
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

// 生成JWT,发生在邮箱和密码匹配之后
const generateJWT = (user) => {
  const payload = {
    userId: user.user_id,
    email: user.email,
  };//jwt负载

  const token = jwt.sign(payload, jwtConfig.secret, {//使用这些参数创建jwt
    expiresIn: jwtConfig.expiresIn,
  });

  return token;//token就是生成的jwt
};

// 验证 JWT
const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);//解码jwt负载
    return decoded;  // 返回解码后的信息
  } catch (err) {
    return null;  // 验证失败时返回 null
  }
};

module.exports = {
  generateJWT,
  verifyJWT
};
