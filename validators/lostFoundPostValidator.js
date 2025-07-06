const Joi = require('joi');

const getObjectSchema = Joi.object({
  objectId: Joi.alternatives()
    .try(
      Joi.string().min(1).messages({
        'string.empty': 'ID不能为空字符串',
        'string.min': 'ID至少需要1个字符'
      }),
      Joi.number().integer().min(1).messages({
        'number.base': 'ID必须是数字',
        'number.min': 'ID必须是正整数'
      })
    )
    .required()
    .messages({
      'alternatives.match': 'ID必须是有效字符串或数字',
      'any.required': '必须提供ID'
    })
});


const sendLostFoundSchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    'string.empty': '标题不能为空',
    'string.min': '标题至少需要2个字符',
    'string.max': '标题不能超过100个字符',
    'any.required': '必须填写标题'
  }),
  content: Joi.string().min(2).required().messages({
    'string.empty': '内容不能为空',
    'string.min': '内容至少需要2个字符',
    'any.required': '必须填写内容'
  }),
  contact: Joi.string().min(3).required().messages({
    'string.empty': '联系方式不能为空',
    'string.min': '联系方式至少需要3个字符',
    'any.required': '必须填写联系方式'
  })
});

const sendTwoHandSchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    'string.empty': '标题不能为空',
    'string.min': '标题至少需要2个字符',
    'string.max': '标题不能超过100个字符',
    'any.required': '必须填写标题'
  }),
  content: Joi.string().min(2).required().messages({
    'string.empty': '内容不能为空',
    'string.min': '内容至少需要2个字符',
    'any.required': '必须填写内容'
  }),
  price: Joi.number().min(0).precision(2).required().messages({
    'number.base': '价格必须是数字',
    'number.min': '价格不能为负数',
    'number.precision': '价格最多保留2位小数',
    'any.required': '必须填写价格'
  }),
  contact: Joi.string().min(3).required().messages({
    'string.empty': '联系方式不能为空',
    'string.min': '联系方式至少需要3个字符',
    'any.required': '必须填写联系方式'
  })
});

module.exports = {
  getObjectSchema,
  sendLostFoundSchema,
  sendTwoHandSchema
};