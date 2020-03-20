const DbBase=require('./DbBase')

class LoginModel extends DbBase{
    constructor(){
        super();
        this.table="user"
    }
    loginmyuser(username,passwd,callback){
        let sql=`select * from ${this.table} where username='${username}' and password='${passwd}'`
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
               callback(results[0])
            }
        })

    }



}

module.exports=LoginModel;