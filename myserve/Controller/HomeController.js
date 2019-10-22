const express = require('express');
const HomeModel=require('../Model/HomeModel');
const router = express.Router();

router.post("/getInfo",(req,res)=>{
    let homeModel=new HomeModel();
    let hid=req.body.hid
    homeModel.getHomeInfo(hid,(results)=>{
        res.json(results)
    })
})

router.get("/getAllInfo",(req,res)=>{
    let homeModel=new HomeModel();
 
    homeModel.getInfo((results)=>{
        res.json(results)
    })
})
module.exports=router;