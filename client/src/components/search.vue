<template>
  <div class="search">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @input="changeValue"
      @click="changePage"
    >
      <div slot="action" @click="onSearch">搜索</div>
      <div slot="left-icon" @click="onSearch">
        <van-icon name="arrow-left" @click="forWard" />
      </div>
    </van-search>

    <ul class="likeGoodUl">
      <li v-for="(el,index) in goodsList" :key="index" class="likeGoodLi" @click="change(el.gid)">
        <img :src="el.img" alt class="liImg" />
        <div>{{el.name}}</div>
        <div class="GoodPrice">
          <span style="color:red;text-align:left">￥{{el.price}}</span>
          <span style="color:gray;font-size:0.3rem;line-height:250%">{{el.num}}人已付款</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  data() {
    return {
      value: "",
      goodsList: []
    };
  },

  methods: {
    change(gid){
      this.$router.push({path:"/info",query:{gid:gid}})
    },
    forWard(e) {
      console.log(e);
      this.$router.go(-1);
    },
    changePage(e) {
      console.log(e);
      this.$router.push({ path: "/SearchPage" });
    },
    changeValue(value) {
      this.value = value;
    },
    onSearch() {
      this.axios
        .get("/Goods/Search", {
          params: {
            value: this.value
          }
        })
        .then(response => {
          console.log(response);
          if (response.data.length == 0) {
           this.$toast('暂无数据');
          }
          this.goodsList = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.GoodPrice {
  display: flex;
  justify-content: space-between;
}
.liImg {
  width: 100%;
  height: 80%;
}
.likeGoodLi {
  width: 48%;
  min-height: 360px;
  max-height: 400px;
  background-color: #fff;
  margin-bottom: 2%;
  font-size: 0.5rem;
}
.likeGoodUl {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.liketitle {
  margin-bottom: 2rem;
  margin-top: -1.5rem;
}
.likeGood {
  margin-bottom: 2rem;
  margin-top: -1.8rem;
  width: 100%;
  background-color: #f6f6f6;
}
</style>