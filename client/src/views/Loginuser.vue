<template>
  <div>
    <div class="mydiv">用户登录</div>
    <van-field
      v-model="username"
      clearable
      label="用户名"
      placeholder="请输入用户名"
      @blur="testmyuser"
    />

    <van-field
      v-model="password"
      type="password"
      label="密码"
      placeholder="请输入密码"
   
    />
  <div class="mybutton">
<van-button class
    ="myclickreg" @click="loginuser" color="linear-gradient(to right, #4bb0ff, #6149f6)">登录</van-button>
 <van-button class
    ="myclickreg" @click="regmyuser" color="linear-gradient(to right, #4bb0ff, #6149f6)">点击注册</van-button>
    <!-- <van-button slot="button" size="small" type="primary" @click="gophone">点击手机登录</van-button> -->
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
     
    };
  },
  methods: {
    regmyuser(){
              this.$router.push("register");

    },
    testmyuser() {
      if(this.username!=''){
       this.axios
        .post("/Reg/testuser", {
          username: this.username
        })
        .then(response => {
          // console.log(response.data);
          if (response.data.code == 0) {
            console.log("该用户未注册,请先注册");
            this.$dialog
              .alert({
                message: "该用户未注册,请先注册"
              })
              .then(() => {
                // on close
              });
              this.$router.push("register");
            
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      }
   
    },
    loginuser(){
     if(this.username!=''&&this.password!=''){
     this.axios
      .post('/Login/user',{
          username: this.username,
          password: this.password,
        }).then((response)=> {
          console.log(response.data);
          if(response.status===200&&response&&response.data){
             this.$store.commit('increment')
            this.$store.state.username=this.username;
            localStorage.setItem("username", this.username);
            localStorage.setItem('uid',response.data.uid);
            var value = localStorage.getItem("username");
            this.$router.push("/index");
          }else{
            
            this.$notify({
            message: "密码或账号错误,请重新输入",
            duration: 2000,
            color: '#fff',
            background: '#BDCBE5'
          });
          }

        })
        .catch(function(error) {
          console.log(error);
        })
     }else if(this.username==''||this.password==''){
        this.$dialog
              .alert({
                message: "请填写完整"
              })
              .then(() => {
                // on close
              });
     }
     }
     
  },

created() {
}
};
</script>

<style scoped>
.mydiv{
    width: 100%;
    height: 200px;
    background-color: #fff;
    font-size: 38px;
    color: #fff;
    font-family:Georgia, 'Times New Roman', Times, serif;
    font-weight: bolder;
    line-height: 200px;
    background: linear-gradient(to right, #4bb0ff, #6149f6);
    text-align: center;

}
.mybutton{
width: 100%;
display: flex;
}
.myclickreg{
   top: 150px;
   font-family: cursive;
    font-size: 18px;
    margin: 0 auto;
    width: 104px;
}

</style>