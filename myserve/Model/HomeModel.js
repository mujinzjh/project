const DbBase=require('./DbBase')

class HomeModel extends DbBase{
    constructor(){
        super();
        this.table="home"
    }

    getHomeInfo(hid,callback){
        let sql=`select * from ${this.table} where hid=? `
        
        this.mydb.query(sql,[hid],(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                callback(results)
            }
        })
    }
    getInfo(callback){
        let sql=`select * from ${this.table} where 1 limit 0,4 `
        
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

module.exports=HomeModel;