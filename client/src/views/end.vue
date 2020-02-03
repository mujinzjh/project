<template>
  <div>
       <van-nav-bar title="结算">
      <van-icon name="arrow-left" slot="left" @click="goBack" />
    </van-nav-bar>

    <div class="end">
      <div class="pay">
        <img src="../data/src/pay.png" style="width:100px;height:100px"  />
        <span style="text-align:center">请尽快完成付款</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.end {
  width: 100%;
  height: 100%;
  margin: 50% 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pay {
  display: flex;
  flex-direction: column;
}
</style>