<template>
  <div class="count-info-content">
    <Affix>
      <van-nav-bar title="账号信息" left-arrow>
        <van-icon name="arrow-left" slot="left" @click="goBack" />
      </van-nav-bar>
    </Affix>
    <div class="count-main">
      <van-cell title="用户名" :value="userInfo.username" />
      <van-cell title="密码" is-link value="修改密码" @click="toUpdatePassword"/>
      <van-cell title="当前电话"  :value="userInfo.phone" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      uid: localStorage.getItem("uid")
    };
  },

  mounted () {
    this.nowUser();  
  },
  methods: {
    toUpdatePassword(event){
        var userInfo = JSON.stringify(this.userInfo);
         this.$router.push({ path: "/passwordEdit", query: { userInfo: userInfo } });
    },
    nowUser() {
      this.axios
        .get("/Login/getUserInfo", {
          params: {
            uid: this.uid
          }
        })
        .then(res => {
          if (res.status === 200) {
            if (res && res.data) {
              this.userInfo = res.data;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped>
.count-info-content {
  min-height: 809px;
  background-color: #fff;
}
.van-cell__value{
color: black;
}
</style>