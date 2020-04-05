const DbBase = require('./DbBase')

class GoodsModel extends DbBase {
    constructor() {
        super();
        this.table = "goods"
        this.table1='shopping'
    }
    getgoodsInfo(callback) {
        let sql = `select * from ${this.table} where status=1 limit 0,3 `

        this.mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })

    }

    getLikegoodsInfo(callback) {
        let sql = `select * from ${this.table} where status = 1`
        this.mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })

    }
    getCateGoods(cid, callback) {
        let sql = `select * from ${this.table} where cid=? and status = 1`
        this.mydb.query(sql, [cid], (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })

    }
    getSearch(value, callback) {
        let sql = `select * from ${this.table} where name like '%' ? '%';`
        this.mydb.query(sql, [value], (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }
        })

    }
    getgoods(gid,callback){
        let sql=`select * from ${this.table} where gid=${gid}`
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                callback(results)
            }
        })

    }
    goodsShelves(gid,callback){
        let sql=`update ${this.table} set status=1 where gid=${gid}`
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                callback(results)
            }
        })

    }
}

module.exports = GoodsModel;