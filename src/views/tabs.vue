<template>
  <div class="tabs-page">
    <h2>Tabs 标签页</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="tabs1Code">
      <owl-tabs class="tabs1" :list="list" v-model="value"/>
    </owl-code-example>
    <h3>配置</h3>
    <owl-code-example :code="tabs2Code">
      <owl-tabs class="tabs1" :list="list2" v-model="value2" :config="{label: 'countryName', key: 'countryId'}"/>
    </owl-code-example>
    <h3>属性</h3>
    <owl-table :columns="columns" :data="data" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: [
        {label: '英国', key: 'England'},
        {label: '加拿大', key: 'Canada'},
        {label: '美国', key: 'USA'},
        {label: '澳大利亚', key: 'Australia'},
      ],
      list2: [
        {countryName: 'England', countryId: 0},
        {countryName: 'Canada', countryId: 1},
        {countryName: 'USA', countryId: 2},
        {countryName: 'Australia', countryId: 3},
      ],
      value2: 0,
      value: 'England',
      columns: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '说明', key: 'introduce'},
      ],
      data: [
        {name: 'list', types: 'any[]', introduce: 'tabs列表'},
        {name: 'config', types: "{label: string, key: string}", introduce: "label显示的名称，key选择的值。默认值是{label: 'label', key: 'key'}"},
        {name: 'value/v-model', types: 'string | number', introduce: '当前选中的值'},
        {name: 'type', types: "'line' | 'border'", introduce: '下划线或边框样式'},
      ],
      tabs1Code:`&lt;template&gt;
  &lt;owl-tabs :list="list" v-model="value"/&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data(){
    return {
      list: [
        {label: '英国', key: 'England'},
        {label: '加拿大', key: 'Canada'},
        {label: '美国', key: 'USA'},
        {label: '澳大利亚', key: 'Australia'},
      ],
      value: 'England',
    }
  }
}
&lt;script/&gt;
      `,
      tabs2Code:`&lt;template&gt;
  &lt;owl-tabs class="tabs1" :list="list2" v-model="value2" :config="{label: 'countryName', key: 'countryId'}"/&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data(){
    return {
      list2: [
        {countryName: 'England', countryId: 0},
        {countryName: 'Canada', countryId: 1},
        {countryName: 'USA', countryId: 2},
        {countryName: 'Australia', countryId: 3},
      ],
      value2: 0,
    }
  }
}
&lt;script/&gt;
      `
    }
  }
}
</script>
<style lang="less">
.tabs-page {
  max-width: 920px;
  .tabs1{
    text-align: left;
  }
}
</style>