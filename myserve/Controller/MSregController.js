const express = require('express');
const MSregModel = require('../Model/MSregModel');
const router = express.Router();

router.post("/regInfo", (req, res) => {
    let msregModel = new MSregModel();
    //    console.log(req.body);
    let hid = req.body.hid?req.body.hid:0
    
    ;
    let msinfo = {
        pname: req.body.pname,
        introdu: req.body.introdu,
        note: req.body.note,
        tags: req.body.tags,
        address: req.body.address,
        imgs: req.body.imgSrc.join(","),
        hid: hid,
        sid:req.body.sid
    }

    msregModel.selectMs(hid, (results) => {
        //  console.log(results);
        if (results.length > 0) {
      
            msregModel.updateMs(msinfo,(err,ressult)=>{
                res.json(ressult);
            })
        } else {
            console.log(1);
            msregModel.RegMs(msinfo, (result) => {
            console.log(1);
            res.json(result);
        })
        }
    })
})

module.exports = router;