import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: index
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
    path: '/shoppingcar',
    component: () => import(/* webpackChunkName: "about" */ '../views/shoppingcar.vue')
  },
  {
    path: '/mine',
    component: () => import(/* webpackChunkName: "about" */ '../views/mine.vue')
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
