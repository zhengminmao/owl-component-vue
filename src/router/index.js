import VueRouter from "vue-router";
import Vue from 'vue'
import Home from '@/views/home.vue'
import Swiper from '@/views/swiper.vue'
import Label from '@/views/label.vue'
import Tabs from '@/views/tabs.vue'
import Input from '@/views/input.vue'
import Slide from '@/views/slide.vue'
import Modal from "@/views/modal.vue";
import Proccess from "@/views/proccess.vue";
import Select from "@/views/select.vue";
import Collapse from "@/views/collapse.vue";
import Checkbox from "@/views/checkbox.vue";
import Date from "@/views/date.vue";
Vue.use(VueRouter)

export const routes = [

  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      slide: true,
      title: 'Introduce 概述'
    }
  },
  {
    path: '/input',
    name: 'input',
    component: Input,
    meta: {
      title: 'Input 输入框',
      slide: true
    }
  },{
    path: '/checkbox',
    name: 'checkbox',
    component: Checkbox,
    meta: {
      title: 'Checkbox 复选框',
      slide: true
    }
  },{
    path: '/select',
    name: 'select',
    component: Select,
    meta: {
      title: 'Select 下拉框',
      slide: true
    }
  },{
    path: '/date',
    name: 'date',
    component: Date,
    meta: {
      title: 'Date 日期选择',
      slide: true
    }
  },{
    path: '/slide',
    name: 'slide',
    component: Slide,
    meta: {
      title: 'Slide 滑块',
      slide: true
    }
  },{
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
  },
  {
    path: '/modal',
    name: 'modal',
    component: Modal,
    meta: {
      title: 'Modal 弹窗',
      slide: true
    }
  },
  {
    path: '/collapse',
    name: 'collapse',
    component: Collapse,
    meta: {
      title: 'Collapse 手风琴',
      slide: true
    }
  },
  {
    path: '/proccess',
    name: 'proccess',
    component: Proccess,
    meta: {
      title: 'Proccess 进度条',
      slide: true
    }
  },
]
export default new VueRouter({
  mode: 'hash',
  routes: routes
})