const express = require('express');
const GoodsModel=require('../../Model/backManagement/goodsModel');
const router = express.Router();
router.get('/goodslist', (req, res)=>{
    var goodsModel=new GoodsModel();
    var page=req.query.currentPage?req.query.currentPage:1,
    pageSize=req.query.pageSize?req.query.pageSize:10;
    goodsModel.select(page,pageSize,(results)=>{
        res.json(results)
    })
});

router.post('/goods', (req, res)=>{
    var goodsModel=new GoodsModel();
    var datew=req.body.date.split('T')[0].split('-');
    var date=datew[0]+'/'+datew[1]+'/'+(Number(datew[2])+1)+'/ '+req.body.date.split('T')[1].split('.')[0];
    var data={
        name:req.body.name,
        price:req.body.price,
        cid:req.body.select,
        img:req.body.img,
        num:req.body.num,
        info:req.body.textarea,
        addtimes:date
    }
    goodsModel.insertGoods(data,(results)=>{
        res.json(results)
    })
});
router.post('/del', (req, res)=>{
    var goodsModel=new GoodsModel();
    var gid=req.body.gid;
    goodsModel.delGoods(gid,(results)=>{
        res.json(results)
    })
});
router.get('/getsearch', (req, res)=>{
    var goodsModel=new GoodsModel();
    var value=req.query.value;
    var page=req.query.currentPage?req.query.currentPage:1,
    pageSize=req.query.pageSize?req.query.pageSize:10;
    goodsModel.getSearch(value,page,pageSize,(results)=>{
        res.json(results)
    })
});
router.get('/getAll', (req, res)=>{
    var goodsModel=new GoodsModel();
    var gid=req.query.gid;
    goodsModel.getAll(gid,(results)=>{
        res.json(results[0])
    })
});
router.post('/updategoods', (req, res)=>{
    var goodsModel=new GoodsModel();
    var gid=req.body.gid;
    goodsModel.delGoods(gid,(results)=>{
        res.json(results)
    })
});
router.post('/updategoodsInfo', (req, res)=>{
    var goodsModel=new GoodsModel();
    console.log(req.body);
    var datew=req.body.date.split('T')[0].split('-');
    var addtimes=datew[0]+'/'+datew[1]+'/'+(Number(datew[2])+1)+'/ '+req.body.date.split('T')[1].split('.')[0],
        name=req.body.name?req.body.name+'':'',
        price=req.body.price?req.body.price+'':'',
        cid=req.body.select+'',
        num=req.body.num+'',
        info=req.body.textarea?req.body.textarea+'':'',
        gid=req.body.gid;
    goodsModel.updateGoods(name,price,cid,num,info,addtimes,gid,(results)=>{
        res.json(results)
    })
});
module.exports=router;