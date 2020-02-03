<template>
    <van-swipe :autoplay="3000"  :height="250">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image"  class="imgs"/>
      </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
data () {
    return {
        images: [
        "https://gw.alicdn.com/imgextra/i2/84/O1CN01iXd41T1CUVpvQTTUL_!!84-0-lubanu.jpg",
        "https://gw.alicdn.com/imgextra/i3/82/O1CN01K6rAQk1CTb2jUqNRw_!!82-0-lubanu.jpg",
        "https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg"
      ]
    }
}
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.imgs{
width: 100%;
  height:250px;
}
</style>