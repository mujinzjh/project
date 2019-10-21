const express = require('express');
const BookModel=require('../Model/BookModel');
const router = express.Router();

router.post("/getInfo",(req,res)=>{
    let bookModel=new BookModel();
    let oid=req.body.oid
    bookModel.getbookInfo(oid,(results)=>{
        res.json(results)
    })
})


module.exports=router;