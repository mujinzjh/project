const express = require('express');
const LoginModel=require('../../Model/backManagement/loginModel');
const router = express.Router();
router.get('/login', (req, res)=>{
    let loginModel=new LoginModel();
    var aname=req.query.username,apassword=req.query.pass;
    loginModel.login(aname,apassword,(results)=>{
        res.json(results)
    })
});
router.post('/updatepwd', (req, res)=>{
    let loginModel=new LoginModel();
    var aname=req.body.aname,apassword=req.body.newPassword;
    loginModel.updatepwd(aname,apassword,(results)=>{
        res.json(results)
    })
});



module.exports=router;