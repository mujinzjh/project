<template>
  <div class="info">
    <!-- <h2 class="product-detail">商品详情</h2> -->
    <van-nav-bar title="商品详情">
      <van-icon name="arrow-left" slot="left" @click="goBack" />
    </van-nav-bar>

    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in swiperData" :key="index" id="loop">
        <van-image width="auto" height="257" :src="item" @click="swiperImgClick(index)" />
      </van-swipe-item>
    </van-swipe>
    <div class="group">
      <h2 class="price">
        ￥
        <span class="price-num">{{info.price}}</span>
      </h2>
      <h2 class="title">{{info.name}}</h2>
      <div class="graycolor group-buttom">
        <p>
          快递
          <span>0.00</span>
        </p>
        <p>
          月销量
          <span>190</span>
        </p>
        <p>广东东莞</p>
      </div>
    </div>
    <div class="activit">
      <p class="promotion">
        <span class="graycolor">促销</span>
        <span>购买获得823积分</span>
        <span class="null"></span>
      </p>
      <p class="service">
        <span class="graycolor">服务</span>
        <span>假一赔十 上门取退</span>
        <span class="null"></span>
      </p>
    </div>
    <div class="activit">
      <p class="promotion" @click="selectformat">
        <span class="graycolor">选择</span>
        <span>请选择颜色分类/尺寸</span>
        <span class="null"></span>
        <van-icon name="arrow" />
      </p>
    </div>
    <!-- 选择商品规格 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      :message-config="messageConfig"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
    <div class="list">
      <div class="top">
        <span @click="clickcommodity" :class="commodity ? 'buline' : ''">商品详情</span>
        <span @click="clickmerchant" :class="merchant ? 'buline' : ''">商户资质</span>
        <span @click="clickcomment" :class="comment ? 'buline' : ''">评论</span>
      </div>
      <div v-if="commodity" class="commodity"></div>
      <div v-if="merchant" class="merchant"></div>
      <div v-if="comment" class="comment">
        <p v-for="(item, index) in commentlist" :key="index">{{ item.content }}</p>
        <div class="more">加载更多</div>
      </div>
    </div>
    <!-- <shopping-bar></shopping-bar> -->
    <div class="shoppingbar">
      <van-goods-action>
        <van-goods-action-icon icon="home-o" text="首页" @click="goIndex" />
        <van-goods-action-icon icon="cart-o" text="购物车" :info="num" @click="gotocar" />
        <van-goods-action-button type="warning" text="加入购物车" @click="addshoppingcar" />
        <van-goods-action-button type="danger" text="立即购买" @click="changeInfo" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      num: 0,
      swiperData: [
        // "https://img.yzcdn.cn/vant/cat.jpeg",
        // "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3968785517,792457195&fm=26&gp=0.jpg",
        // "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3667629373,920800616&fm=26&gp=0.jpg",
        // "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1449239201,2422877873&fm=26&gp=0.jpg"
      ],
      info: {},
      page: 0,
      commodity: true,
      merchant: false,
      comment: false,
      commentlist: [],
      // 参数组件是否显示
      showD: false,
      //选择规格组件是否显示
      show: false,

      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: [
              {
                id: "30349", // skuValueId：规格值 id
                name: "蓝色", // skuValueName：规格值名称
                imgUrl:
                  "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=345813760,1790735293&fm=26&gp=0.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl:
                  "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=345813760,1790735293&fm=26&gp=0.jpg" // 用于预览显示的规格类目图片
              },
              {
                id: "1215",
                name: "黄色",
                imgUrl:
                  "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1116983213,2296800055&fm=26&gp=0.jpg",
                previewImgUrl:
                  "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1116983213,2296800055&fm=26&gp=0.jpg"
              }
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: "尺寸", // skuKeyName：规格类目名称
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "1" // skuValueName：规格值名称
              },
              {
                id: "2",
                name: "2"
              }
            ],
            k_s: "s2" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 30349, // skuId，下单时后端需要
            price: 10000, // 价格（单位分）
            s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 1215, // skuId，下单时后端需要
            price: 10000, // 价格（单位分）
            s1: "30349", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "2", // 规格类目 k_s 为 s2 的对应规格值 id
            // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 117 // 当前 sku 组合对应的库存
          }
        ],
        price: "100.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "留言", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "1", // 是否必填 '1' 表示必填
            placeholder: "" // 可选值，占位文本
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture:
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1116983213,2296800055&fm=26&gp=0.jpg"
      },
      goodsId: 0,
      quota: 0,
      quotaUsed: 0,

      messageConfig: {
        // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
        uploadImg: () => {
          return new Promise(resolve => {
            setTimeout(
              () =>
                resolve(
                  "https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg"
                ),
              1000
            );
          });
        },
        // 最大上传体积 (MB)
        uploadMaxSize: 3,
        // placeholder 配置
        placeholderMap: {
          text: "xxx",
          tel: "xxx"
        }
      }
    };
  },
  created() {},
  methods: {
    changeInfo(){
      this.$router.push({path:"/order",query:{gid:this.$route.query.gid}})
    },
    goBack(){
      this.$router.go(-1);
    },
    goIndex() {
      this.$router.push({ path: "/index" });
    },
    gotocar() {
      this.$router.push({ path: "/shoppingcar" });
    },
    //查询shop购物车中的数据条数
    SelectCount() {
      this.axios
        .get("/shop/getcount")
        .then(response => {
          console.log(response);
          this.num = response.data[0].num;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //选择规格点击函数
    addshoppingcar() {
      this.axios
        .post("/add/addgoods", {
          uid: 1, //localStorage.getItem("uid"),
          gid: this.$route.query.gid
        })
        .then(response => {
          console.log(response);
          if (response.data.code == 1) {
            this.num += 1;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectformat: function() {
      this.show = true;
    },
    clickcommodity: function() {
      this.commodity = true;
      this.merchant = false;
      this.comment = false;
    },
    clickmerchant: function() {
      this.commodity = false;
      this.merchant = true;
      this.comment = false;
    },
    clickcomment: function() {
      this.commodity = false;
      this.merchant = false;
      this.comment = true;
    },
    swiperImgClick(index) {
      ImagePreview({
        images: this.swiperData,
        startPosition: index,
        closeOnPopstate: true
      });
    },
    //点击购买回调
    onBuyClicked: function(skuData) {
      console.log(skuData);
    },
    //点击添加购物车回调
    onAddCartClicked: function() {}
  },
  mounted: function() {
    let max = 0;
    let ind = 0;
    let shownum = 2;
    let state = 0;
    document.onscroll = e => {
      if (!this.comment) return;
      let wheight = document.documentElement.clientHeight || window.innerHeight;
      let scrolltop = document.documentElement.scrollTop;
      let offsettop = document.querySelector(".more").offsetTop;
      if (scrolltop > max && wheight + scrolltop >= offsettop) {
        if (scrolltop > max) max = scrolltop;
        // 到服务器请求数据  ajax，显示到页面上  2图片
        if (state) return;
        state = 1;
        this.axios
          .get("/comments/getcomments", {
            params: {
              page: ++this.page
            }
          })
          .then(response => {
            /* console.log(response.data); */
            this.commentlist = this.commentlist.concat(response.data);
            console.log(this.commentlist);

            state = 0;
          })
          .catch(function(error) {
            console.log(error);
          });
        /* for (let i = ind; i < allimg.length; i++) {
                    allimg[i].src = allimg[i].dataset.src;
                    ind++;
                    if (!(ind % shownum)) break;
                } */
      }
    };
  },
  created: function() {
    this.SelectCount();
    /* if (!this.comment) return; */
    this.axios
      .get("/comments/getcomments", {
        params: {
          page: ++this.page
        }
      })
      .then(response => {
        /* console.log(response.data); */
        this.commentlist = this.commentlist.concat(response.data);
        console.log(this.commentlist);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.axios
      .get("/Goods/getgoods", {
        params: {
          gid: this.$route.query.gid
        }
      })
      .then(response => {
        this.info = response.data[0];
        this.swiperData = response.data[0].img.split(",");
        this.sku.tree[0].v.forEach((el, index) => {
          el.imgUrl = response.data[0].img.split(",")[index];
          el.previewImgUrl = response.data[0].img.split(",")[index];
        });
        this.goods.picture = response.data[0].img.split(",")[0];
        this.sku.list.forEach((el, index) => {
          el.price = response.data[0].price * 100;
        });
        this.sku.price = response.data[0].price;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  beforeDestroy: function() {
    document.onscroll = null;
  }
};
</script>

<style scoped>
* {
  margin-block-start: 0em;
  margin-block-end: 0em;
}

#loop {
  height: 257px !important;
}
.product-detail {
  text-align: center;
  line-height: 36px;
}
.van-swipe-item {
  text-align: center;
}
.group {
  background-color: white;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;
  line-height: 32px;
}
.group .group-buttom {
  display: flex;
  justify-content: space-between;
}
.graycolor {
  color: #999999;
}
.activit {
  margin-top: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: left;
  background-color: white;
  line-height: 30px;
}
.activit > .promotion,
.activit > .service {
  display: flex;
  justify-content: space-between;
}
.null {
  flex-grow: 1;
}
.activit .promotion span:nth-child(2) {
  margin-left: 15px;
}
.title {
  text-align: left;
  font-size: 14px;
  color: #051b28;
}
.price {
  text-align: left;
  color: #ff0036;
}
.price .price-num {
  font-size: 24px;
}
.list .top {
  line-height: 30px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
}
.list .top span {
  width: 56px;
  text-align: center;
}
.commodity {
  height: 300px;
  background-color: red;
}
.merchant {
  height: 300px;
  background-color: blue;
}
.comment {
  font-size: 16px;
  background-color: yellow;
}

.buline {
  color: red;
  border-bottom: 2px solid red;
}
</style>