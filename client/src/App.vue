<template>
  <div id="app">
      
      <router-link to="/index" ></router-link> 
     
 
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default{
  provide(){
    return{
      reload:this.reload
    }
  },
  data () {
    return {
      isRouterAlive:true
    }
  },
  methods: {
    reload(){
      var that=this;
      that.isRouterAlive=false;
      that.$nextTick(function(){
        that.isRouterAlive=true;
      })
    }
  }
}
</script>
<style lang="scss">
html{
  background-color:#f6f6f6;
}
body{
  overflow-x: hidden;
  // overflow-y:hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;

  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
