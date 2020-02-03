<template>
  <div class="address">
    <van-nav-bar title="地址编辑">
      <van-icon name="arrow-left" slot="left" @click="goBack" />
    </van-nav-bar>

    <!-- 地址编辑 -->

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="defaultArea"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import areaList from "../data/area";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      defaultArea: ["请选择", "请选择", "请选择"]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    onSave(content) {
      this.axios
        .post("/Address/addAddress", {
         content:content
        })
        .then((response)=> {
          console.log(response);
          if(response.data.code==1){
              this.$router.push({path: '/addressList'})
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onChangeDetail(val) {
      //   if (val) {
      //     this.searchResult = [
      //       {
      //         name: "黄龙万科中心",
      //         address: "杭州市西湖区"
      //       }
      //     ];
      //   } else {
      //     this.searchResult = [];
      //   }
    }
  }
};
</script>

<style scoped>
</style>