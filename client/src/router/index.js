import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import Info from '../views/Info.vue'
import ShoppingCar from '../views/ShoppingCar.vue'
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
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
