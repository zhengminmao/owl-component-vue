import VueRouter from "vue-router";
import Vue from 'vue'
import Home from '@/views/home'
import Index from '@/views/index.vue'
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes:  [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})