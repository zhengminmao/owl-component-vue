import Vue from "vue";
import App from './App'
import router from './router'
import Button from '@lib/button'
import Swiper from '@lib/swiper'
import '@lib/assets/common.less'
Vue.use(Button)
Vue.use(Swiper)
new Vue({
  router: router,
  render: (h) => h(App)
}).$mount('#app')