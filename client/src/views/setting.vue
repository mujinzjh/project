<template>
  <div class="setting-content">
    <Affix>
      <van-nav-bar title="设置" left-arrow>
        <van-icon name="arrow-left" slot="left" @click="goBack" />
      </van-nav-bar>
    </Affix>
    <div class="main-content">
        <div class="user-info">
            <img :src="userInfo.avator" alt="" style="width:50px;height:50px" class="user-avator">
            <span style="margin-right:50px">{{userInfo.username}}</span>
            <span style="font-size: 18px;color: orange">编辑</span>
        </div>
      <div class="seting-info">
        <van-cell title="账户信息" is-link  />
        <van-cell title="关于易购商城" is-link />
        <!-- <van-cell title="账号" is-link :value="userInfo.username" />
        <van-cell title="密码" is-link value="修改密码" />
        <van-cell title="电话" is-link :value="userInfo.phone" />-->
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" class="sign-button">切换账号</van-button>
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" class="sign-button" @click="signOut">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid: this.$route.query.uid,
      userInfo: {}
    };
  },
  mounted() {
    this.nowUser();
  },
  methods: {
    signOut(){
        localStorage.clear();
        this.$router.push({path:'/'})
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
              console.log(res, res.data);
              this.userInfo = res.data;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.push({ path: "/mine" });
    }
  }
};
</script>

<style scoped>
.setting-content {
  min-height: 809px;
  /* min-width: 100%; */
  background-color: #fff;
}
.main-content{
    padding: 0 10px;
}
.user-info{
    padding: 0 4px;
    display: flex;
    align-items: center;
}
.user-avator{
    border-radius: 50%;
    margin-right: 200px;
}
.sign-button{
    min-width: 98%;
    /* margin-top: 4%; */
}
</style>