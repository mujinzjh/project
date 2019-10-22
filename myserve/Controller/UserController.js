const express = require('express');
const UserModel = require('../Model/UserModel');
const router = express.Router();



//注册
router.post("/reg", function (req, res) {
    let userModel = new UserModel()
    let username = req.body.name
    let password = req.body.passW
    userModel.selectUser(username, (result) => {
        if (result.length > 0) {
            res.json({ code: -1, msg: "username_has_exited" })
        } else {
            userModel.registerUser(username, password, (resultRes) => {
                res.json(resultRes)
            })
        }
    })
})


    //登录
    router.post("/login", function (req, res) {
        let userModel = new UserModel();
        let username = req.body.name;
        let password = req.body.passW
        userModel.getUserByUsername(username, password, (results) => {
            let ob = {
                code: 1,
                msg: '登陆成功'
            };
            if (results.length == 0) {
                ob = {
                    code: -1,
                    msg: '用户不存在'
                }
            } else if (results[0].password != password) {
                ob = {
                    code: 0,
                    msg: '密码错误'
                }
            }
            res.json(ob)
        })
    })

//我要入驻注册
router.post("/tenareg", function (req, res) {
    let userModel = new UserModel()
    let username = req.body.name
    let password = req.body.pass
    userModel.selectUser(username, (result) => {
        if (result.length > 0) {
            res.json({ code: -1, msg: "username_has_exited" })
        } else {
            userModel.registerUser(username, password, (resultRes) => {
                res.json(resultRes)
            })
        }
    })
}) 


 //我要入驻登录
 router.post("/tenalogin", function (req, res) {
    let userModel = new UserModel();
    let username = req.body.name;
    let password = req.body.pass
    userModel.getUserByUsername(username, password, (results) => {
        let ob = {
            code: 1,
            msg: '登陆成功'
        };
        if (results.length == 0) {
            ob = {
                code: -1,
                msg: '用户不存在'
            }
        } else if (results[0].password != passwd) {
            ob = {
                code: 0,
                msg: '密码错误'
            }
        }
        res.json(ob)
    })
})

    module.exports = router;
