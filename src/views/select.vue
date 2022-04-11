<template>
  <div class="select-page">
    <h2>Select 下拉框</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="code">
      <template>
          <p class="subtitle">选择护照国家：</p>
          <owl-select :list="list" v-model="value1" ></owl-select>
          <p class="subtitle">选择目的地国家：</p>
          <owl-select :list="list1" v-model="value2" word-wrap="nowrap"></owl-select>
      </template>
    </owl-code-example>
    <h3>多选</h3>
    <owl-code-example :code="code1">
      <template>
        <p class="subtitle">选择英语成绩类型：已选择{{value3.join(',')}}</p>
        <owl-select :list="list2" v-model="value3" :config="config" :multiple="true" ></owl-select>
      </template>
    </owl-code-example>
    <h3>属性</h3>
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
      list2: [
        { "id": 2, "levelName": "Pre-sessional English", },
        { "id": 3, "levelName": "Other English Course", },
        { "id": 19, "levelName": "Other Academic Course", },
        { "id": 4, "levelName": "Foundation", },
        { "id": 5, "levelName": "Certificate", },
        { "id": 6, "levelName": "Diploma", },
        { "id": 28, "levelName": "International Year One", },
        { "id": 29, "levelName": "International Year Two", },
      ],
      config:{
        label: 'levelName',
        value: 'id'
      },
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
        {name: 'placeholder', types: 'string',default: '请选择 Please select', introduce: '空字符占位符'},
        {name: 'word-wrap', types: '"wrap"|"nowrap"',default: 'wrap', introduce: '是否换行，默认换行'},
        {name: 'size', types: '"large"|"default"|"small"', default:'default', introduce: '尺寸'},
        {name: 'multiple', types: 'boolean',default: 'false', introduce: '是否多选'},
      ],

      code:`&lt;template&gt;
  <div>
    <p>选择护照国家：</p>
    <owl-select :list="list" v-model="value1" ></owl-select>
    <p>选择目的地国家：</p>
    <owl-select :list="list1" v-model="value2" word-wrap="nowrap"></owl-select>
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
&lt;/script&gt;`,
      code1: `&lt;template&gt;
  <p>选择英语成绩类型：已选择{{value3.join(',')}}</p>
  <owl-select :list="list2" v-model="value3" :config="config" :multiple="true" ></owl-select>  
&lt;/template&gt;

&lt;script&gt;
  export default {
    data(){
      return {
        list2: [
          { "id": 2, "levelName": "Pre-sessional English", },
          { "id": 3, "levelName": "Other English Course", },
          { "id": 19, "levelName": "Other Academic Course", },
          { "id": 4, "levelName": "Foundation", },
          { "id": 5, "levelName": "Certificate", },
          { "id": 6, "levelName": "Diploma", },
          { "id": 28, "levelName": "International Year One", },
          { "id": 29, "levelName": "International Year Two", },
        ],
        config:{
          label: 'levelName',
          value: 'id'
        },
      }
    }
  }
&lt;/script&gt;
`


    }
  },
  
}
</script>