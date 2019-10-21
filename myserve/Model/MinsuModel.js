const DbBase = require('./DbBase')

class MinsuModel extends DbBase {
    constructor() {
        super();
        this.table = "book"
    }

    getMinsuInfo(orderinfo, callback) {
        let filedstr = '',
            filed = '';
        let isFirst = true;
        let data = [];
        for (const key in orderinfo) {
            if (orderinfo.hasOwnProperty(key)) {
                filedstr += (isFirst ? '' : ',') + key;
                filed += (isFirst ? '' : ',') + '?';
                data.push(orderinfo[key]);
                isFirst = false;
            }
        }

        let sql = `insert into  ${this.table} (${filedstr}) values (${filed})`
        this.mydb.query(sql, data, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                console.log(results)
                callback(results)
            }
        })
    }



}

module.exports = MinsuModel;