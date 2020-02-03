<template>
  <div>
      <div class="mydiv">

      </div>
    <van-field
      v-model="phone"
      clearable
      label="手机号"
      placeholder="请输入手机号"
      @blur="testmyphone"
    />

      <van-field
      v-model="sms"
      center
      clearable
      label="短信验证码"
      placeholder="请输入短信验证码"
      @blur="testmysms"
    >
      <van-button slot="button" size="small" type="primary" @click="sendsms">发送验证码</van-button>
    </van-field>
     <div class="myohterlogin">
 <van-button slot="button" size="small" type="primary" @click="gouser">点击用户名登录</van-button>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      sms:''
     
    };
  },
  methods: {
  
    testmyphone() {
      //  console.log(event)
      // 在这里验证手机号
      console.log(this.username);
      var reg=/^1[34578]\d{9}$/
       var re=new RegExp(reg);
       if(re.test(this.username)){
           console.log('正确')
       }else{
           console.log('用户名有误')
       }
    },
  
    testmypasswd() {
        // 要求：可以包含数字、字母、下划线，并且要同时含有数字和字母，且长度要在8-16位之间。
        var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,16}$/
       var re=new RegExp(reg);
       if(re.test(this.password)){
           console.log('正确')
       }else{
           console.log('密码有误')
       }
    },
    testmysms(){},
    sendsms(){},
    gouser(){
          this.$router.push('loginuser')
    }
 
  
  },

  created() {}
};
</script>

<style scoped>
.mydiv{
    width: 100%;
    height: 200px;
    background-color: red;
}
.myohterlogin{
  width: 100%;
  height: 100px;
  background-color: red;
  line-height: 100px;
}
</style>