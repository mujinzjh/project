const mysql=require("mysql");

class DbBase{

    constructor(){
        this.mydb=mysql.createConnection(require("../config/db.config"))
        this.mydb.connect();
    }
    end(){
        this.mydb.end();
    }

}
module.exports=DbBase;