<template>
  <div class="order">
    <Affix>
    <van-nav-bar title="结算">
      <van-icon name="arrow-left" slot="left" @click="goBack" />
    </van-nav-bar>
    </Affix>
    <div class="address">
      <span style="font-size:0.5rem">收货地址</span>
      <span style="width:100%;" @click="addressPage" class="addLan">
        <p class="pOne">
          <span>{{address.name}}</span>
          <span>{{address.tel}}</span>
        </p>
        <p>{{address.address}}</p>
      </span>
    </div>
    <div>
      <van-card
        v-for="(item,index) in info"
        :key="index"
        :num="item.shopnum"
        :price="item.price"
        desc="描述信息"
        :title="item.name"
        :thumb="item.img"
        style="background-color:#fff"
      />
      <div class="total">
        <span>共{{totalNum}}件商品</span>
        <span>合计￥{{sum}}元</span>
      </div>

      <div class="total">
        <span>支付方式</span>
        <span>微信支付</span>
      </div>

      <div class="meg">
        <span>给卖家留言</span>
        <textarea name id cols="30" rows="3" class="text"></textarea>
      </div>
      <van-submit-bar :price="sum*100" button-text="结算" is-link @submit="onSubmit" />
      <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
        <van-password-input
          :value="value"
          info="密码为 6 位数字"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />

        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="show"
          theme="custom"
          extra-key="."
          close-button-text="完成"
          @blur="show = false"
          @input="onInput"
          @delete="onDelete"
          @close="onClose"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: [],
      img: "",
      address: {},
      value: "",
      show: false,
      showKeyboard: true
    };
  },
  computed: {
    totalNum: function() {
      let Num = 0;
      this.info.forEach(el => {
        Num += el.shopnum;
      });
      return Num;
    },
    sum: function(params) {
      let sum = 0;
      this.info.forEach(el => {
        sum += el.price * el.shopnum;
      });
      return sum;
    }
  },
  methods: {
    onClose() {
      console.log(1);
      this.confirmPay();
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    goBack() {
      this.$router.go(-1);
    },
    getAddress() {
      this.axios
        .get("/Address/getAddById", {
          params: {
            aid: this.$route.query.aid
          }
        })
        .then(response => {
          console.log(response);
          var data = response.data[0];
          if (response.data.length === 0) {
            this.address = {
              name: "暂无数据",
              address: "暂无数据",
              tel: ""
            };
          } else {
            this.address = {
              name: data.name,
              address: data.address,
              tel: data.tel
            };
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    goodsByGid() {
      this.axios
        .post("/Goods/goodsByGid", {
          gid: this.$route.query.gid
        })
        .then(response => {
          console.log(response);
          response.data[0].shopnum = 1;
          this.info = response.data;

          response.data.forEach(el => {
            el.img = el.img.split(",")[0];
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    confirmPay() {
      this.axios
        .post("/shop/updateStatus", {
          sid: JSON.parse(localStorage.getItem("sid"))
        })
        .then(response => {
          console.log(response);
          if (response.data.code == 1) {
            this.$router.push({ path: "/mine", query: { active: 2 } });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addressPage() {
      this.$router.push({ path: "/addressList" });
    },
    onSubmit() {
      this.show = true;
    }
  },
  created() {
    if (this.$route.query.gid) {
      this.goodsByGid();
    } else {
      this.axios
        .get("./shop/getAll")
        .then(response => {
          this.info = response.data;
          localStorage.setItem("sid", JSON.stringify(response.data));
          var ssid = JSON.parse(localStorage.getItem("sid"));
          response.data.forEach(el => {
            el.img = el.img.split(",")[0];
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
    this.getAddress();
  }
};
</script>

<style scoped>
.order{
  min-height: 809px;
}
.address {
  width: 100%;
  background-color: #fff;
  margin-top: 2%;
  margin-bottom: 2%;
  /* height: 50px; */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
}
.total {
  margin-top: 1%;
  width: 100%;
  background-color: #fff;
  height: 50px;
  display: flex;
  justify-content: space-between;
  font-size: 0.4rem;
  line-height: 50px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
}
.meg {
  margin-top: 1%;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  font-size: 0.4rem;
  line-height: 50px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;
  margin-bottom: 13%;
}
.meg > textarea {
  border: 0;
  border: 1px solid #e3e3e3;
}
.addLan {
  display: inline-block;
  font-size: 0.3rem;
}
</style>