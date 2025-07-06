const db = require('../config/dbConfig');  // 连接数据库
const oQ=require('../db/queries/objectsQueries');  
const fs = require('fs');
const path = require('path');
  
  //加载我的失物招领详情界面
  exports.getLostFound = async (objectId) => {
    try {
      const results = await db.query(oQ.getLostFound, [objectId]);
      return results;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw { status: 500, message: '打开失物招领的详情界面时发生错误'+error.message };
    }
  };

  //加载我的二手商品的详情界面
  exports.getTwoHand= async (objectId) => {
    try {
      const results = await db.query(oQ.getTwoHand, [objectId]);
      return results;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      console.log(error.message);
      throw { status: 500, message: '打开二手交易的详情界面时发生错误' };
    }
  };

  //获取联系方式
exports.getContact= async (objectId) => {
  try {
    const results = await db.query(oQ.getContact, [objectId]);
    return results;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    console.log(error.message);
    throw { status: 500, message: '获取联系方式时发生错误' };
  }
};

  //上传失物招领
  exports.sendLostFound= async (userId,title,content,createdAt,contact,pictures) => {
    const picturesFile=[
        pictures?.picture,
        pictures?.picture2,
        pictures?.picture3
    ].filter(Boolean);
   
    try {
      const insertResult=await db.query(oQ.sendLostFound, [userId,title,content,createdAt,contact,pictures.picture, pictures.picture2, pictures.picture3]);
      if (insertResult.rowCount === 0) {
        throw { status: 500, message: '失物招领插入失败' };
    }

      return;
    } catch (error) {
      console.log(picturesFile);
      await Promise.all(
                files.map(file => 
                  fs.unlink(path.join(__dirname, '../uploads/img', path.basename(file.path)))
                    .catch(() => {}) // 仍然保留错误捕获
                )
              );
      if (error.status) {
        throw error;
      }
      throw { status: 500, message: '创建失物招领时发生错误' +error.message};
    }
  };

  //上传二手交易
  exports.sendTwoH= async (userId,title,price,content,createdAt,contact) => {
    try {
      const insertResult=await db.query(oQ.sendLostFound, [userId,title,price,content,createdAt,contact,pictures.picture, pictures.picture2, pictures.picture3]);
      if (insertResult.rowCount === 0) {
        throw { status: 500, message: '二手交易插入失败' };
    }
      return;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      console.log(error.message);
      throw { status: 500, message: '创建二手交易时发生错误' };
    }
  };