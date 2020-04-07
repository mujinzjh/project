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




module.exports=router;