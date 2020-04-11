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
import menu from './components/menu.vue'
import headTop from './components/Backhead.vue'
import calendar from './components/calendar.vue'
import chat from './components/chat.vue'

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
// 引入单元格
import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);
// 引入表单元素
import { Form } from 'vant';
Vue.use(Form);

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
import { Col, Row } from 'vant';
Vue.use(Col);
Vue.use(Row);
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
// 上拉菜单
Vue.use(Uploader);
import { Popup } from 'vant';
import { Notify } from 'vant';

Vue.use(Popup);
Vue.use(Notify);
//标签页滚动
// 上拉菜单
import { ActionSheet } from 'vant';
Vue.use(ActionSheet);
import { Tab, Tabs } from 'vant';

Vue.use(Tab).use(Tabs);

import { Rate } from 'vant';

Vue.use(Rate);
Vue.config.productionTip = false;
Vue.component("Swiper", swiper)
Vue.component("top-Bar", topBar)
Vue.component("search", search)
Vue.component("shopping-bar", shoppingbar)
Vue.component("Index-search", Indexsearch)
Vue.component("my-chat", chat)
Vue.component("my-calendar", calendar)


//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.component("menuNav", menu)
Vue.component("Head-Top",headTop)



// 引入iviewUI
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


Vue.use(ViewUI);
import shy from "./components/shy.vue";
Vue.component("shy",shy);



// 使用echats
import echarts from 'echarts'
Vue.prototype.$echarts = echarts //在vue原型上添加echarts
// 配置axios
axios.defaults.baseURL = "http://localhost:8806"
Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
