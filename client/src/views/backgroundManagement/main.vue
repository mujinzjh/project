<template>
  <div>
  
    <el-container>
      <el-header>
          <Head-Top></Head-Top>
      </el-header>
      <el-container>
            <el-aside height="100%" width="230px">
              <menuNav></menuNav>
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
.el-container {
  background-color: #e6e6e6;
}
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #333;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #fff;
  color: #333;
  margin-top: 20px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-header {
  padding: 0;
}
</style>