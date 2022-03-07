import Vue from "vue";
import App from './App'
import router from './router'
import OwlUI from '@lib'
import OwlTable from '@/component/Table'

Vue.component('owl-table',OwlTable)
Vue.use(OwlUI)

new Vue({
  router: router,
  render: (h) => h(App)
}).$mount('#app')