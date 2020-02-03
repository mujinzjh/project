const express = require('express');
const CommentModel=require('../Model/CommentModel');
const router = express.Router();

router.get("/getcomments",(req,res)=>{
    let commentModel=new CommentModel();
    
    commentModel.getcomments(req.query.page,(results)=>{
        res.json(results)
    })
})


module.exports=router;