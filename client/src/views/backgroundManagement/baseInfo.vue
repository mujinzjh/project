<template>
  <div>
    <Breadcrumb>
      <Breadcrumb-item href="/" style="padding-left: 20px">基本信息</Breadcrumb-item>
    </Breadcrumb>
    <div class="content-item">
      <Row>
        <i-col span="12">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <p>用户基本信息</p>
            </div>

            <div class="text item test">
              <span>欢迎回来 {{username}}</span>
            </div>

            <div class="text item test">
              <span>此次登录时间：{{date}}</span>
            </div>
            <div class="text item test"></div>
          </el-card>
        </i-col>
        <i-col span="12">
          <my-calendar></my-calendar>
        </i-col>
      </Row>
    </div>
    <div class="shopGood-show">
      <h2>商品信息展示</h2>
      <span @click="myExpend"><Icon :type="!isExpend?'ios-arrow-down':'ios-arrow-up'" /><span v-text="!isExpend?'展开':'收缩'"></span></span>
    </div>

<div v-show="isExpend">
  <my-chat></my-chat>
</div>

  </div>
</template>
<script>
export default {
  data() {
    var username = localStorage.getItem("userInfo");
    return {
      date: "",
      username: username,
      src: "",
      isExpend:false
    };
  },
  created() {},
  mounted() {
    this.getDate();
  },
  methods: {
    myExpend(){
      this.isExpend=!this.isExpend;
    },
    getDate: function() {
      var that = this,
        date = localStorage.getItem("loginTime");
      console.log(date);
      that.date = that.formatDate(date);
    },
    formatDate: function(rawDate) {
      let date = new Date(rawDate);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    }
  }
};
</script>
<style scoped>
/* .content-item{
  height: 300px;
} */
* {
  padding: 0;
  margin: 0;
}
/* .content-item {
  width: 270px;
  height: 300px;
  float: right;
} */
.test {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.test > img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix {
  text-align: left;
  font-size: 18px;
  font-weight: bolder;
}
.box-card {
  height: 425px;
  background: radial-gradient(circle, pink, skyblue);
}
.shopGood-show{
  margin-top: 10px;
  padding-left: 20px;
  border-bottom: 1px solid #51A1a1;
  display: flex;
  justify-content:space-between;
  align-items: center;
}
</style>