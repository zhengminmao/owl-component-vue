import VueRouter from "vue-router";
import Vue from 'vue'
import Home from '@/views/home.vue'
import ColorIntro from '@/views/colorIntro.vue'
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
import Button from "@/views/button.vue";
import Radio from "@/views/radio.vue";
import Pagination from "@/views/pagination.vue";
import Form from "@/views/form.vue";
import Popover from "@/views/popover.vue";
import Affix from "@/views/affix.vue";
import Message from "@/views/message.vue";
Vue.use(VueRouter)

export const routes = [
  {
    meta: {
      title: '介绍',
      slide: true,
      subtitle: true,
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      slide: true,
      title: 'OwlUI 概述'
    }
  },
  {
    path: '/color-intro',
    name: 'color-intro',
    component: ColorIntro,
    meta: {
      slide: true,
      title: '主题色'
    }
  },
  {
    meta: {
      title: '表单组件',
      slide: true,
      subtitle: true,
    }
  },
  {
    path: '/label',
    name: 'label',
    component: Label,
    meta: {
      title: 'Label 文本',
      slide: true
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
    path: '/button',
    name: 'button',
    component: Button,
    meta: {
      title: 'Button 按钮',
      slide: true
    }
  },{
    path: '/radio',
    name: 'radio',
    component: Radio,
    meta: {
      title: 'Radio 单选框',
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
  },
  {
    path: '/form',
    name: 'form',
    component: Form,
    meta: {
      title: 'Form 表单',
      slide: true
    }
  },
  {
    meta: {
      title: '页面组件',
      slide: true,
      subtitle: true,
    }
  },
  {
    path: '/pagination',
    name: 'pagination',
    component: Pagination,
    meta: {
      title: 'Pagination 分页',
      slide: true
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
    path: '/message',
    name: 'message',
    component: Message,
    meta: {
      title: 'Message 消息',
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
  {
    path: '/popover',
    name: 'popover',
    component: Popover,
    meta: {
      title: 'Popover 气泡卡片',
      slide: true
    }
  },
  {
    path: '/affix',
    name: 'affix',
    component: Affix,
    meta: {
      title: 'Affix 固钉',
      slide: true
    }
  },
]
export default new VueRouter({
  mode: 'hash',
  routes: routes.filter(item=>!!item.component)
})