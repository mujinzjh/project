<!--<template>-->
<!-- <div></div> -->
  <!-- <div>
    <el-container>
      <el-header>
          <Head-Top></Head-Top>
      </el-header>
      <el-container>
            <el-aside height="100%" width="230px">
              <menuNav></menuNav>
            </el-aside>
            <el-main id="my-main">
              <div >
                 <router-view></router-view>
              </div>
            </el-main>
      </el-container>
    </el-container>
  </div> -->
<!-- // </template> -->

<!-- <script> -->
<!-- // export default {
  // data () {
  //   return {
  //     height:0
  //   }
  // },
 
  // created () {
  //   var clientH=document.querySelector('#my-main');
  //   this.height=Number(document.body.clientHeight)-82;
  //   console.log(clientH,this.height);
  // },
  //  watch:{
  //    height(){
  //      console.log(this.height);
  //    }
  // },
// };
// </script>

/*<style>*/
/* .el-container {
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
} */
 // </style> */ -->


<style>
body{
  overflow:hidden
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.ivu-layout-header {
    padding:0;
}
.ivu-layout-sider-children {
    height: 685px;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
              <Head-Top></Head-Top>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                               首页信息
                            </template>
                            <MenuItem name="1-1" to='/backManagementMain/baseinfo'>基本信息</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                商品管理
                            </template>
                            <MenuItem name="2-1" to='/backManagementMain/goodsAdd'>我的商品</MenuItem>
                            <MenuItem name="2-2" to='/backManagementMain/goodsinfo'>所有商品</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '10px 16px'}">
                    <!-- <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb> -->
                    <Content :style="{padding:'0 8px',minHeight: '280px',maxHeight:'800px', background: '#fff'}">
                       <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        
    }
</script>