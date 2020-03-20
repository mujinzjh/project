const DbBase=require('./DbBase')

class CateModel extends DbBase{
    constructor(){
        super();
        this.table="cate"
        this.table1='goods'
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
    getAllcate(callback){
        let sql=`select count(*) as value from ${this.table1} where cid=1;`
        let sql1=`select count(*) as value from ${this.table1} where cid=2;`
        let sql2=`select count(*) as value from ${this.table1} where cid=3;`
        let sql3=`select count(*) as value from ${this.table1} where cid=4;`
        let sql4=`select count(*) as value from ${this.table1} where cid=5;`
        let sql5=`select count(*) as value from ${this.table1} where cid=6;`
        let sql6=`select count(*) as value from ${this.table1} where cid=7;`
        let sql7=`select count(*) as value from ${this.table1} where cid=8`
        this.mydb.query(sql+sql1+sql2+sql3+sql4+sql5+sql6+sql7,(err,results)=>{
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