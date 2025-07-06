const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');//邮箱验证码发送
const db = require('../config/dbConfig');  // 连接数据库
const mail=require('../config/mailConfig');
const aQ = require('../db/queries/authQueries');
const jwtUtils = require('../utils/jwtUtils');

exports.userLogin  = async (email, password) => {
  try {
    const results = await db.query(aQ.getPwd, [email]);

    if (results[0].length === 0) {
      throw { status: 404, message: '邮箱未注册' };
    }

    const user = results[0][0]; 
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw { status: 401, message: '密码错误' }; 
    }

    const token = jwtUtils.generateJWT(user);
    return {token };
  } catch (error) {
    if (error.status) {
      throw error; 
    }
    throw { status: 500, message: error.message};
  }
};


exports.userRegister = async (email, password) => {
  try {
     const results = await db.query(aQ.getEmail, [email]);
     if (results[0].length !== 0) {
       throw { status: 400, message: '邮箱已注册' };
     }
    
    const hashedPwd = await bcrypt.hash(password, 10);

    // 插入基本信息
    const insertResults =await db.query(aQ.insertBasicInfo, [email, hashedPwd]);
    if(insertResults[0].length===0)
      throw{status:500,message:'用户注册失败'};

    return;
  } catch (error) {
    if (error.status) {
      throw error; 
    } 
    throw { status: 500, message: '服务器内部错误：注册失败'+error.message}; 
  }
};

const transporter=nodemailer.createTransport(mail);
const sendVerificationEmail = async (toEmail, code) => {
  try {
    const mailOptions = {
      from: `"校园生活平台" <${mail.auth.user}>`, // 发件人
      to: toEmail, // 收件人
      subject: '您的验证码', 
      text: `验证码：${code}（5分钟内有效）`, 
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('邮件已发送:', info.messageId);
    return true;
  } catch (error) {
    console.error('邮件发送失败:', error);
    throw error;
  }
};

exports.generateVerificationCode = async (email) => {
  console.log("正在尝试生成验证码");
  try{
    const codeResults=await db.query(aQ.getVerification,[email]);
    
    if(codeResults[0].length===0){
      // 生成 6 位随机验证码
      const code= Math.floor(100000 + Math.random() * 900000);

      //过期时间
      const expiresAt= new Date(Date.now() + 1 * 60 * 1000);

      await(db.query(aQ.insertVerification,[email,code,expiresAt]));
      await sendVerificationEmail(email,code);
      return;
    }else{
      const expiresAtResults=await db.query(aQ.getCodeExpiresAt,[email]);
      if(expiresAtResults[0] && new Date()>new Date(expiresAtResults[0][0].expiresAt)){
        const newCode = Math.floor(100000 + Math.random() * 900000);
        const newExpiresAt = new Date(Date.now() + 1 * 60 * 1000);
        await db.query(aQ.updateVerification,[newCode,newExpiresAt,email]);
        await sendVerificationEmail(email,newCode);
        return;
      }else{
        throw {status:429,message:"请不要重复请求发送验证码"}
      }
    }
    }catch(error){
      if (error.status) {
        throw error;
      }else
        throw {status:500,message:"生成验证码失败，请重新发送"+error.message}
  }
};


exports.verifyVerificationCode = async (email, code) => {
  const codeResults = await db.query(aQ.getVerification, [email]);
  const localCode=codeResults[0];
  try {
    if (!localCode) {
      throw { status: 404, message: "验证码不存在，请重新发送" };
    }
    if (localCode[0].code === parseInt(code)) {
      const expiresAt = await db.query(aQ.getCodeExpiresAt, [code]);
      if (new Date(expiresAt) < new Date()) 
        throw { status: 410, message: "验证码已过期，请重新发送" };
      await db.query(aQ.deleteVerification, [email]);
      return;
    }else
      throw { status: 400, message: "验证码错误1" };
  } catch (error) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "验证码验证失败 "+error.message};
  }
};

exports.remakePwd=async(email,password)=>{
  try{
    const hashedPwd = await bcrypt.hash(password, 10);
    await db.query(aQ.updatePwd,[hashedPwd,email]);
    return { success: true, message: '重置密码成功，请重新登录' };
  }catch(error){
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "重置密码失败 "+error.message};
  }
};