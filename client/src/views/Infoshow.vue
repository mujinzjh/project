<template>
  <div class="content">
      <Affix>
      <van-nav-bar title="易购商场版本" left-arrow>
        <van-icon name="arrow-left" slot="left" @click="goBack" />
      </van-nav-bar>
    </Affix>
      <div class="version">
  易购商场版本
      </div>
  </div>
</template>

<script>
export default {
methods: {
    goBack(){
        this.$router.go(-1);
    }
}
}
</script>

<style>
.content{
    min-height: 809px;
    background-color: #fff;
    text-align: center;
    color: cornflowerblue;
}
.version{
    min-height:763px;
    padding-top: 80px;
}
</style>