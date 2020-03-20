const express = require('express');
const multer = require('multer');

const router = express.Router();

// let upload = multer({
//     dest: __dirname + '/../uploads/'
// })
let hostname="http://localhost:8806/"
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../uploads/')
    },
    filename: function (req, file, cb) {
        //文件名称不能重复
        //要有后缀
        cb(null, new Date().valueOf() + "_" + Math.random().toString().substr(2, 6) + "." + file.originalname.split(".").pop())
    }
})

let upload = multer({
    storage: storage
})

router.post('/', upload.single('file'), (req, res) => {
    console.log(req.file);
   let data={
       "code":0,
       "msg":'',
       "data":{}
   }

   data.data.src=hostname+"uploads/"+req.file.filename;
   res.json(data);
})


router.post('/mul', upload.array('file'), (req, res) => {
  console.log(req.files);
  
   let data= {
        "errno": 0,
        "data": []
        
    }
    req.files.forEach(el=>{
        data.data.push(hostname+"uploads/"+el.filename)
    })
//    data.data.src=hostname+"uploads/"+req.file.filename;
   res.json(data);
});


module.exports = router;