const DbBase = require('./DbBase')

class AddressModel extends DbBase {
    constructor() {
        super();
        this.table = "address"
    }

    InsertInfo(obj, callback) {
        let filedstr = '',
            filed = '';
        let isFirst = true;
        let data = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                filedstr += (isFirst ? '' : ',') + key;
                filed += (isFirst ? '' : ',') + '?';
                data.push(obj[key]);
                isFirst = false;
            }
        }


        let sql = `INSERT INTO ${this.table} (${filedstr}) VALUES (${filed})`
        this.mydb.query(sql, data, (err, result) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(result);
            }

        })


    }

    selectInfo(callback) {
        let sql = `select * from ${this.table}`;
        this.mydb.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(result);
            }

        })
    }
    selectInfoById(aid, callback) {
        let sql = `select * from ${this.table} where aid=?`;
        this.mydb.query(sql, [aid], (err, result) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                callback(result);
            }

        })
    }

}

module.exports = AddressModel;