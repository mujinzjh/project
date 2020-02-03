const DbBase=require('./DbBase')

class CommentModel extends DbBase{
    constructor(){
        super();
        this.table="comments"
    }
    getcomments(page,callback){
        let pagenum=4
        let sql=`select * from ${this.table} where 1 limit ${(page-1)*pagenum},${pagenum}`
        
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

module.exports=CommentModel;