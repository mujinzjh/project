const express = require('express');
const ListModel = require('../Model/ListModel');
const router = express.Router();

router.get("/getAddress", (req, res) => {
    let listModel = new ListModel();
    listModel.getAddress((results) => {
        res.json(results)
    })
})

router.get("/getRoom", (req, res) => {
    let listModel = new ListModel();
    console.log(req.query.aid);
    let aid = req.query.aid;
    console.log(req.query.page);
    let page = req.query.page;
    listModel.getRoomInfo(aid, page, (results) => {
        res.json(results)
    })
})



router.post("/storereg", (req, res) => {
    let listModel = new ListModel();
    console.log(req.body);
    let name = req.body.pname
    let price = req.body.price
    let imgs = req.body.imgSrc.join(',')
    let aid = req.body.aid
    let storeinfo = {
        name: name,
        price: price,
        imgs: imgs,
        aid: aid
    }
    listModel.insertSrore(storeinfo, (results) => {
        res.json(results)
    })
})


router.post("/delInfo", (req, res) => {
    let listModel = new ListModel();
    console.log(req.body);
    let sid = req.body.sid; 
    listModel.DelStoreInfo(sid, (results) => {
        if(results.affectedRows){
            res.json({code:1,msg:"删除成功"})
        }else{
            res.json({code:-1,msg:"删除失败"})
        }
        
    })
})





module.exports = router;