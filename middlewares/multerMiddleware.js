const multer = require('multer');

// 配置内存存储
const storageMemory = multer.memoryStorage();

// 创建 multer 实例，使用内存存储
const multerMiddleware= multer({
  storage: storageMemory,//内存存储
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('只允许上传图片文件'));
    }
    cb(null, true);
  }
}).single('image');


const path = require('path');

// 配置磁盘存储
const storageDisk = multer.diskStorage({
  destination: (req, file, cb) => {
    // 设置文件保存的目录，使用绝对路径
    cb(null, path.join(__dirname, '../uploads/img'));
  },
  filename: (req, file, cb) => {
    const userId = req.user?.userId;
    const postId = req.body.postId;
    const timestamp = Date.now(); 
    const fileIndex = req.files?.length + 1 || 1;// 当前文件序号
    const ext = path.extname(file.originalname); // 文件扩展名

    // 生成格式：用户ID_帖子ID_时间戳_序号.扩展名
    const filename = `${userId}_${postId}_${timestamp}_${fileIndex}${ext}`;
    cb(null, filename);}
})

// 创建 multer 实例，使用磁盘存储
const multerPostMiddleware = multer({
  storage: storageDisk, 
  limits: { 
    fileSize: 5 * 1024 * 1024,
    files: 3 // 限制最多上传 3 个文件
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('只允许上传图片文件'));
    }
    cb(null, true); 
  }
}).array('images', 3); // 接受最多 3 个文件，字段名为 'images'

module.exports={multerMiddleware,
  multerPostMiddleware
}