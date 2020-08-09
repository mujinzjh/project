const DbBase=require('../DbBase')

class goodsModel extends DbBase{
    constructor(){
        super();
        this.table="goods";
        this.table1='cate'
    }
    select(page,pageSize,callback){
        let startpage=(page-1)*pageSize;
        let sql=`select * from ${this.table}  e,${this.table1} d where e.cid=d.cid  ORDER BY e.addtimes DESC  limit ${startpage},${pageSize};`,
        sqlCount=`select count(*) as nums from ${this.table}`;
        this.mydb.query(sql+sqlCount,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
              callback(results);
            }
        })
    }
    insertGoods(data,callback){
       let fieldstr='',field='';
       let date=[];
       let isfirst=true;
       for (const key in data) {
           if (data.hasOwnProperty(key)) {
               fieldstr+=(isfirst?'':',')+key;
               field+=(isfirst?'':',')+'?';
               date.push(data[key]);
           }
           isfirst=false;
       }
        let sql=`insert into ${this.table}(${fieldstr}) values (${field})`
        this.mydb.query(sql,date,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
              callback(results);
            }
        })
    }
    delGoods(gid,callback){
         let sql=`DELETE FROM ${this.table} WHERE gid =` +gid;
         this.mydb.query(sql,(err,results)=>{
             if(err){
                 console.log(err);
                 return err;
             }else{
               callback(results);
             }
         })
     }
     getSearch(value,page,pageSize,callback){
         let startpage=(page-1)*pageSize;
        let sql=`select * from ${this.table}  e,${this.table1} d where e.cid=d.cid and e.name LIKE '%`+value+`%' limit `+startpage+`,`+pageSize;
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
              callback(results);
            }
        })
     }
     getAll(gid,callback){
         let sql=`select * from ${this.table}  e,${this.table1} d where e.cid=d.cid and e.gid=`+gid;
         this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
              callback(results);
            }
        })
     }


     updateGoods(name,price,cid,num,info,gid,callback){
         console.log(name,price,cid,num,info,gid);
         let sql=`update ${this.table} set name='${name}',price=${price},cid=${cid},info='${info}' where gid=${gid}`;
         console.log(sql);
         this.mydb.query(sql,(err,results)=>{
             if(err){
                 console.log(err);
                 return err;
             }else{
               callback(results);
             }
         })
     }
  



}

module.exports=goodsModel;