<template>
  <div>
    <div class="info">
      <!-- <van-uploader v-model="fileList" multiple :max-count="1" :after-read="afterRead" /> -->
      <div class="avtor">
        <img :src="avtor" alt />
      </div>
      <div style=" display: flex;align-items: center">
        <van-uploader :after-read="afterRead" class="upload-avtor">
          <van-icon name="add-o" size="1.0rem" />
          <p>上传头像</p>
        </van-uploader>
        <div style="position: relative;right: 25px;">
          <van-icon name="setting-o" size='40px' @click='onclickSetting'/>
        </div>
      </div>
    </div>
    <van-tabs v-model="active" @click="onClick" sticky swipeable animated  >
      <van-tab title="全部订单">
        <div v-if="allOrder.length!==undefined&&allOrder.length>0">
          <van-card
            v-for="(el,index) in allOrder"
            :num="el.shopnum"
            :key="index"
            :price="el.price"
            desc="描述信息"
            :title="el.name"
            :thumb="el.img"
            class="order"
          >
            <div slot="tags">
              <van-tag plain type="danger">标签</van-tag>
              <van-tag plain type="danger">标签</van-tag>
            </div>
            <div slot="footer" v-if="el.status===0">
              <van-button size="mini" @click="active=1">去付款</van-button>
            </div>
            <div slot="footer" v-else-if="el.status===1">
              <van-button size="mini" @click="active=2">去收货</van-button>
            </div>
            <div slot="footer" v-else-if="el.status===2">
              <van-button size="mini" @click="goComment">去评论</van-button>
            </div>
            <div slot="footer" v-else>
              <van-button size="mini" @click="show=true">售后</van-button>
              <van-action-sheet
                v-model="show"
                :actions="actions"
                :lock-scroll="false"
                cancel-text="取消"
                @cancel="onCancel"
                style="margin-bottom:50px"
              />
              
            </div>
          </van-card>
        </div>
        <div
          v-else
          style="height:620px;display:flex; align-items: center;justify-content: center;flex-direction: column;"
        >
          <van-icon name="bar-chart-o" class="my-icon" />
          <p style="font-size:16px;color:#d1d1d1;">暂无数据</p>
        </div>
      </van-tab>
      <van-tab title="待付款">
        <div v-if="info.length!==undefined&&info.length>0">
          <van-card
            v-for="(el,index) in info"
            :num="el.shopnum"
            :key="index"
            :price="el.price"
            desc="描述信息"
            :title="el.name"
            :thumb="el.img"
            class="order"
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
        </div>
        <div
          v-else
          style="height:620px;display:flex; align-items: center;justify-content: center;flex-direction: column;"
        >
          <van-icon name="bar-chart-o" class="my-icon" />
          <p style="font-size:16px;color:#d1d1d1;">暂无数据</p>
        </div>
      </van-tab>
      <van-tab title="待收货">
        <div v-if="infos.length!==undefined&&infos.length>0">
          <van-card
            v-for="(el,index) in infos"
            :num="el.shopnum"
            :key="index"
            :price="el.price"
            desc="描述信息"
            :title="el.name"
            :thumb="el.img"
            class="order"
          >
            <div slot="tags">
              <van-tag plain type="danger">标签</van-tag>
              <van-tag plain type="danger">标签</van-tag>
            </div>
            <div slot="footer">
              <van-button size="mini" @click="changeToComment(el.sid,index)">确认收货</van-button>
            </div>
          </van-card>
        </div>
        <div
          v-else
          style="height:620px;display:flex; align-items: center;justify-content: center;flex-direction: column;"
        >
          <van-icon name="bar-chart-o" class="my-icon" />
          <p style="font-size:16px;color:#d1d1d1;">暂无数据</p>
        </div>
      </van-tab>
      <van-tab title="评价">
        <div v-if="commentList.length!==undefined&&commentList.length>0">
          <van-card
            v-for="(el,index) in commentList"
            :num="el.shopnum"
            :key="index"
            :price="el.price"
            desc="描述信息"
            :title="el.name"
            :thumb="el.img"
            class="order"
          >
            <div slot="tags">
              <van-tag plain type="danger">标签</van-tag>
              <van-tag plain type="danger">标签</van-tag>
            </div>
            <div slot="footer">
              <van-button size="mini" @click="goToComment(el.sid,el.gid,index)">评论</van-button>
            </div>
          </van-card>
        </div>
        <div
          v-else
          style="height:620px;display:flex; align-items: center;justify-content: center;flex-direction: column;"
        >
          <van-icon name="bar-chart-o" class="my-icon" />
          <p style="font-size:16px;color:#d1d1d1;">暂无数据</p>
        </div>
      </van-tab>
    </van-tabs>

    <top-Bar></top-Bar>

    <!-- 评论弹框 -->
    <van-popup
      v-model="showComment"
      position="bottom"
      :style="{ height: '75%' }"
      :close-on-click-overlay="false"
      :overlay="isoverlay"
    >
      <van-nav-bar
        title="标题"
        left-text="返回"
        right-text="发布"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />

      <van-card
        :num="commentListContent.shopnum"
        :price="commentListContent.price"
        desc="描述信息"
        :title="commentListContent.name"
        :thumb="commentListContent.img"
      >
        <div slot="tags">
          <van-tag plain type="danger">标签</van-tag>
          <van-tag plain type="danger">标签</van-tag>
        </div>
        <!-- <div slot="footer">
      
        </div>-->
      </van-card>
      <div class="desc-c">
        <span>描述相符:</span>
        <van-rate v-model="value" @change="onRateChange" />
        <span class="rate-desc">{{rateValue}}</span>
      </div>
      <div class="text-c">
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="评价"
          type="textarea"
          maxlength="200"
          placeholder="请输入留言"
          show-word-limit
        />
      </div>
      <div class="desc-c">
        <span>快递服务:</span>
        <van-rate v-model="value1" @change="onKdChange" />
        <span class="rate-desc">{{kdRate}}</span>
      </div>
      <div class="desc-c">
        <span>服务态度:</span>
        <van-rate v-model="value2" @change="onServeChange" />
        <span class="rate-desc">{{serveRate}}</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  inject: ["reload"],
  data() {
    return {
      actions: [{ name: "售后电话" }, { name: "010-8564" }],
      show: false,
      allOrder: [],
      isoverlay: true,
      value: 5,
      value1: 0,
      value2: 0,
      active: 0,
      avtor:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572091337901&di=adb9ce0b2acdccad2e9a474c917fb6bb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658",
      info: [],
      infos: [],
      commentList: [],
      showComment: false,
      commentListContent: {},
      rateValue: "非常好",
      kdRate: "",
      serveRate: "",
      message: "",
      uid:localStorage.getItem('uid')

      // avtor: ""
    };
  },
  methods: {
    goComment() {
      // this.onChange()
      this.active = 3;
    },
    onclickSetting(){
      var uid=localStorage.getItem('uid')
      this.$router.push({ path: "/setting", query: { uid: uid } });
    },
    onCancel() {
      this.show = false;
    },
    getAllOrder() {
      var data = {
        uid: localStorage.getItem("uid")
      };
      this.axios
        .get("/shop/getAllOrder", {
          params: data
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            if (res && res.data) {
              this.allOrder = res.data;
              this.allOrder.forEach(el => {
                el.img = el.img.split(",")[0];
              });
            }
          }
        })
        .catch(err => {});
    },
    onKdChange(value1) {
      switch (value1) {
        case 1:
          this.kdRate = "非常差";
          break;
        case 2:
          this.kdRate = "差";
          break;
        case 3:
          this.kdRate = "一般";
          break;
        case 4:
          this.kdRate = "好";
          break;
        case 5:
          this.kdRate = "非常好";
          break;
        default:
          break;
      }
    },
    onServeChange(value2) {
      switch (value2) {
        case 1:
          this.serveRate = "非常差";
          break;
        case 2:
          this.serveRate = "差";
          break;
        case 3:
          this.serveRate = "一般";
          break;
        case 4:
          this.serveRate = "好";
          break;
        case 5:
          this.serveRate = "非常好";
          break;
        default:
          break;
      }
    },
    onClickLeft() {
      Dialog.confirm({
        title: "确认要退出评论?",
        message: "退出后编辑的内容不保存"
      })
        .then(() => {
          this.showComment = false;
        })
        .catch(() => {});
    },
    onClickRight() {
      var index = localStorage.getItem("CommentIndex");
      this.axios
        .post("/comments/insertComment", {
          uid: localStorage.getItem("uid"),
          gid: localStorage.getItem("gid"),
          content: this.message,
          kdRate: this.value1,
          descRate: this.value,
          serveRate: this.value2,
          commenttime: Date.parse(new Date())
        })
        .then(res => {
          if (res.status === 200) {
            if (res && res.data && res.data.affectedRows === 1) {
              this.updateCommentSid();
              Toast.success("评论成功");
              this.showComment = false;
              this.message = "";
              this.value1 = 0;
              this.value2 = 0;
              this.reload();
            }
          }
        })
        .catch(function(err) {
          // console.log(err);
        });
    },
    updateCommentSid() {
      this.axios
        .post("/shop/updateCommentSid", {
          sid: localStorage.getItem("CommentSid")
        })
        .then(res => {})
        .catch(err => {});
    },
    onRateChange(value) {
      switch (value) {
        case 1:
          this.rateValue = "非常差";
          break;
        case 2:
          this.rateValue = "差";
          break;
        case 3:
          this.rateValue = "一般";
          break;
        case 4:
          this.rateValue = "好";
          break;
        case 5:
          this.rateValue = "非常好";
          break;
        default:
          break;
      }
    },
    onClick(name, title) {
      if (Number(name) === 3) {
        this.getComment();
      }
    },
    goToComment: function(sid, gid, index) {
      localStorage.setItem("gid", gid);
      localStorage.setItem("CommentSid", sid);
      localStorage.setItem("CommentIndex", index);
      this.showComment = true;
      this.commentListContent = this.commentList[index];
    },
    getComment: function() {
      this.axios
        .get("/shop/getcomment", {
          params: {
            uid: localStorage.getItem("uid")
          }
        })
        .then(res => {
          if (res.status === 200) {
            if (res && res.data) {
              res.data.forEach(el => {
                el.img = el.img.split(",")[0];
              });
              this.commentList = res.data;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    waitGet() {
      this.axios
        .get("/shop/selectWaitGet", {
          params: {
            uid: localStorage.getItem("uid")
          }
        })
        .then(response => {
          response.data.forEach(el => {
            el.img = el.img.split(",")[0];
          });
          this.infos = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    changeOrder() {
      this.$router.push({ path: "/order" });
    },
    changeToComment(sid, index) {
      var that = this;
      that.axios
        .post("/shop/changeToComment", { sid: sid })
        .then(res => {
          if (res.status === 200) {
            if (res && res.data && res.data.affectedRows === 1) {
              that.waitGet();
              // that.reload();
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    shopGoods() {
      this.axios
        .post("/shop/shopGoods")
        .then(response => {
          this.info = response.data;
          this.info.forEach(el => {
            el.img = el.img.split(",")[0];

            this.sum += el.price;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteShopGoods(sid) {
      this.axios
        .post("/shop/deleteshopGoods", {
          sid: sid
        })
        .then(response => {
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
          var aa = response.data.data.src;
          localStorage.setItem("avtor", aa);

          this.avtor = localStorage.getItem("avtor");
          this.ImGInsert();
        })
        .catch(function(error) {
          console.log(error);
        });
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
              this.avtor = res.data.avator;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    ImGInsert() {
      this.axios
        .post("/Reg/regAvator", {
          uid: localStorage.getItem("uid"),
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
      // this.avtor =
      //   "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572091337901&di=adb9ce0b2acdccad2e9a474c917fb6bb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658";
      this.nowUser();
    }
    if (this.$route.query.active) {
      this.active = this.$route.query.active;
    }
    this.waitGet();
    this.shopGoods();
    this.getComment();
  },
  mounted() {
    // this.getComment();
    this.getAllOrder();
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
  padding: 0 4px;
  margin-bottom: 2%;
  margin-top: 1%;
}
.desc-c {
  margin-top: 5px;
  padding: 0 16px;
  font-size: 14px;
  display: flex;
}
.rate-desc {
  font-size: 14px;
  margin-left: 18px;
  color: darkgrey;
}
.text-c .van-field__label {
  width: 60px !important;
}
.text-c .van-cell__value {
  border: 1px solid #e5e5ee;
}
.my-icon {
  font-size: 100px;
  color: #e1e1e1;
}
.order:last-child {
  margin-bottom: 50px;
}
.van-uploader {
  position: relative;
  display: inline-block;
  right: 100px;
}
</style>