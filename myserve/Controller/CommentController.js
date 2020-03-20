const express = require('express');
const CommentModel = require('../Model/CommentModel');
const router = express.Router();

router.get("/getcomments", (req, res) => {
    let commentModel = new CommentModel();
    console.log(req.query);
    var page = req.query.page, gid = req.query.gid, uid = Number(req.query.uid);
    commentModel.getcomments(page, gid, uid, (results) => {
        res.json(results)
    })
})

router.post("/insertComment", (req, res) => {
    let commentModel = new CommentModel();
    let data = {
        uid: req.body.uid,
        gid: req.body.gid,
        content: req.body.content,
        kdRate: req.body.kdRate,
        descRate: req.body.descRate,
        serveRate: req.body.serveRate,
        commenttime: req.body.commenttime
    };
    commentModel.insertComments(data, (results) => {
        console.log(results);
        res.json(results);
    })
})
router.post("/deleComment", (req, res) => {
    let commentModel = new CommentModel();
    var cmid = req.body.cmid, uid = req.body.uid
    console.log(req.body);
    commentModel.deleComments(cmid, uid, (results) => {
        res.json(results);
    })
})
router.post("/likeGoods", (req, res) => {
    let commentModel = new CommentModel();
    var data = { cmid: req.body.cmid, luid: Number(req.body.uid), gid: req.body.gid, likenum: req.body.likenum ? req.body.likenum + 1 : 1, likestatus: 1 };
    console.log(req.body);
    commentModel.insertLikeGoods(data, (results) => {
        console.log(results)
        res.json(results)
    })
})
router.get("/getLikeInfo", (req, res) => {
    let commentModel = new CommentModel();
    commentModel.selectLikeGoods((resultsSelect) => {
        res.json(resultsSelect)
    })
})
router.post("/updatelikeInfo", (req, res) => {
    let commentModel = new CommentModel();
    console.log(req.body);
    let lid = req.body.lid, likenum =Number(req.body.likenum) - 1;
    commentModel.updateLikeGoods(lid, likenum, (results) => {
        if(results.affectedRows===1){
            res.json({code:1,msg:'修改成功'})
        }else{
            res.json({code:-1,msg:'取消失败'})
        }
    })
})


module.exports = router;