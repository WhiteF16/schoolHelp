// authRoutes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const verifyJWT = require('../middlewares/JWTMiddleware');
const upload=require('../middlewares/multerMiddleware');
const errorMiddleware=require('../middlewares/errorMiddleware');

router.post('/login', authController.userLogin ,errorMiddleware.globalErrorMiddleware);

router.post('/register',authController.userRegister,errorMiddleware.globalErrorMiddleware);

//router.put('/update-profile', verifyJWT, upload, authController.updateProfile);

router.post('/getVerificationCode',authController.generateVerificationCode,errorMiddleware.globalErrorMiddleware);

router.post('/remakePwd',verifyJWT,authController.remakePwd,errorMiddleware.globalErrorMiddleware);

module.exports = router;
