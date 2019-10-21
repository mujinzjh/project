const express = require('express');
const AddressModel = require('../Model/AddressModel');
const router = express.Router();

router.post("/getCateInfo", (req, res) => {
    let addressModel=new AddressModel();
    addressModel.getCateInfo((results)=>{
        res.json(results);
    })
})

module.exports = router;