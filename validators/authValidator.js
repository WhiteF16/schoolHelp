const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "邮箱格式不正确",
    "any.required": "请填写邮箱"
  }),
  password: Joi.string().min(6).max(20).required().messages({
    "string.min": "密码至少 6 位",
    "string.max": "密码不能超过 20 位",
    "any.required": "请填写密码"
  })
});


const registerSchema = loginSchema.keys({
  code: Joi.string().length(6).pattern(/^\d{6}$/).required().messages({
    "string.length": "验证码必须是 6 位",
    "string.pattern.base": "验证码只能包含数字",
    "any.required": "请填写验证码"
  })
});


const verificationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "邮箱格式不正确",
    "any.required": "请填写邮箱"
  })
});

module.exports = {
  loginSchema,
  registerSchema,
  verificationSchema
};
