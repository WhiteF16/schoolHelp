const authServices = require('../services/authServices');
const { loginSchema, registerSchema, verificationSchema, resetPwdSchema }=require('../validators/authValidator');
exports.userLogin = async (req, res,next) => {
  try {
    const {error,value}=loginSchema.validate(req.body,{abortEarly: true});
    if (error) return next({ status: 400, message: error.details[0].message });

    const {email,password} = value;
      // 验证密码
    const result = await authServices.userLogin (email, password);

    return res.status(200).json({
      success: true,
      message: '登录成功',
      token: result.token,
    });
    } catch (error) {
      next(error);
    }
};


exports.userRegister = async (req, res,next) => {
  try {
    const {error,value}=registerSchema.validate(req.body);
    if (error) return next({ status: 400, message: error.details[0].message });
    const {email,password,code } = value;
    await authServices.verifyVerificationCode(email, code);
    await authServices.userRegister(email, password);

    return res.status(200).json({
      success: true,
      message: '注册成功',
    });
  } catch (error) {
    next(error);
  }
};

exports.generateVerificationCode=async(req,res,next)=>{
  try{
    const {error,value} = verificationSchema.validate(req.body);
    if (error) return next({ status: 400, message: error.details[0].message });

    const { email } =value;

    await authServices.generateVerificationCode(email);
    return res.status(200).json({
      success:true,
      message:'验证码已发送'
    })
  }catch(error){
    next(error)
  }
}

/*exports.verifyVerificationCode = async (req, res) => {//验证验证码，在controller被调用于登录和注册
  const { email, code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: "false",
      message: "请填写验证码",
    });
  }

  try {
    const response = await authServices.verifyVerificationCode(email, code);
    return res.status(200).json(response); 
  } catch (error) {
    const statusCode = error.status || 500; 
    return res.status(statusCode).json({
      success: "false",
      message: error.message || "验证码验证失败，请重新验证",
    });
  }
};*/

exports.remakePwd=async(req,res,next)=>{;
   try{
    const { error } = resetPwdSchema.validate(req.body);
    if (error) return next({ status: 400, message: error.details[0].message });

    const { email, password, code } = req.body;

    await authServices.verifyVerificationCode(email, code);
    const result=await authServices.remakePwd(email,password);
    return res.status(200).json({
      success: true,
      message: result.message,
    });

  }catch(error){
    next(error)
  }
}