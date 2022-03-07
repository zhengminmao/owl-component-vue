import VueRouter from "vue-router";
import Vue from 'vue'
import Home from '@/views/home'
import Index from '@/views/index.vue'
import Swiper from '@/views/swiper.vue'
import Label from '@/views/label.vue'
import Tabs from '@/views/tabs.vue'
Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      slide: true,
      title: 'Introduce 概述'
    }
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: Swiper,
    meta: {
      title: 'Swiper 轮播图',
      slide: true
    }
  },
  {
    path: '/label',
    name: 'label',
    component: Label,
    meta: {
      title: 'Label 文本省略',
      slide: true
    }
  },
  {
    path: '/tabs',
    name: 'tabs',
    component: Tabs,
    meta: {
      title: 'Tabs 标签页',
      slide: true
    }
  }
]
export default new VueRouter({
  mode: 'hash',
  routes: routes
})