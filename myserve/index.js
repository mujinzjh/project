const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "content-type")
    next();
})
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
    randomcode: ''
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});


//子路由
// app.use('/Home',require('./Controller/HomeController'))
// app.use('/Room',require('./Controller/RoomController'))
// app.use('/List',require('./Controller/ListController'))
// app.use('/User',require('./Controller/UserController'))
// app.use('/MSreg',require('./Controller/MSregController'))
app.use('/upload',require('./Controller/UploadController'))
// app.use('/Minsu',require('./Controller/MinsuController'))
// app.use('/Address',require('./Controller/AddressController'))
// app.use('/Book',require('./Controller/BookController'))
app.use('/Cate', require('./Controller/CateController'))
app.use('/Goods', require('./Controller/GoodsController'))
app.use('/add', require('./Controller/CommodityController'))
app.use('/shop', require('./Controller/ShoppingController'))
app.use('/comments', require('./Controller/CommentController'))
app.use('/Address', require('./Controller/AddressController'))
app.use('/Reg', require('./Controller/RegController'))
app.use('/Login', require('./Controller/LoginController'))
//后台
app.use('/backmanagement',require('./Controller/backManagement/loginContrlller'))
app.use('/backmanagement',require('./Controller/backManagement/goodsController'))
//静态资源脱管
app.use('/uploads', express.static(__dirname + '/uploads'))

app.listen(8806, () => {
    console.log('Example app listening on port port!');
});