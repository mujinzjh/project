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
      <div slot="action" @click="onSearch" style="line-height:normal">
        <van-icon name="search" size="20" />
      </div>
      <div slot="left-icon" @click="onSearch">
        <van-icon name="arrow-left" @click="forWard" />
      </div>
    </van-search>

    <ul class="likeGoodUl">
      <li v-for="(el,index) in goodsList" :key="index" class="likeGoodLi" @click="change(el.gid)">
        <img :src="el.img" alt class="liImg" />
        <div style="font-size:12px" class="goodName-show">{{el.name}}</div>
        <div class="GoodPrice">
          <span style="color:red;text-align:left">￥{{el.price}}</span>
          <span style="color:gray;font-size:0.3rem;line-height:200%">{{el.saleNum}}人已付款</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon } from "vant";
import { Toast } from "vant";
export default {
  data() {
    return {
      value: "",
      goodsList: []
    };
  },
  watch: {
    value() {
      this.onSearch();
    }
  },
  methods: {
    change(gid) {
      this.$router.push({ path: "/info", query: { gid: gid } });
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
      if (this.value) {
        this.onSearch();
      } else {
        this.goodsList = [];
      }
    },
    sortArr(array, key) {
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    onSearch() {
      var value = this.value;
      if (value) {
        this.axios
          .get("/Goods/Search", {
            params: {
              value: this.value
            }
          })
          .then(response => {
            console.log(response);
            var arr = [];
            if (response.data.length === 0) {
              Toast("暂无数据");
            } else {
              var data = response.data,
                dataResult = this.sortArr(data, "gid");
              dataResult.forEach(el => {
                el.img = el.img.split(",")[0];
                arr.push(el.gid);
              });
              arr.sort();
              arr = JSON.stringify(arr);
              sessionStorage.setItem("gidArr", arr);
              this.saleNum(dataResult);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        Toast("暂无数据");
      }
    },
    saleNum(dataResult) {
      var arr = sessionStorage.getItem("gidArr"),
        isFirst = true,
        gid = "";
      arr = JSON.parse(arr);
      console.log(arr);
      arr.forEach(el => {
        gid = gid + (isFirst ? "" : ",") + el;
        isFirst = false;
      });
      this.axios
        .get("/shop/getCountByGid", {
          params: {
            gid: gid
          }
        })
        .then(res => {
          console.log(res);
           var arr = dataResult;
           arr.forEach(el=>{
             el.saleNum=0;
           })
          if (res.status === 200) {
            if (res && res.data&&res.data.length>0) {
              for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < res.data.length; j++) {
                  if (i === j) {
                    arr[i].saleNum = res.data[j].nums;
                  }
                }
              }
              this.goodsList = arr;
            }
          }
        })
        .catch(err => {});
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
  font-size: 0.4rem;
}
.likeGoodLi:nth-of-type(odd) {
  margin-right: 2px;
}
.likeGoodUl {
  /* background-color: #E3e3e3; */
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
.goodName-show{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>