const DbBase=require('./DbBase')

class CommentModel extends DbBase{
    constructor(){
        super();
        this.table="comments";
        this.table1='goods';
        this.table2='user';
        this.table3='likegoods'

    }
    getcomments(page,gid,uid,callback){
        let pagenum=4
        let sql=`select * from ${this.table} as a left join ${this.table1} as b on a.gid=b.gid left join ${this.table2} as c on a.uid=c.uid where a.gid=${gid} limit ${(page-1)*pagenum},${pagenum};`
        let mysql=`select * from ${this.table3} as a left join ${this.table} as b on a.cmid=b.cmid where a.luid=${uid}`
        this.mydb.query(sql+mysql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                callback(results)
            }
        })

    }
    insertComments(data,callback){
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
    deleComments(cmid,uid,callback){
        let sql=`delete from ${this.table} where cmid=${cmid} and uid=${uid} `;
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
              callback(results);
            }
        })
    }
    insertLikeGoods(data,callback){
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
         let sql=`insert into ${this.table3}(${fieldstr}) values (${field})`
         this.mydb.query(sql,date,(err,results)=>{
             if(err){
                 console.log(err);
                 return err;
             }else{
               callback(results);
             }
         })
    }
    selectLikeGoods(callback){
        let sql=`select * from ${this.table3}`;
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else{
              callback(results);
            }
        })
    }
    updateLikeGoods(lid,likenum,callback){
        let sql=`update ${this.table3} set likenum=${likenum},likestatus=0 where lid=${lid}`;
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

module.exports=CommentModel;