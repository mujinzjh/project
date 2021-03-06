const DbBase = require('./DbBase')

class ShoppingModel extends DbBase {
    constructor() {
        super();
        this.table = "shopping";
        this.table1 = "goods"
    }
    selcetCount(callback) {
        let sql = `select count(*) as num from ${this.table} where status=0`
        this.mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })

    }
    selcetGoods(callback) {
        let sql = `
            select * from (select * from ${this.table} where status=0) a inner join ${this.table1} b on b.gid=a.gid
         `
        //  select * from ${this.table},${this.table1} where ${this.table}.gid=${this.table1}.gid
        this.mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })

    }
    deleteGoods(sid, callback) {
        let sql = `Delete from ${this.table} where sid=?;`
        this.mydb.query(sql, [sid], (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })

    }
    alertGoods(shopnum, sid, callback) {
        let sql = `update ${this.table} set shopnum=? where sid=? ;`
        this.mydb.query(sql, [shopnum, sid], (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })

    }
    updateStutas(data, callback) {
        // let filedStr = '?';
        // if (data.length == 1) {
        //     console.log(filedStr)
        // } else {
        //     for (let index = 0; index < data.length - 1; index++) {
        //         filedStr += ',?'
        //     }
        //     console.log(filedStr)
        // }
        let sql = `update ${this.table} set status=1 where sid in (${data.join(",")});`
        console.log(sql)
        this.mydb.query(sql,(err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })

    }


    selcetGoodsByStutas(callback) {
        let sql = `select * from (select * from ${this.table} where status=1) a inner join ${this.table1} b on b.gid=a.gid`
        this.mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })

    }

}

module.exports = ShoppingModel;