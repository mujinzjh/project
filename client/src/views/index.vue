<template>
  <div class="app">
    <div>
       <h1 style="text-align:center">童之年商城</h1>
      <Affix>
      <Index-search></Index-search>
    </Affix>
  

      <Swiper></Swiper>

      <div class="cate">
        <ul class="myul">
          <li v-for="(infos,index) in info" :key="index" class="myli" @click="sendID(infos.cid)">
            <img :src="infos.imgs" class="cateimgs" />
            {{infos.catename}}
          </li>
        </ul>
      </div>
      <!-- <shopping-bar></shopping-bar> -->

      <!-- 推荐商品 -->

      <div class="recommend">
        <h2 style="text-align:center">--爆款推荐--</h2>

        <!-- 推荐的 -->
        <ul class="remUl">
          <img src="../../public/img/timg (9).jpg" />
          <div style="width:65%;height:300px;">
            <li v-for="(goodsmeg,index) in goodinfo" :key="index" class="remli" @click="goTO(goodsmeg.gid)">
              <div style class="remIn">
                <span style="text-align:center">{{goodsmeg.name}}</span>
                <span style="color:red;">￥{{goodsmeg.price}}</span>
              </div>

              <div style="width:50%">
                <img :src="goodsmeg.img" alt width="100px" height="80px" />
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>

    <!-- 喜欢 -->
    <!-- <h2>--爆款推荐--</h2> -->
    <h2 class="liketitle" style="text-align:center">猜你喜欢</h2>
    <div class="likeGood">
      <ul class="likeGoodUl">
        <li v-for="(el,index) in LikeGoodsInfo" :key="index" class="likeGoodLi" @click="goTO(el.gid)">
          <img :src="el.img" alt class="liImg" />
          <div>{{el.name}}</div>
          <div class="GoodPrice">
            <span style="color:red">￥{{el.price}}</span>
            <span style="color:gray;font-size:0.3rem;line-height:250%">库存{{el.num}}件</span>
          </div>
        </li>
      </ul>
    </div>

    <top-Bar></top-Bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: [],
      goodinfo: [],
      LikeGoodsInfo: [],
      img:''
    };
  },
  methods: {
    goTO(gid){
      console.log(gid)
      this.$router.push({path:"/Info",query:{gid:gid}})
    },
    sendID(cid) {
      // console.log(cid);
      this.$router.push({ path: "/cate" ,query:{cid:cid}});
    },

    getRem: function() {
      this.axios
        .get("/Goods")
        .then(response => {
          console.log(response);
          this.goodinfo = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    getLikeGoods: function() {
      this.axios
        .get("/Goods/getInfo")
        .then(response => {
          response.data.forEach((el)=>{
            el.img=el.img.split(",")[0]
          })
          this.LikeGoodsInfo = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
  
    this.getRem();
    this.getLikeGoods();
    this.axios
      .get("/Cate")
      .then(response => {
        console.log(response);
        this.info = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style >
h1 {
  font-size: 0.5rem;
}
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
.cate {
  width: 90%;

  height: 250px;
  position: absolute;

  left: 5%;
  top: 341px;
  background-color: #fff;
  box-shadow: 1px 1px 5px #888888;
}
.myul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.myli {
  width: 25%;
  height: 48%;
  font-size: 0.35rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.cateimgs {
  /* width: 80%; */
  height: 67%;
}
/* h2{
  margin-top: 200px;
} */
.recommend {
  width: 100%;
  /* height: 300px; */
  background-color: #fff;
  /* height: 50px; */
  margin-top: 250px;
  margin-bottom: 2rem;
}
.remUl {
  width: 100%;
  display: flex;

  box-sizing: border-box;
  padding: 5%;
}
.remUl > img {
  width: 35%;
  height: 305px;
}
.remli {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  font-size: 0.5rem;
  margin-bottom: 1%;
  /* background-color: aquamarine; */
  border-bottom: 1px dashed #888888;
  height: 33%;
  display: flex;
  justify-content: space-between;
}
.remIn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

</style>