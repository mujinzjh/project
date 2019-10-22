const DbBase = require('./DbBase')

class MSregModel extends DbBase {
    constructor() {
        super();
        this.table = "Home"
    }

    selectMs(hid, callback) {
        let sql = `select * from ${this.table} where hid=? `
        this.mydb.query(sql, [hid], (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(results)
            }

        })
    }
    updateMs(msinfo, callback) {
        let sql =`UPDATE ${this.table} SET  pname=?,introdu=?,tags=?,imgs=?,note=?,address=? where hid=?`
        let data=[msinfo.pname,msinfo.introdu,msinfo.tags,msinfo.imgs,msinfo.note,msinfo.address,msinfo.hid];
        this.mydb.query(sql,data,(err,results)=>{
            if(err){
                console.log(err)
                return err;
            }else{
                callback(results);
            }
        })

}

    RegMs(msinfo, callback) {
        let filedstr = '',
            filed = '';
        let isFirst = true;
        let data = [];
        for (const key in msinfo) {
            if (msinfo.hasOwnProperty(key) && key!="sid") {
                filedstr += (isFirst ? '' : ',') + key;
                filed += (isFirst ? '' : ',') + '?';
                data.push(msinfo[key]);
                isFirst = false;
            }
        }
        // let sql=`select * from ${this.table} where 1 `;

        let sql = `INSERT INTO ${this.table} (${filedstr}) VALUES (${filed})`
     
        this.mydb.query(sql, data, (err, results) => {
            if (err) {
                console.log(err);
                return err;

            }
            else {
                console.log(results.insertId);
                console.log(msinfo.sid)
                let newSql=`update store set hid=${results.insertId} where sid=${msinfo.sid}`
                this.mydb.query(newSql,(err,myresults)=>{
                    if(err){
                        console.log(err)
                        return
                    }else{
                        callback(myresults)
                    }
                })
            }
        })
    }




}

module.exports = MSregModel;