<template>
  <div class="shoppingcar">
    <van-nav-bar title="购物车" left-arrow>
      <van-icon name="arrow-left" slot="left" @click="goBack" />
    </van-nav-bar>

    <!-- 加入购物车的商品展示 -->
    <van-card
      v-for="(el,index) in info"
      :num="el.shopnum"
      :key="index"
      :price="el.price"
      desc="描述信息"
      :title="el.name"
      :thumb="img"
    >
      <div slot="tags">
        <van-tag plain type="danger">标签</van-tag>
        <van-tag plain type="danger">标签</van-tag>
      </div>
      <div slot="footer">
        <van-button
          size="mini"
          @click="pause(index)"
          class="pause"
          :disabled="handleing?true:false"
        >-</van-button>
        <van-button size="mini" @click="add(index)">+</van-button>
        <van-button size="mini" @click="deleteShopGoods(el.sid)">删除</van-button>
      </div>
    </van-card>

    <van-submit-bar :price="sum*100" button-text="提交订单" @submit="onSubmit" class="subFooter">
      <!-- <van-checkbox v-model="checked">全选</van-checkbox> -->
      <span slot="tip">
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </span>
    </van-submit-bar>
    <top-Bar></top-Bar>
  </div>
</template>

<script>
import { SubmitBar } from "vant";
export default {
  data() {
    return {
      checked: false,
      info: [],
      img: "",
      handleing: false
    };
  },
  computed: {
    sum: function() {
      let sum = 0;
      this.info.forEach(el => {
        sum += el.price * el.shopnum;
      });
      return sum;
    }
  },
  methods: {
    pause(index) {
      this.info[index].shopnum -= 1;
      if (this.info[index].shopnum <= 1) {
        this.info[index].shopnum=1
        
      }
      this.axios
        .post("/shop/alertshopGoods", {
          sid: this.info[index].sid,
          shopnum: this.info[index].shopnum
        })
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    add(index) {
      this.info[index].shopnum += 1;
      this.axios
        .post("/shop/alertshopGoods", {
          sid: this.info[index].sid,
          shopnum: this.info[index].shopnum
        })
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteShopGoods(sid) {
      console.log(sid);
      this.axios
        .post("/shop/deleteshopGoods", {
          sid: sid
        })
        .then(response => {
          console.log(response);
          if ((response.data.code = 1)) {
            let ind = this.info.findIndex(function(el) {
              return sid == el.sid;
            });
            this.info.splice(ind, 1);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    shopGoods() {
      this.axios
        .post("/shop/shopGoods")
        .then(response => {
          // console.log(response);
          // console.log(response.data);
          this.info = response.data;
          response.data.forEach(el => {
            this.img = el.img.split(",")[0];

            this.sum += el.price;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      this.$router.push({ path: "/order" });
    }
  },
  created() {
    this.shopGoods();
    this.deleteShopGoods();
  },
  mounted() {
    if (this.info) {
    }
  }
};
</script>
<style scoped>
.van-submit-bar__bar {
  padding-left: 10px;
  box-sizing: border-box;
}
.subFooter {
  margin-bottom: 12%;
}
</style>