const express = require('express')
const router = express.Router()

const postController = require('../controllers/postController')
const lostFoundController=require('../controllers/objectControllers')
const verifyJWT = require('../middlewares/JWTMiddleware');
const middleWares=require('../middlewares/multerMiddleware')
const errorMiddleware=require('../middlewares/errorMiddleware');

router.put('/send',verifyJWT, middleWares.multerPostMiddleware,postController.sendPost)
//router.post('/edit', postController.editPostPage)
//router.post('/detail', postController.getPostDetail)
router.post('/comment', verifyJWT,postController.sendComment)
router.post('/getComments', postController.getComments)

router.put('/sendLostFound',verifyJWT,middleWares.multerPostMiddleware,lostFoundController.sendLostFound,errorMiddleware.globalErrorMiddleware)

module.exports = router 