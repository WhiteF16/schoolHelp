const nodemailer = require('nodemailer');
module.exports = {
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS 
  },
  pool: true,                // 启用连接池
  maxConnections: 5,         // 最大并发连接数，发送任务最多只能同时发送5个邮件
  maxMessages: 100,          // 单个连接允许发送的最大邮件数
  rateDelta: 1000,           // 速率限制时间窗口，防止触发gmail的频率限制
  rateLimit: 10,             // 每秒最大发送量
  idleTimeout: 30000,       // 30秒无活动自动关闭连接
  maxIdleTime: 60000        // 连接最大存活时间
};