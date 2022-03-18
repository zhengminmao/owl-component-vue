<template>
  <div>
    <h2>Radio 单选框</h2>
    <h3>基本用法</h3>
    <owl-code-example :code="code1">
      <p class="subtitle">是否喜欢编程?</p>
      <owl-radio name="code" :value="true" v-model="value">是</owl-radio>
      <owl-radio name="code" :value="false" v-model="value">否</owl-radio>
    </owl-code-example>
    <h3>Radio group</h3>
    <owl-code-example :code="code2">
      <p class="subtitle">是否热爱运动?</p>
      <owl-radio-group v-model="value1">
        <owl-radio name="sport" :value="true">是</owl-radio>
        <owl-radio name="sport" :value="false">否</owl-radio>
      </owl-radio-group>
    </owl-code-example>
    <h3>Radio 属性</h3>
    <owl-table :data="propsList" :columns="columns" />
    <h3>Radio group 属性</h3>
    <owl-table :data="propsList1" :columns="columns" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      value: '',
      value1: '',
      columns: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '说明', key: 'introduce'},
      ],
      propsList: [
        {name: 'name', types: 'string', introduce: 'input属性'},
        {name: 'label', types: 'string', introduce: '文字，如果有scope则优先使用scope'},
        {name: 'v-model', types: 'string | number | boolean', introduce: '已选择的值'},
        {name: 'value', types: 'string', introduce: '当前input类型radio的value值'},
      ],
      propsList1:[
        {name: 'v-model', types: 'string | number | boolean', introduce: '已选择的值'},
        {name: 'direction', types: '"horizontal" | "vertical"', introduce: 'radio排列的方向，默认是水平方向'},
      ],
      code1: `&lt;template&gt;
  <p>是否喜欢编程?</p>
  <owl-radio name="favorite" :value="true" v-model="value">是</owl-radio>
  <owl-radio name="favorite" :value="false" v-model="value">否</owl-radio>
&lt;/template&gt;`,
      code2: `&lt;template&gt;
  <p>是否热爱运动?</p>
  <owl-radio-group v-model="value1">
    <owl-radio name="sport" :value="true">是</owl-radio>
    <owl-radio name="sport" :value="false">否</owl-radio>
  </owl-radio-group>
&lt;/template&gt;`
    }
  }
}
</script>