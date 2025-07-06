const rateLimit = require('express-rate-limit');

const normalLimiter=rateLimit({
  windowMs:1*60*1000,
  max:30,
  message:'请不要重复发送请求',
  status:429
})

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,//限制1分钟内最多请求5次
  max: 5,
  message: '登录尝试过于频繁，请稍后再试',
  statusCode: 429
});

const registerLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: '注册尝试过于频繁，请稍后再试',
  statusCode: 429
});

const getVerificationCodeLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 1,
  message: '获取验证码尝试过于频繁，请稍后再试',
  statusCode: 429
});

module.exports={loginLimiter,registerLimiter,getVerificationCodeLimiter};