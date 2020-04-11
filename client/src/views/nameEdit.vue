<template>
  <div class="name-edit">
    <Affix>
      <van-nav-bar title="用户名修改" left-arrow>
        <van-icon name="arrow-left" slot="left" @click="goBack" />
      </van-nav-bar>
    </Affix>
    <div class="update-name">
      <van-form @submit="onSubmit" :scroll-to-error="true">
        <van-field
          v-model="oldname"
          name="oldname"
          label="请输入旧的用户名"
          label-width="150px"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名或输入正确的用户名',validator:validator }]"
        />
        <van-field
          v-model="newname"
          label-width="150px"
          name="newname"
          label="输入新的用户名"
          placeholder="新的用户名"
          trigger
          :rules="[{ required: true, message: '请填写正确的新的用户名',validator:validator1}]"
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
      username: "",
      password: "",
      oldname: "",
      newname: "",
      yznewname: "",
      userInfo: {}
    };
  },
  created() {
    this.userInfo = JSON.parse(this.$route.query.userInfo);
  },
  methods: {
    validator(val, rule) {
      var oldname = this.userInfo.username;
      if (val === oldname) {
        return true;
      } else {
        rule.message = "请输入正确的旧的用户名";
        return false;
      }
    },
    validator1(val, rule) {
      var newname = this.userInfo.username;
      if (val === newname) {
        rule.message = "请输入6-16位的英文或数字作为你的用户名";
        return false;
      } else {
        var str = /^[a-z0-9_-]{6,16}$/,
          b = str.test(val);
        if (b) {
          return b;
        } else {
          rule.message = "请输入6-16位的英文或数字作为你的用户名";
          return b;
        }
      }
    },
    goBack() {
      var uid = localStorage.getItem("uid");
      this.$router.push({ path: "/setting", query: { uid: uid } });
    },
    onSubmit(values) {
      var uid=this.userInfo.uid;
      this.axios
        .post("/Login/nameedit", {
          values: values,
          uid:uid
        })
        .then(res => {
          if (res.status === 200) {
            if (res && res.data&&res.data.code===1) {
              this.$router.push({path:'/'});
              this.$toast.success('修改成功')
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