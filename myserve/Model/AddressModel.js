const DbBase = require('./DbBase')

class AddressModel extends DbBase {
    constructor() {
        super();
        this.table = "address"
    }

    getCateInfo(callback) {
        let sql=`select * from ${this.table} where 1 `
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err)
                return err;
            }else{
                callback(results);
            }
        })
    }


}

module.exports = AddressModel;