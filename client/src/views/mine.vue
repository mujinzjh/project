<template>
  <div>
    <div class="info">
      <!-- <van-uploader v-model="fileList" multiple :max-count="1" :after-read="afterRead" /> -->
      <div class="avtor">
        <img :src="avtor" alt />
      </div>
      <van-uploader :after-read="afterRead">
        <van-icon name="arrow" size="1.0rem" color="#fff" />
      </van-uploader>
    </div>

    <van-tabs v-model="active">
      <van-tab title="全部订单">
      
      </van-tab>
      <van-tab title="待付款">
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
            <van-button size="mini" @click="changeOrder">去付款</van-button>
            <van-button size="mini" @click="deleteShopGoods(el.sid)">取消订单</van-button>
          </div>
        </van-card>
      </van-tab>
      <van-tab title="待收货">
        <van-card
          v-for="(el,index) in infos"
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
            <van-button size="mini" @click="deleteShopGoods(el.sid)">确认收货</van-button>
          </div>
        </van-card>
      </van-tab>
      <van-tab title="评价">内容 4</van-tab>
    </van-tabs>
    <top-Bar></top-Bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      avtor:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572091337901&di=adb9ce0b2acdccad2e9a474c917fb6bb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658",
      info: [],
      infos: []
      // avtor: ""
    };
  },
  methods: {
    waitGet() {
      this.axios
        .get("/shop/selectWaitGet")
        .then((response) => {
          console.log(response)
          this.infos=response.data;
          response.data.forEach(el=>{
            this.img=el.img.split(',')[0];
          })
        })
        .catch(err => {
          console.log(err);
        });
    },

    changeOrder() {
      this.$router.push({ path: "/order" });
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
    afterRead(file) {
      console.log(file);
      console.log(file.file);
      this.uploadImg(file.file);
    },
    //上传到服务器端
    beforeRead(file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Toast("请上传 jpg/png 格式图片");
        return false;
      }
      let isLt1M = file.size / 1024 / 1024 <= 1;
      if (!isLt1M) {
        Toast("图片大小1M以内");
        return false;
      }
      return true;
    },
    uploadImg(file) {
      let formData = new FormData();
      formData.append("file", file, file.name);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.axios
        .post("/upload", formData, config)
        .then(response => {
          console.log(response);
          console.log(response.data.data.src);
          var aa = response.data.data.src;
          console.log(aa);
          localStorage.setItem("avtor", aa);

          this.avtor = localStorage.getItem("avtor");
          console.log(this.avtor);
          this.ImGInsert();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    ImGInsert() {
      this.axios
        .post("/Reg/regAvator", {
          username: sessionStorage.getItem("username"),
          avator: this.avtor
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    if (localStorage.getItem("avtor")) {
      this.avtor = localStorage.getItem("avtor");
    } else {
      this.avtor =
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572091337901&di=adb9ce0b2acdccad2e9a474c917fb6bb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658";
    }

    console.log(this.$route.query.active);
    if (this.$route.query.active) {
      this.active = this.$route.query.active;
    }
    this.waitGet();
    this.shopGoods();
  }
};
</script>

<style scoped>
.avtor {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
}
.avtor > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2%;
  margin-top: 1%;
}
</style>