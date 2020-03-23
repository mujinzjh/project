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
router.post("/changeToComment", (req, res) => {
    let shoppingModel = new ShoppingModel();
    var sid=req.body.sid;
    shoppingModel.changeToComment(sid,(results) => {
        res.json(results)
    })
    // res.json("已添加至购物车")
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
    var uid=req.query.uid;
    shoppingModel.selcetGoodsByStutas(uid,(results) => {
        res.json(results)
    })
    // res.json("已添加至购物车")
})
router.get("/getcomment", (req, res) => {
    let shoppingModel = new ShoppingModel();
    var uid=req.query.uid;
    shoppingModel.getComment(uid,(results) => {
        res.json(results)
    })
    // res.json("已添加至购物车")
})

router.get("/getAllOrder", (req, res) => {
    let shoppingModel = new ShoppingModel();
    let uid=Number(req.query.uid);
    shoppingModel.getAllOrder(uid,(results) => {
        res.json(results)
    })
})


router.post("/updateCommentSid", (req, res) => {
    let shoppingModel = new ShoppingModel();
    var sid=req.body.sid;
    shoppingModel.updateCommentSid(sid,(results) => {
        res.json(results)
    })
})
router.get("/getCountByGid", (req, res) => {
    let shoppingModel = new ShoppingModel();
    let gid=req.query.gid;
    shoppingModel.getCountByGid(gid,(results) => {
        var data={};
        if(results.length===0){
            data={
                code:-1,
                num:0
            }
            res.json(data)
        }else{
            data={
                code:1,
                num:results.length
            }
            res.json(data)
        }
    })
})


module.exports = router;