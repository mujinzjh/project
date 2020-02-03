const DbBase = require('./DbBase')

class RegModel extends DbBase {
    constructor() {
        super();
        this.table = "user"
    }
    regmyuser(username, passwd, phone, callback) {
        let sql = `insert into ${this.table}(username,password,phone) values('${username}','${passwd}','${phone}')`
        this.mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })

    };
    testmyuser(username, callback) {
        let sql = `select * from ${this.table} where username='${username}'`
        this.mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                if (results[0] != null) {
                    var data = { msg: "用户已经存在", code: -1 }
                    callback(data)
                } else {
                    var data = { msg: "该用户未注册", code: 0 }
                    callback(data)
                }
            }
        })
    }
    InsertAvator(username, avator, callback) {
        let sql = `update ${this.table} set avator="${avator}" where username="${username}" `
        this.mydb.query(sql,(err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })
    }



}

module.exports = RegModel;