const DbBase=require('./DbBase')

class RoomModel extends DbBase{
    constructor(){
        super();
        this.table="room"
    }

    getRoomInfo(hid,callback){
        console.log(1);
        let sql=`select * from ${this.table} where hid = ? `

        this.mydb.query(sql,[hid],(err,results)=>{
            console.log(2);
            if(err){
                console.log(err);
                return err;
            }else{
                // console.log(results)
                callback(results)
            }
        })
    }

    getRoomInfoByrid(rid,callback){
        console.log(1);
        let sql=`select * from ${this.table} where rid = ? `

        this.mydb.query(sql,[rid],(err,results)=>{
            console.log(2);
            if(err){
                console.log(err);
                return err;
            }else{
                // console.log(results)
                callback(results)
            }
        })
    }

    Room(msinfo, callback) {
        let filedstr = '',
            filed = '';
        let isFirst = true;
        let data = [];
        for (const key in msinfo) {
            if (msinfo.hasOwnProperty(key)) {
                filedstr += (isFirst ? '' : ',') + key;
                filed += (isFirst ? '' : ',') + '?';
                data.push(msinfo[key])
            }
            isFirst = false;
        }
        let sql = `INSERT INTO ${this.table} (${filedstr}) VALUES (${filed})`
        this.mydb.query(sql, data, (err, results) => {
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
    getAllRoomInfo(callback){
        let sql=` select * from ${this.table} where 1`
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                callback(results);
            }
        })
    }

    DelRoom(rid,callback){
        let sql=` delete from ${this.table} where rid=?`
        this.mydb.query(sql,[rid],(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                console.log(results);
                callback(results);
            }
        })
    }

}

module.exports=RoomModel;