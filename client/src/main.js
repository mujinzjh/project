import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './registerServiceWorker'
import '@vant/touch-emulator';
import 'lib-flexible/flexible'
import { Search } from 'vant';
import { Swipe, SwipeItem, Image, ImagePreview, Icon, Sku, SubmitBar, Checkbox, CheckboxGroup, Tag, Button } from 'vant';
import swiper from './components/swipe.vue'
import topBar from './components/topbar.vue'
import search from './components/search.vue'
import shoppingbar from './components/shoppingbar.vue'
import Indexsearch from './components/Indexsearch.vue'

import { Card } from 'vant';

import { Lazyload } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
};
import { AddressList } from 'vant';

Vue.use(AddressList);
import { AddressEdit } from 'vant';

Vue.use(AddressEdit);
import { Area } from 'vant';

Vue.use(Area);

Vue.use(Sku);
Vue.use(Icon);


Vue.use(Tag);

Vue.use(Button);
Vue.use(ImagePreview);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Image);
Vue.use(Lazyload);
Vue.use(Card);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(SubmitBar);
Vue.use(Search);
import { Toast } from 'vant';

Vue.use(Toast);
import { PasswordInput, NumberKeyboard } from 'vant';

Vue.use(PasswordInput).use(NumberKeyboard);
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
import { Field } from 'vant';

Vue.use(Field);
import { Uploader } from 'vant';

Vue.use(Uploader);
import { Popup } from 'vant';
import { Notify } from 'vant';

Vue.use(Popup);
Vue.use(Notify);
//标签页滚动

import { Tab, Tabs } from 'vant';

Vue.use(Tab).use(Tabs);
Vue.config.productionTip = false;
Vue.component("Swiper", swiper)
Vue.component("top-Bar", topBar)
Vue.component("search", search)
Vue.component("shopping-bar", shoppingbar)
Vue.component("Index-search", Indexsearch)




// 配置axios
axios.defaults.baseURL = "http://localhost:8806"
Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
