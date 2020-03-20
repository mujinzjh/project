const express = require('express');
const CateModel=require('../Model/CateModel');
const router = express.Router();

router.get("/",(req,res)=>{
    let cateModel=new CateModel();
    cateModel.getcateInfo((results)=>{
        res.json(results)
    })
})
router.get("/getAllcate",(req,res)=>{
    let cateModel=new CateModel();
    cateModel.getAllcate((results)=>{
        res.json(results)
    })
})


module.exports=router;