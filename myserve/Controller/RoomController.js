const express = require('express');
const RoomModel=require('../Model/RoomModel');
const router = express.Router();

router.get("/getInfo",(req,res)=>{
    let roomModel=new RoomModel();
    console.log(req.query.hid);
    let hid=req.query.hid
    roomModel.getRoomInfo(hid,(results)=>{
        res.json(results)
    })
})

router.get("/getRoomsInfo",(req,res)=>{
    let roomModel=new RoomModel();
    console.log(req.query.rid);
    let rid=req.query.rid
    roomModel.getRoomInfoByrid(rid,(results)=>{
        res.json(results)
    })
})


router.post("/getRoom", (req, res) => {
    let roomModel = new RoomModel();
    console.log(req.body);
    let msinfo = {
        rname: req.body.name,
        price: req.body.price,
        beds: req.body.beds,
        hid: req.body.hid,
        imgs:req.body.imgSrc.join(",")
    }
    roomModel.Room(msinfo, (results) => {
        console.log(results);
        res.json(results)
    })
})

router.get("/getAllRoom",(req,res)=>{
    let roomModel=new RoomModel();
    roomModel.getAllRoomInfo((results)=>{
        res.json(results)
    })
})
router.post("/delInfo",(req,res)=>{
    let roomModel=new RoomModel();
    let rid=req.body.rid
    roomModel.DelRoom(rid,(results)=>{
        if(results.affectedRows){
            res.json({code:1,msg:"删除成功"})
        }else{
            res.json({code:-1,msg:"删除失败"})
        }
    })
})


module.exports=router;