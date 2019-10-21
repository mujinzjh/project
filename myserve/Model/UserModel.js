const DbBase = require('./DbBase')

class UserModel extends DbBase {
    constructor() {
        super();
        this.table = "user"
    }


    selectUser(username, callback) {
        var sql = `select * from ${this.table} where username=?`
        this.mydb.query(sql, [username], (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                console.log(results);
                callback(results)
            }
        })
    }

    registerUser(username, password, callback) {
        var sql = `insert into user(username,password) values(?,?)`
        this.mydb.query(sql, [username, password], (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                console.log(results);
                callback(results)
            }
        })
    }

    getUserByUsername(username, password, callback) {
        var sql = `select * from ${this.table}  where username=? and password=?`
        this.mydb.query(sql,[username,password],(err,results)=>{
            if (err) {
                console.log(err);
                return err;
            } else {
                console.log(results);
                callback(results)
            }
        })
    }
}



module.exports = UserModel;