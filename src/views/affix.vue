<template>
  <div>
    <h2>Affix 固钉</h2>
    <h3>基础用法</h3>
    <p>当组件消失时，固定到顶部</p>
    <owl-code-example :code="code">
      <owl-affix :offset-top="100"><owl-button>Affix top</owl-button></owl-affix>
    </owl-code-example>
    <div style="height: 500px; background: linear-gradient(131deg, #00000000, #0000000d, #00000000); margin: 12px 0">
    </div>
    <p>当组件消失时，固定到底部</p>
    <owl-code-example :code="code1">
      <owl-affix :offset-bottom="100"><owl-button>Affix Bottom</owl-button></owl-affix>
    </owl-code-example>
    <h3>Affix 属性</h3>
    <owl-table :data="propsData" :columns="propsCol" />
  </div>
</template>
<script lang="ts">
export default {
  data(){
    return {
      code: `&lt;template&gt;
  <owl-affix :offset-top="100"><owl-button>Affix top</owl-button></owl-affix>
&lt;/template&gt;`,
      code1: `&lt;template&gt;
  <owl-affix :offset-bottom="100"><owl-button>Affix Bottom</owl-button></owl-affix>
&lt;/template&gt;`,
      propsCol: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '默认', key: 'default'},
        {title: '说明', key: 'introduce'},
      ],
      propsData: [
        {name: 'offsetTop', types: 'number', default: '', introduce: '固定距离到顶部多少距离'},
        {name: 'offsetBottom', types: 'number', default: '', introduce: '固定距离到底部多少距离'},
      ],
    }
  }
}
</script>