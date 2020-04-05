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
    let cid=req.body.cid?req.body.cid:1;
    goodsModel.getCateGoods(cid,(results)=>{
        res.json(results)
    })
})

router.get("/getgoods",(req,res)=>{
    let gid = req.query.gid
    let goodsModel=new GoodsModel();
    goodsModel.getgoods(gid,(results)=>{
        res.json(results)
    })
})

router.get("/Search",(req,res)=>{
    let goodsModel=new GoodsModel();
    console.log(req.query);
    let value=req.query.value;
    goodsModel.getSearch(value,(results)=>{
        res.json(results)
    })
})

router.post("/goodsByGid",(req,res)=>{
    let goodsModel=new GoodsModel();
    let gid=req.body.gid;
    goodsModel.getgoods(gid,(results)=>{
        res.json(results)
    })
})
router.post("/goodsShelves",(req,res)=>{
    let goodsModel=new GoodsModel();
    let gid=req.body.gid;
    goodsModel.goodsShelves(gid,(results)=>{
        res.json(results)
    })
})
module.exports=router;