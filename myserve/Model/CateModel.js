const DbBase=require('./DbBase')

class CateModel extends DbBase{
    constructor(){
        super();
        this.table="cate"
    }
    getcateInfo(callback){
        let sql=`select * from ${this.table}`
        
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

module.exports=CateModel;