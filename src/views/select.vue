<template>
  <div class="select-page">
    <h2>Select 下拉框</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="code">
      <template>
        <owl-select :list="list" v-model="value1" ></owl-select>
        <owl-select :list="list1" v-model="value2" word-wrap="nowrap"></owl-select>
      </template>
    </owl-code-example>
    <h3>Props</h3>
    <owl-table :data="propsList" :columns="columns" />
  </div>
</template>
<script>
export default {
  data(){
    return {
      value1: '',
      value2: '',
      value3: [],
      list: [
        {label: '中国', value: 'China'},
        {label: '中国-香港', value: 'Hongkong'},
        {label: '中国-台湾', value: 'Taiwan'},
        {label: '加拿大', value: 'Canada'},
        {label: '澳大利亚', value: 'Australia'},
        {label: '一段很长很长很长很长很长很长的国家名', value: 'other'},
      ],
      list1: [
        {label: '中国', value: 'China'},
        {label: '中国-香港', value: 'Hongkong'},
        {label: '中国-台湾', value: 'Taiwan'},
        {label: '加拿大', value: 'Canada'},
        {label: '澳大利亚', value: 'Australia'},
        {label: '美国', value: 'USA'},
        {label: '英国', value: 'UK'},
        {label: '日本', value: 'Japan'},
        {label: '一段很长很长很长很长很长很长的国家名', value: 'other'},
      ],
      columns: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '默认值', key: 'default'},
        {title: '说明', key: 'introduce'},
      ],
      propsList: [
        {name: 'list', types: 'Array<any>', introduce: '下拉列表'},
        {name: 'config', types: '{label: string, value: string}', introduce: '配置'},
        {name: 'value/v-model', types: 'string', introduce: '当前值'},
        {name: 'placeholder', types: 'string',default: '请输入 Please select', introduce: '空字符占位符'},
        {name: 'word-wrap', types: '"wrap"|"nowrap"',default: 'wrap', introduce: '是否换行，默认换行'},
        {name: 'multiple', types: 'boolean',default: 'false', introduce: '是否多选'},
      ],

      code:`&lt;template&gt;
  <div class="proccess-wrap">
    <owl-select :list="list" v-model="value1"></owl-select>
    <owl-select :list="list1" v-model="value2"></owl-select>
  </div>  
&lt;/template&gt;

&lt;script&gt;
  export default {
    data(){
      return {
        value1: '',
        value2: '',
        list: [
          {label: '中国', value: 'China'},
          {label: '中国-香港', value: 'Hongkong'},
          {label: '中国-台湾', value: 'Taiwan'},
          {label: '加拿大', value: 'Canada'},
          {label: '澳大利亚', value: 'Australia'},
        ],
        list1: [
          {label: '中国', value: 'China'},
          {label: '中国-香港', value: 'Hongkong'},
          {label: '中国-台湾', value: 'Taiwan'},
          {label: '加拿大', value: 'Canada'},
          {label: '澳大利亚', value: 'Australia'},
          {label: '美国', value: 'USA'},
          {label: '英国', value: 'UK'},
          {label: '日本', value: 'Japan'},
        ],
      }
    }
  }
&lt;/script&gt;
`
    }
  },
  
}
</script>