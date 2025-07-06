module.exports={
    getLostFounds:'select post_id,title,created_at,picture from lostfoundpost where user_id =? ORDER BY created_at DESC ',//我的失物招领
    getTwoHands:'select post_id,title,price,created_at,picture from lostfoundpost where user_id =?  ORDER BY created_at DESC ',//我的二手交易


getPublicLostFounds :"SELECT o.post_id, o.user_id, o.title, o.created_at, o.picture1,o.picture2,o.picture3, o.content, u.username, u.avatar AS user_avatar FROM "+
"lostfoundpost o LEFT JOIN userbasicinformation u ON o.user_id = u.user_id  ORDER BY o.created_at DESC LIMIT 10 OFFSET ?;",   // 公共失物招领


getPublicTwoHands :"SELECT o.post_id, o.user_id, o.title, o.price, o.created_at, o.picture1, ,o.picture2,o.picture3,o.content, u.username, u.avatar "+
"AS user_avatar FROM lostfoundpost o LEFT JOIN userbasicinformation u ON o.user_id = u.user_id  ORDER BY o.created_at DESC LIMIT 10 OFFSET ?;",

    
    getLostFound:'select title,created_at,content,picture from lostfoundpostt where post_id =?',
    getTwoHand:'select title,price,created_at,content,picture from lostfoundpost where post_id =?',

    getContact:'select contact from lostfoundpost where post_id=?',

    sendLostFound:'insert lostfoundpost (user_id,title,content,created_at,contact,picture1,picture2,picture3) values(?,?,?,?,?,?,?,?)',
    sendTwohand:'insert lostfoundpost (user_id,title,price,content,created_at,picture,contact) values(?,?,?,?,?,?,?)'
}