<template>
  <div class="footer">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/cate" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item replace to="/shoppingcar" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>