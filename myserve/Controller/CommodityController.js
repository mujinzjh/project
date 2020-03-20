const express = require('express');
const CommodityModel=require('../Model/CommodityModel');
const router = express.Router();

router.post("/addgoods",(req,res)=>{
    let commodityModel=new CommodityModel();
    commodityModel.addgoods(req.body.uid,req.body.gid,(results)=>{
        
            res.json({code:1,Msg:'收藏成功'})
        
    })
    // res.json("已添加至购物车")
})


module.exports=router;