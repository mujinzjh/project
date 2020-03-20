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




module.exports=router;