const express = require("express");
const cors = require("cors");


const bodyParser = require('body-parser');
const app = express();


const authRoutes = require('./routes/authRoutes');
const oaRoutes=require('./routes/oaRoutes');
const postRouter=require('./routes/postRouter')
const homeRouter=require('./routes/homeRouter')
const mineRouter=require('./routes/mineRouter')
const fileRouter=require('./routes/fileRouters')

app.use(cors({
    origin: "*", 
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
  }));
  
  app.options("*", cors());
 
app.use(bodyParser.json()); // 解析json数据格式
app.use(bodyParser.urlencoded({extended: true})); // 解析form表单提交的数据application/x-www-form-urlencoded


app.use('/auth', authRoutes);
app.use('/oa',oaRoutes);
app.use('/post',postRouter)
app.use('/home',homeRouter)
app.use('/mine',mineRouter)
app.use('/',fileRouter)


app.listen(3000, () => {  
   console.log('Server is running at http://localhost:3000');   
});
/*app.listen(8081, 'localhost', () => {
  console.log(`Server running on localhost:${8081}`);
 });*/