const express = require('express');
const GoodsModel=require('../Model/GoodsModel');
const router = express.Router();

router.get("/",(req,res)=>{
    let goodsModel=new GoodsModel();
    goodsModel.getgoodsInfo((results)=>{
        res.json(results)
    })
})



router.get("/getInfo",(req,res)=>{
    let goodsModel=new GoodsModel();
    goodsModel.getLikegoodsInfo((results)=>{
        res.json(results)
    })
})

router.post("/getGoosInfoByCid",(req,res)=>{
    let goodsModel=new GoodsModel();
    console.log(req.body)
    let cid=req.body.cid;
    goodsModel.getCateGoods(cid,(results)=>{
        res.json(results)
    })
})


module.exports=router;