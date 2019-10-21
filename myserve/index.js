const express = require('express');
const app = express();
const bodyParser=require('body-parser');

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Headers","content-type")
    next();
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});


//子路由
app.use('/Home',require('./Controller/HomeController'))
app.use('/Room',require('./Controller/RoomController'))
app.use('/List',require('./Controller/ListController'))
app.use('/User',require('./Controller/UserController'))
app.use('/MSreg',require('./Controller/MSregController'))
app.use('/upload',require('./Controller/UploadController'))
app.use('/Minsu',require('./Controller/MinsuController'))
app.use('/Address',require('./Controller/AddressController'))
app.use('/Book',require('./Controller/BookController'))
//静态资源脱管
app.use('/uploads',express.static(__dirname+'/uploads'))

app.listen(8806, () => {
    console.log('Example app listening on port port!');
});

//Run app, then load http://localhost:port in a browser to see the output.