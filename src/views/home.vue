
<template>
  <div class="home-page">
    <h2>Introduce 概述</h2>
    <p>Owl Component Vue组件库是由<a href="https://www.msoffer.hk" target="__blank">MSO海外升学智选平台</a>提取出来的通用组件，因此专门服务于MSO，为MSO量身定做，大部分组件剔除了其它组件库不必要的功能，因此载入JS和CSS的包资源小。</p>
    <p>作者水平有限，组件库的代码仅供参考和学习</p>
    <h3>npm 安装</h3>
    <p>推荐使用 npm 的方式安装，它能更好地和 <a href="https://webpack.docschina.org/concepts/" target="__blank">webpack</a> 打包工具配合使用。</p>
    <code class="code"><span >npm install owl-component-vue</span></code>
    <h3>引入 OwlUI</h3>
    <p>你可以引入整个组件，或是根据需要仅引入部分组件。我们先介绍如何引入完整的组件</p>
    <code class="code" id="code1"></code>
  </div>
</template>
<script>
export default {
  mounted(){
    const dom1 = document.querySelector('#code1')
    dom1.innerHTML = this.$hljs.highlight(`import Vue from 'vue';
import OwlUI from 'owl-component-vue';
import 'mso-component-vue/dist/owlui.min.css';
import App from './App.vue';

Vue.use(OwlUI);

new Vue({
  el: '#app',
  render: h => h(App)
});`, {language: 'javascript'}).value
  }
}
</script>