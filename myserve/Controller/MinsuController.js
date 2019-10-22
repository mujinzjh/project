const express = require('express');
const MinsuModel = require('../Model/MinsuModel');
const router = express.Router();

router.post("/getMinsu", (req, res) => {
    let minsuModel = new MinsuModel();
    console.log(req.body)
    let orderinfo = {
        uname: req.body.uname,
        tel: req.body.tel,
        addtimes: req.body.value1,
        outtimes: req.body.value2,
        beds: req.body.beds,
        num: req.body.num,
        email: req.body.email,
        oname: req.body.oname,
        otel: req.body.otel,
        tags: req.body.tags
    }
    minsuModel.getMinsuInfo(orderinfo, (results) => {
        res.json(results)
    })
})

module.exports = router;