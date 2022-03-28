import Vue from "vue";
import App from './App'
import router from './router'
import OwlUI from '@lib'
import OwlTable from '@/component/Table'
import OwlCodeExaple from '@/component/CodeExample'
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

Vue.component('owl-table',OwlTable)
Vue.component('owl-code-example',OwlCodeExaple)
Vue.use(OwlUI)
Vue.prototype.$hljs = hljs;
new Vue({
  router: router,
  render: (h) => h(App)
}).$mount('#app')