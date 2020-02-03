const DbBase=require('./DbBase')

class LoginModel extends DbBase{
    constructor(){
        super();
        this.table="user"
    }
    loginmyuser(username,passwd,callback){
        let sql=`select * from ${this.table} where username='${username}'`
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                // console.log(results[0])
                if(passwd!=results[0].password){
                    var data={msg:"密码错误",code:-1}
                    callback(data)
                }else{
                    var data={msg:"登录成功",code:1}
                    callback(data)
                }
                
            }
        })

    }



}

module.exports=LoginModel;