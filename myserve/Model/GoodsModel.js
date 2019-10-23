const DbBase=require('./DbBase')

class GoodsModel extends DbBase{
    constructor(){
        super();
        this.table="goods"
    }
    getgoodsInfo(callback){
        let sql=`select * from ${this.table} limit 0,3`
        
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                callback(results)
            }
        })

    }

    getLikegoodsInfo(callback){
        let sql=`select * from ${this.table} `
        
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                callback(results)
            }
        })

    }
    getCateGoods(cid,callback){
        let sql=`select * from ${this.table} where cid=?`
        
        this.mydb.query(sql,[cid],(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                callback(results)
            }
        })

    }


}

module.exports=GoodsModel;