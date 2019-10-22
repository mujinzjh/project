const DbBase = require('./DbBase')

class RoomModel extends DbBase {
    constructor() {
        super();
        this.table = "address";
        this.table1 = "store"
    }

    getAddress(callback) {
        let sql = `select * from ${this.table} where 1`
        this.mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return err;

            }
            else {
                console.log(results);
                callback(results)
            }
        })
    }
    getRoomInfo(aid, page, callback) {
        let sql = "select * from store where 1 ";
        if (aid != undefined) {
            sql += "and aid=?"
        }
        if (page) {
            sql += ` limit ${(page - 1) * 9},9`
        }
        this.mydb.query(sql, [aid, page], function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            callback(results)
            console.log(results, sql);
        })



    }
    insertSrore(storeinfo, callback) {
       
        let data = [storeinfo.name,storeinfo.price,storeinfo.imgs,storeinfo.aid];
        
        let sql = `INSERT INTO ${this.table1} (name,price,imgs,aid) VALUES (?,?,?,?) `
        this.mydb.query(sql,data,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                console.log(results);
                callback(results);
            }
        })
    }

    DelStoreInfo(sid,callback){
        let sql=`delete from ${this.table1} where sid=? `
        this.mydb.query(sql,[sid],(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                console.log(results);
                callback(results)
            }
        })
    }

}

module.exports = RoomModel;