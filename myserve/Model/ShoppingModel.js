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


    selcetGoodsByStutas(uid,callback) {
        let sql = `select * from (select * from ${this.table} where status=1 and uid=${uid}) a inner join ${this.table1} b on b.gid=a.gid`
        this.mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })

    }
    getComment(uid,callback){
        let sql = `select * from (select * from ${this.table} where status=2 and uid=${uid}) a inner join ${this.table1} b on b.gid=a.gid`
        this.mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })
    }
    changeToComment(sid,callback){
        let sql = `update ${this.table} set status=2 where sid=${sid}`;
        this.mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })
    }
    updateCommentSid(sid,callback){
        let sql = `update ${this.table} set status=3 where sid=${sid}`;
        this.mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })
    }
    //获取所有的订单
    getAllOrder(uid,callback){
        let sql = `select a.sid,a.shopnum,a.uid,a.gid,a.status,b.gid,b.cid,b.name,b.price,b.num,b.img,b.info from ${this.table} as a left join ${this.table1} as b on a.gid=b.gid where uid=${uid}`
        this.mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })

    }
    getCountByGid(gid,callback){
        console.log(gid)
        let sql=`select count(*) as nums from ${this.table} where status>0 GROUP BY gid having gid in(${gid});`
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