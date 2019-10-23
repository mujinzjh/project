<template>
  <div class="app">
    <h1>商品列表</h1>
    <search></search>
    <van-tabs @click="clickType">
      <van-tab v-for="(el,index) in cateInfo" :title="el.catename" :key="index" :name="el.cid">
       <ul class="myul">
          <li class="myli" v-for="(els,ind) in listInfo" :key="ind">
            <div style="display:inline-block;">
              <img :src="els.img" style="width:100px;height:100px;"/>
            </div>
            <div style="display:inline-block;">
              <span>{{els.name}}</span>
              <span>{{els.price}}</span>
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
      listInfo: []
    };
  },
  methods: {
    clickType(name) {
      this.cid = name;
      console.log(this.cid);
      this.getGoods();
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
        .then((response)=> {
          console.log(response);
          this.listInfo = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getCate();
    console.log(this.cid);
    this.getGoods();
  }
};
</script>

<style scoped>
/* .app{
    width: 550px;
    height: 400px;
    background-color: aqua;
} */
.myul{
    width: 100%;
    /* background-color: aquamarine; */
}
.myli{
    width: 100%;
    font-size: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>