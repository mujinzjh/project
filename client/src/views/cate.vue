<template>
  <div class="app">
    <h1 style="text-align:center;">商品列表</h1>
    <Affix>
      <Index-search></Index-search>
    </Affix>
    <van-tabs @click="clickType" v-model="cid">
      <van-tab v-for="(el,index) in cateInfo" :title="el.catename" :key="index" :name="el.cid">
        <ul class="myul">
          <li class="myli" v-for="(els,ind) in listInfo" :key="ind" @click="goGoods(els.gid)">
            <div class="left">
              <img :src="els.img" style="width:100px;height:100px;" />
            </div>
            <div class="right">
              <span class="right-name-show" :title="els.name">{{els.name}}</span>
              <span style="color:red;">￥{{els.price}}</span>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>

    <top-Bar></top-Bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateInfo: [],
      cid: 1,
      listInfo: [],
      img: ""
    };
  },

  methods: {
    clickType(name) {
      this.cid = name;
      this.getGoods();
    },
    goGoods(gid) {
      this.$router.push({ path: "/info", query: { gid: gid } });
    },
    getCate: function() {
      this.axios
        .get("/Cate")
        .then(response => {
          console.log(response);
          this.cateInfo = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getGoods() {
      this.axios
        .post("/Goods/getGoosInfoByCid", {
          cid: this.cid
        })
        .then(response => {
          console.log(response);
          response.data.forEach(el => {
            el.img = el.img.split(",")[0];
          });
          this.listInfo = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getCate();
    this.getGoods();
    this.clickType(this.$route.query.cid);
    // console.log(this.$route.query.cid);
    // this.cid = this.$route.query.cid;

    // console.log(this.cid);
  }
};
</script>

<style scoped>
/* .app{
    width: 550px;
    height: 400px;
    background-color: aqua;
} */

.myul {
  width: 100%;
  /* background-color: aquamarine; */
}
.myli {
  width: 100%;
  font-size: 0.5rem;
  margin-top: 2%;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  box-shadow: 1px 1px 5px #888;
  /* justify-content: space-around; */
}
.myli:nth-child(1){
  margin-top:2%;
}
.myli:last-child{
  margin-bottom: 50px;
}
.left {
  display: flex;
  align-items: center;
}
.right {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding-left: 5%;
}
.right-name-show {
  display: inline-block;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
</style>