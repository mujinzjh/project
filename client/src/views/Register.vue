<template>
  <div class="reg-content">
    <div class="mydiv">用户注册</div>
    <div class="form-content">
<van-field v-model="username" clearable label="用户名" placeholder="请输入用户名" @blur="testmyuser" />

    <van-field
      v-model="password"
      type="password"
      label="密码"
      placeholder="请输入密码"
      @blur="testpasswd"
    />
    <van-field
      v-model="mypassword"
      type="password"
      label="确认密码"
      placeholder="请再次输入密码"
      @blur="testmypasswd"
    />
    <van-field v-model="phone" clearable label="手机号" placeholder="请输入手机号" @blur="testmyphone" />
    <van-field v-model="sms" center clearable label="验证码" placeholder="请输入验证码" @blur="testmysms">
      <van-button slot="button" size="small" @click="sendsms">
        <div v-if="mysvgstatus==0">获取验证码</div>
        <div v-else>
          <div v-html="mysvg" class="mysvgcode"></div>
        </div>
      </van-button>
    </van-field>
    </div>
    

<div class="mybutton">
    <van-button
      class="myclickreg"
      is-link @click="regmyuser"
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
    >点击注册</van-button>

    <van-button
      class="myclickreg"
     @click="gotologin"
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
    >我已注册,直接登录</van-button>
   <van-popup v-model="show" class="success">注册成功!立即登录</van-popup>
</div>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      mypassword: "",
      phone: "",
      sms: "",
      mysvgstatus: 0,
      mysvg: "",
      mycode: "",
      myuserisrepeat: "",
      show:false
    };
  },
  methods: {
    gotologin(){
              this.$router.push({name:"loginuser"});

    },
    testmyuser() {
      if(this.username!=''){
   this.axios
        .post("/Reg/testuser", {
          username: this.username
        })
        .then(response => {
          console.log(response.data);
          if (response.data.code == -1) {
            console.log("用户已存在,请重新输入用户名");
            this.$dialog
              .alert({
                message: "用户已存在,请重新输入用户名"
              })
              .then(() => {
                // on close
              });
            this.username = "";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      }
   
    },
    regmyuser() {
      var regtime=new Date().getTime();
         if (this.username == "" || this.password == "" || this.phone == "") {
            console.log("请将资料完整");
            this.$dialog
              .alert({
                message: "请将资料填写完整!"
              })
              .then(() => {
                // on close
              });
          } else {
        this.axios
        .post("/Reg/user", {
          username: this.username,
          password: this.password,
          phone: this.phone,
          regtime:regtime
        })
        .then(response => {
          // console.log(response);
       if (this.mycode == 1&&this.sms!='') {
              console.log("验证码正确");
             
              this.show = true;
              setTimeout(() => {
              this.$router.push("/");
                
              }, 2000);
            } else if(this.sms==''){
                  console.log("验证码不能为空")
            }else{
              console.log("验证码错误");
             this.$notify({
            message: "验证码错误,请重新验证",
            duration: 2000,
            color: '#fff',
            background: '#BDCBE5'
          });
            }
        })
        .catch(function(error) {
          console.log(error);
        });
      
          }
      // this.axios
      //   .post("/Reg/user", {
      //     username: this.username,
      //     password: this.password,
      //     phone: this.phone
      //   })
      //   .then(response => {
      //     // console.log(response);
 
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    testpasswd() {
      // 要求：可以包含数字、字母、下划线，并且要同时含有数字和字母，且长度要在8-16位之间。
      if (this.password != "") {
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,16}$/;
        var re = new RegExp(reg);
        if (re.test(this.password)) {
          console.log("正确");
        } else {
          console.log("密码格式有误");
          this.password=''
          this.$notify({
            message: "密码格式有误(长度8-20位，必须包含数字和字母),请重新输入",
            duration: 2000,
            color: '#fff',
            background: '#BDCBE5'
          });
        }
      }
    },
    testmypasswd() {
      if (this.mypassword != this.password) {
        console.log("两次密码不一致");
        this.mypassword=''
        this.$notify({
            message: "两次密码不一致,请重新输入",
            duration: 2000,
            color: '#fff',
            background: '#BDCBE5'
          });
      } else {
        console.log("正确");
      }
    },
    testmyphone() {
      var reg = /^1[34578]\d{9}$/;
      var re = new RegExp(reg);
      if (re.test(this.phone)) {
        console.log("正确");
      } else {
        console.log("手机号有误");
        this.phone=''
        this.$notify({
            message: "手机号输入有误,请重新输入",
            duration: 2000,
            color: '#fff',
            background: '#BDCBE5'
          });
      }
    },
    testmysms() {
      console.log(this.sms);
      if(this.sms!=''){
 this.axios
        .get("/Reg/judgeCode", {
          params: {
            sms: this.sms
          }
        })
        .then(response => {
          // console.log(response);
          if (response.data.status == 0) {
            console.log("验证码错误");
             this.$notify({
            message: "验证码错误,请重新验证",
            duration: 2000,
            color: '#fff',
            background: '#BDCBE5'
          });
            this.mycode = 0;
          } else {
            this.mycode = 1;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      }
     
    },
    sendsms() {
      this.axios
        .get("/Reg/captcha")
        .then(response => {
          console.log(response);
          this.mysvg = response.data;
          this.mysvgstatus = 1;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {}
};
</script>

<style scoped>
.reg-content{
  min-height: 809px;
  background: linear-gradient(to right, #4bb0ff, #6149f6);
}
.van-cell{
  margin-top: 2%;
}
.form-content{
  padding: 10px;
}
.mydiv {
  width: 100%;
  height: 200px;
  background-color: #fff;
  font-size: 38px;
  color: #fff;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: bolder;
  line-height: 200px;
  background: linear-gradient(to right, #4bb0ff, #6149f6);
  text-align: center;
}
.mysvgcode {
  background-color: #fff;
}
.mybutton{
width: 100%;
display: flex;
}
.myclickreg {
  top: 150px;
  font-family: cursive;
  font-size: 18px;
 margin: 0 auto;
}
van-field {
  font-family: cursive;
}
.success{
  font-size: 24px;
  color: #6149f6;
}
</style>