import Vue from "vue";
import App from './App'
import router from './router'
import OwlUI from '@lib'
import OwlTable from '@/component/Table'
import OwlCodeExaple from '@/component/CodeExample'

Vue.component('owl-table',OwlTable)
Vue.component('owl-code-example',OwlCodeExaple)
Vue.use(OwlUI)

new Vue({
  router: router,
  render: (h) => h(App)
}).$mount('#app')