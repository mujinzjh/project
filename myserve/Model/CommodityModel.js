const DbBase=require('./DbBase')

class CommodityModel extends DbBase{
    constructor(){
        super();
        this.table="shopping"
    }
    addgoods(uid,gid,callback){
        let sql = `INSERT INTO ${this.table}(uid,gid) VALUES (${uid},${gid});`   
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

module.exports=CommodityModel;