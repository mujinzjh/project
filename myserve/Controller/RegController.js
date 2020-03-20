const express = require('express');
const RegModel=require('../Model/RegModel');
const router = express.Router();
const svgCaptcha = require('svg-captcha');



var mytrue=1


router.get('/captcha',(req,res)=>{
    // 验证码，有两个属性，text是字符，captcha是svg代码
    var code = svgCaptcha.create({  
        size:4,
        //过滤字符
        ignoreChars:'0o1i',
        // 翻转颜色  
        inverse: false,  
        // 字体大小  
        fontSize: 36,  
        // 噪声线条数  
        noise: 3,  
        color:true,
        background:'#cc9966',
        // 宽度  
        width: 80,  
        // 高度  
        height: 30,  
    });

  // 保存到session,忽略大小写
    req.session.randomcode = code.text.toLowerCase();
     mytrue=req.session.randomcode
    // console.log(req.session.randomcode)
    // 返回数据直接放入页面元素展示即可
    res.send(code.data);
});

router.get('/judgeCode', (req, res)=>{
    if(req.query.sms.toLowerCase() === mytrue) {
        res.json({
            status: 1
        })
        delete mytrue;
    } else {
        res.json({
            status: 0
        })
    }
});


router.post("/user",(req,res)=>{
    let regModel=new RegModel();
    var username=req.body.username
    var passwd=req.body.password
    var phone=req.body.phone
    regModel.regmyuser(username,passwd,phone,(results)=>{
        res.json(results)
    })
})

router.post("/testuser",(req,res)=>{
    let regModel=new RegModel();
    // console.log(req.body)
    var username=req.body.username
    regModel.testmyuser(username,(results)=>{
        res.json(results)
    })
})



router.post("/regAvator",(req,res)=>{
    let regModel=new RegModel();
    let uid=req.body.uid;
    let avator=req.body.avator;
    regModel.InsertAvator(uid,avator,(results)=>{
      console.log(results)
    })
})
module.exports=router;