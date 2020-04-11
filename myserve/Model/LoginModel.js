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
    getMyUser(uid,callback){
        let sql=`select * from ${this.table} where uid=${uid}`
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
               callback(results[0])
            }
        })

    }
    updateName(username,uid,callback){
        let sql=`UPDATE ${this.table} SET username ='${username}' WHERE uid = ${uid}`
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
               callback(results)
            }
        })

    }
    updatePassword(newpwd,uid,callback){
        let sql=`UPDATE ${this.table} SET password ='${newpwd}' WHERE uid = ${uid}`
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

module.exports=LoginModel;