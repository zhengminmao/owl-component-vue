<template>
  <div>
    <h2>Date 日期选择</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="code">
      <p class="subtitle">您的生日是?</p>
      <owl-date v-model="value" />
    </owl-code-example>
    <h3>修改日期显示和返回值格式</h3>
    <owl-code-example :code="code1">
      <owl-date v-model="value1" value-format="YYYY/MM/DD" format="YYYY/MM/DD"></owl-date>
    </owl-code-example>
    <h3>快捷选项</h3>
    <owl-code-example :code="code2">
      <owl-date v-model="value2" :quickly-choose="[
        {label: '2000-01-01', value: '2000-01-01'}, 
        {label: '2010-01-01', value: '2010-01-01'},
        {label: '2020-01-01', value: '2020-01-01'},
      ]" />
    </owl-code-example>
    <h3>属性</h3>
    <owl-table :data="list" :columns="columns"></owl-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      value: '2022-04-01',
      value1: '2022-04-01',
      value2: '',
      columns: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '默认值', key: 'default'},
        {title: '说明', key: 'introduce'},
      ],
      list: [
        {name: 'v-model', default: '', types: 'string', introduce: '日期值'},
        {name: 'placeholder', types: 'string', default:'请选择日期 Please pick date', introduce: '占位符'},
        {name: 'format', types: 'string', default:'YYYY-MM-DD', introduce: '文本框显示的日期格式'},
        {name: 'valueFormat', types: 'string', default:'YYYY-MM-DD', introduce: '返回值的日期格式'},
        {name: 'size', types: '"large"|"default"|"small"', default:'default', introduce: '尺寸'},
        {name: 'quicklyChoose', default: '[]', types: 'Array<{label: string, value: string}>', introduce: '提供快捷选择日期，label是选择的文本，value是选择后的值'},
      ],
      code:`&lt;template&gt;
  &lt;owl-date v-model="value" /&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    data(){
      return {
        value: '2022-04-01',
      }
    }
  }
&lt;/script&gt;`,
      code1: `&lt;template&gt;
  &lt;owl-date v-model="value1" value-format="YYYY/MM/DD" format="YYYY/MM/DD"/&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data(){
      return {
        value1: '2022-04-01',
      }
    }
  }
&lt;/script&gt;`,
      code2: `&lt;template&gt;
  <owl-date v-model="value2" :quickly-choose="[
    {label: '2000-01-01', value: '2000-01-01'}, 
    {label: '2010-01-01', value: '2010-01-01'},
    {label: '2020-01-01', value: '2020-01-01'},
  ]" />
&lt;/script&gt;`
    }
  }
}
</script>