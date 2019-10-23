import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './registerServiceWorker'
import '@vant/touch-emulator';
import 'lib-flexible/flexible'
import { Search } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import swiper from './components/swipe.vue'
import topBar from './components/topbar.vue'
import search from './components/search.vue'
import shoppingbar from './components/shoppingbar.vue'

import { Lazyload } from 'vant';
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar).use(TabbarItem);

Vue.use(Lazyload);
Vue.use(Swipe).use(SwipeItem);

Vue.use(Search);

//购物车底部组件
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from 'vant';

Vue
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton);
//导航栏
import { NavBar } from 'vant';

Vue.use(NavBar);
//标签页滚动
import { Tab, Tabs } from 'vant';

Vue.use(Tab).use(Tabs);
Vue.config.productionTip = false;
Vue.component("Swiper", swiper)
Vue.component("top-Bar", topBar)
Vue.component("search", search)
Vue.component("shopping-bar", shoppingbar)



// 配置axios
axios.defaults.baseURL = "http://localhost:8806"
Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
