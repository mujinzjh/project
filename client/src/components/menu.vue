<template>
  <div class="menu-nav-aside">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
        menu-trigger="click"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          background-color="#333"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>首页详情</span>
            </template>

            <el-menu-item index="/backManagementMain/baseinfo">基础信息</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/backManagementMain/goodsAdd">我的商品</el-menu-item>
            <el-menu-item index="/backManagementMain/goodsinfo">所有商品</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
.menu-nav-aside{
  overflow: hidden;
}
.title{
    color: #fff;
}
.el-menu{
    /* height: 750px; */
}
.tac {
  height: 800px;

 
}
.el-aside[data-v-c9a65f5a]{
  /* height: 100%; */
  background-color: #333
}
.el-submenu__title{
  width: 200px;
}
</style>