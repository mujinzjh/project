const DbBase=require('../DbBase')

class LoginModel extends DbBase{
    constructor(){
        super();
        this.table="admin"
    }
    login(username,passwd,callback){
        let sql=`select * from ${this.table} where aname='${username}'`
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                // console.log(results[0])
                if(passwd!=results[0].apassword){
                    var data={msg:"密码错误",code:-1}
                    callback(data)
                }else{
                    var data={msg:"登录成功",code:1}
                    callback(data)
                }
                
            }
        })

    }
    updatepwd(username,passwd,callback){
        let sql=`update ${this.table} set apassword='${passwd}' where aname='${username}'`
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                var data={msg:"修改失败",code:-1}
                callback(data)
                return err;
            }else{
             var data={msg:"修改成功",code:1}
            callback(data)
            }
        })

    }



}

module.exports=LoginModel;