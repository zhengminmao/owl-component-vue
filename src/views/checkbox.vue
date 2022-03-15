<template>
  <div>
    <h2>Checkbox 复选框</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="code1">
      <p>选择喜欢的运动：</p>
      <owl-checkbox name="favorite" value="sports" v-model="favorite">跑步运动</owl-checkbox>
      <owl-checkbox name="favorite" value="fitness" v-model="favorite">健身运动</owl-checkbox>
      <owl-checkbox name="favorite" value="badminton" v-model="favorite">羽毛球运动</owl-checkbox>
      <p style="font-size:14px">已选值{{JSON.stringify(favorite)}}</p>
    </owl-code-example>
    <h3>使用Checkbox Group</h3>
    <owl-code-example :code="code2">
      <p>选择喜欢的水果：</p>
      <owl-checkbox-group v-model="fruite" direction="vertical">
        <owl-checkbox value="apple">苹果</owl-checkbox>
        <owl-checkbox value="origin">橙子</owl-checkbox>
        <owl-checkbox value="tangeine">橘子</owl-checkbox>
        <owl-checkbox value="banana">香蕉</owl-checkbox>
      </owl-checkbox-group>
      <p style="font-size:14px">已选值{{JSON.stringify(fruite)}}</p>
    </owl-code-example>
    <h3>Checkbox 属性</h3>
    <owl-table :data="propsList" :columns="columns" />
    <h3>Checkbox group 属性</h3>
    <owl-table :data="propsList1" :columns="columns" />
  </div>
</template>
<script>
export default {
  data(){
    return {
      favorite: [],
      fruite: [],
      columns: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '说明', key: 'introduce'},
      ],
      propsList: [
        {name: 'name', types: 'string', introduce: 'input属性'},
        {name: 'label', types: 'string', introduce: '文字，如果有scope则优先使用scope'},
        {name: 'v-model', types: 'Array<any>', introduce: '已选择的值'},
        {name: 'value', types: 'string', introduce: '当前input类型checkbox的value值'},
      ],
      propsList1:[
        {name: 'v-model', types: 'Array<any>', introduce: '已选择的值'},
        {name: 'direction', types: '"horizontal" | "vertical"', introduce: 'checkbox排列的方向，默认是水平方向'},
      ],
      code1:`&lt;template&gt;
  <p>选择喜欢的运动：</p>
  <owl-checkbox name="favorite" value="sports" v-model="favorite">跑步运动</owl-checkbox>
  <owl-checkbox name="favorite" value="fitness" v-model="favorite">健身运动</owl-checkbox>
  <owl-checkbox name="favorite" value="badminton" v-model="favorite">羽毛球运动</owl-checkbox>
  <p style="font-size:14px">已选值{{JSON.stringify(favorite)}}</p>
&lt;/template&gt;
      `,
      code2: `&lt;template&gt;
  <p>选择喜欢的水果：</p>
  <owl-checkbox-group v-model="fruite" direction="vertical">
    <owl-checkbox value="apple">苹果</owl-checkbox>
    <owl-checkbox value="origin">橙子</owl-checkbox>
    <owl-checkbox value="tangeine">橘子</owl-checkbox>
    <owl-checkbox value="banana">香蕉</owl-checkbox>
  </owl-checkbox-group>
  <p style="font-size:14px">已选值{{JSON.stringify(fruite)}}</p>
&lt;/template&gt;`
    }
  }
}
</script>