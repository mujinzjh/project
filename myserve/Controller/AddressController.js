const express = require('express');
const AddressModel = require('../Model/AddressModel');
const router = express.Router();

router.post("/addAddress", (req, res) => {
    let addressModel = new AddressModel();
    console.log(req.body);
    let addressObj = {
        name: req.body.content.name,
        tel: req.body.content.tel,
        address: (req.body.content.province ? req.body.content.province : '') + (req.body.content.city ? req.body.content.city : '') + (req.body.content.county ? req.body.content.county : '') + (req.body.content.addressDetail ? req.body.content.addressDetail : ''),
        email: req.body.content.postalCode,
        defaultAddress: req.body.content.isDefault ? 1 : 0
    }
    addressModel.InsertInfo(addressObj, (results) => {
        if (results.affectedRows) {
            res.json({ code: 1, meg: "添加成功" })
        }
    })
})
router.get("/getAll", (req, res) => {
    let addressModel = new AddressModel();
    addressModel.selectInfo((results) => {
        res.json(results)
    })
})
router.get("/getAddById", (req, res) => {
    let addressModel = new AddressModel();
    let aid=req.query.aid?req.query.aid:1
    addressModel.selectInfoById(aid,(results) => {
        res.json(results)
    })
})


module.exports = router;