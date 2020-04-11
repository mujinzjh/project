import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import Info from '../views/Info.vue'
import ShoppingCar from '../views/shoppingcar.vue'
import order from '../views/order.vue'
import Address from '../views/Address.vue'
import addressList from '../views/addressList.vue'
import end from '../views/end.vue'
import Register from '../views/Register.vue'
import Loginuser from '../views/Loginuser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    component: index
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    name: 'loginuser',
    component: Loginuser
  },
  {
    path: '/end',
    component: end
  },
  {
    path: '/addressList',
    component: addressList
  },
  {
    path: '/Address',
    component: Address
  },
  {
    path: '/order',
    component: order
  },
  {
    path: '/shoppingcar',
    component: ShoppingCar
  },
  {
    path: '/info',
    component: Info
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/setting',
    component: () => import(/* webpackChunkName: "about" */ '../views/setting.vue'),
    // children:[{
    //   path: 'countInfo',
    //   name:'countInfo',
    //   component: () => import('../views/countInfo.vue'),
    // }]
  },
  {
    path: '/countInfo',
    component: () => import('../views/countInfo.vue'),
  },
  {
    path: '/nameedit',
    component: () => import('../views/nameEdit.vue')
  },
  {
    path: '/passwordedit',
    component: () => import('../views/passwordEdit.vue')
  },
  {
    path: '/infoshow',
    component: () => import('../views/Infoshow.vue')
  },
  {
    path: '/cate',
    component: () => import(/* webpackChunkName: "about" */ '../views/cate.vue')
  },
  {
    path: '/mine',
    component: () => import(/* webpackChunkName: "about" */ '../views/mine.vue')
  },
  {
    path: '/SearchPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchPage.vue')
  },
  {
    path: '/backManagementLogin',
    component: () => import(/* webpackChunkName: "about" */ '../views/backgroundManagement/managementLogin.vue')
  },
  {
    path: '/backManagementMain',
    component: () => import(/* webpackChunkName: "about" */ '../views/backgroundManagement/main.vue'),
    children:[{
      path: '/backManagementMain/goodsAdd',
      component: () => import(/* webpackChunkName: "about" */ '../views/backgroundManagement/GoodShop.vue'),
    },
    {
      path: '/backManagementMain/goodsinfo',
      component: () => import(/* webpackChunkName: "about" */ '../views/backgroundManagement/GoodInfo.vue'),
    },
    {
      path: '/backManagementMain/baseinfo',
      name:'baseinfo',
      component: () => import(/* webpackChunkName: "about" */ '../views/backgroundManagement/baseInfo.vue'),
    }
    ]
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
