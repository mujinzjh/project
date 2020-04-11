const express = require('express');
const LoginModel=require('../Model/LoginModel');
const router = express.Router();
router.post('/user', (req, res)=>{
    let loginModel=new LoginModel();
    console.log(req.body)
    var username=req.body.username
    var passwd=req.body.password
    loginModel.loginmyuser(username,passwd,(results)=>{
        res.json(results)
    })
});
router.get('/getUserInfo', (req, res)=>{
    let loginModel=new LoginModel();
    var uid=req.query.uid;
    loginModel.getMyUser(uid,(results)=>{
        res.json(results)
    })
});
router.post('/nameedit', (req, res)=>{
    let loginModel=new LoginModel();
    let username=req.body.values.newname,uid=req.body.uid;
    loginModel.updateName(username,uid,(results)=>{
        var data={}
        if(results.affectedRows===1){
            data={
                code:1,
                msg:'修改成功'
            }
        }else{
            data={
                code:-1,
                msg:'修改失败'
            }  
        }
        res.json(data);
    })
});
router.post('/passwordedit', (req, res)=>{
    let loginModel=new LoginModel();
    let newpwd=req.body.values.newpwd,uid=req.body.uid;
    loginModel.updatePassword(newpwd,uid,(results)=>{
        var data={}
        if(results.affectedRows===1){
            data={
                code:1,
                msg:'修改成功'
            }
        }else{
            data={
                code:-1,
                msg:'修改失败'
            }  
        }
        res.json(data);
    })
});


module.exports=router;