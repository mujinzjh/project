<template>
  <div class="name-edit">
    <Affix>
      <van-nav-bar title="密码修改" left-arrow>
        <van-icon name="arrow-left" slot="left" @click="goBack" />
      </van-nav-bar>
    </Affix>
    <div class="update-name">
      <van-form @submit="onSubmit" :scroll-to-error="true">
        <van-field
          v-model="oldpwd"
          name="oldpwd"
          label="请输入旧的密码"
          label-width="150px"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写正确的用户名',validator:validator }]"
        />
        <van-field
          v-model="newpwd"
          label-width="150px"
          name="newpwd"
          label="请输入新的密码"
          placeholder="请输入新的密码"
          trigger
          :rules="[{ required: true, message: '请填写新的用户名',validator:validator1}]"
        />
        <van-field
          v-model="confirmnewpwd"
          label-width="150px"
          name="newname"
          label="请验证新的密码"
          placeholder="请验证新的密码"
          trigger
          :rules="[{ required: true, message: '请验证新的用户名',validator:validator2 }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认修改</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Form } from "vant";
export default {
  data() {
    return {
      oldpwd:'',
      newpwd:'',
      confirmnewpwd:'',
      yztemp:'',
      userInfo:{}
    };
  },
  created() {
    this.userInfo = JSON.parse(this.$route.query.userInfo);
  },
  methods: {
    validator(val, rule) {
      var oldpwd = this.userInfo.password;
      if (val === oldpwd) {
        return true;
      } else {
        rule.message = "请输入正确的旧的密码";
        return false;
      }
    },
    validator1(val, rule) {
      var newpwd = this.userInfo.password;
      this.yztemp=val;
      if (val === newpwd) {
        rule.message = "请输入6-16位的字母或数字作为你的密码";
        return false;
      } else {
        var str = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,16}$/,
          b = str.test(val);
        if (b) {
          return b;
        } else {
          rule.message = "请输入6-16位的英文和数字作为密码";
          return b;
        }
      }
    },
    validator2(val,rule){
      var temp=this.yztemp;
      if(val===temp){
        return true;
      }else{
        rule.message='两次密码输入不一致，请重新输入';
        return false;
      }
    },
    goBack() {
      this.$router.back(-1);
    },
    onSubmit(values) {
      var uid = this.userInfo.uid;
      this.axios
        .post("/Login/passwordedit", {
          values: values,
          uid: uid
        })
        .then(res => {
          if (res.status === 200) {
            if (res && res.data && res.data.code === 1) {
              this.$router.push({ path: "/"});
              this.$toast.success("修改成功");
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.name-edit {
  min-height: 809px;
  background-color: #fff;
}
</style>