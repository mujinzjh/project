const DbBase=require('./DbBase')

class BookModel extends DbBase{
    constructor(){
        super();
        this.table="book"
    }
    getbookInfo(oid,callback){
        let sql=`select * from ${this.table} where 1  limit 0,1`
        
        this.mydb.query(sql,[oid],(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                callback(results)
            }
        })

    }
}

module.exports=BookModel;