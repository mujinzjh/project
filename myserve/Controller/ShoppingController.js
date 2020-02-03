const express = require('express');
const ShoppingModel = require('../Model/ShoppingModel');
const router = express.Router();

router.get("/getcount", (req, res) => {
    let shoppingModel = new ShoppingModel();
    shoppingModel.selcetCount((results) => {
        res.json(results)
    })
    // res.json("已添加至购物车")
})
router.post("/shopGoods", (req, res) => {
    let shoppingModel = new ShoppingModel();
    shoppingModel.selcetGoods((results) => {
        // console.log(results)
        res.json(results)
    })
    // res.json("已添加至购物车")
})
router.post("/deleteshopGoods", (req, res) => {
    let shoppingModel = new ShoppingModel();
    console.log(req.body);
    let sid=req.body.sid;
    shoppingModel.deleteGoods(sid,(results) => {
        console.log(results)
        if(results.affectedRows){
            res.json({code:1,meg:"删除成功"})
        }
        // res.json(results)
    })
    // res.json("已添加至购物车")
})
router.post("/alertshopGoods", (req, res) => {
    let shoppingModel = new ShoppingModel();
    console.log(req.body);
    let sid=req.body.sid;
    let shopnum=req.body.shopnum;
    shoppingModel.alertGoods(shopnum,sid,(results) => {
        console.log(results)
        if(results.affectedRows){
            res.json({code:1,meg:"修改成功"})
        }
        // res.json(results)
    })
    // res.json("已添加至购物车")
})

router.post("/updateStatus", (req, res) => {
    let shoppingModel = new ShoppingModel();
    console.log(req.body);
    let sid=req.body.sid;
    let data=[];
    sid.forEach(el=>{
        data.push(el.sid)
    })
    console.log(data);
    shoppingModel.updateStutas(data,(results) => {
        console.log(results)
        if(results.affectedRows){
            res.json({code:1,meg:"修改成功"})
        }
        // res.json(results)
    })

})


router.get("/getAll", (req, res) => {
    let shoppingModel = new ShoppingModel();
    shoppingModel.selcetGoods((results) => {
        res.json(results)
    })
    // res.json("已添加至购物车")
})
router.get("/selectWaitGet", (req, res) => {
    let shoppingModel = new ShoppingModel();
    shoppingModel.selcetGoodsByStutas((results) => {
        res.json(results)
    })
    // res.json("已添加至购物车")
})


module.exports = router;