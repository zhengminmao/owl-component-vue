<template>
  <div>
    <h2>输入框</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="code1">
      <div class="input1">
        <owl-input
          class="input1-csm"
          placeholder="请输入您的姓名"
          v-model="input1"
        />
        <owl-input
          class="input1-csm"
          placeholder="请输入您的手机号码"
          v-model="input2"
        />
      </div>
    </owl-code-example>
    <h3>密码框</h3>
    <owl-code-example :code="code2">
      <owl-input
        class="input2-csm"
        type="password"
        placeholder="请输入您的密码"
        v-model="input3"
      />
    </owl-code-example>
    <h3>验证</h3>
    <owl-code-example :code="code3" introduce="当触发input的onblur事件时，组件会检验rule属性，如果有值且长度大于一且其中一个validate返回的是false，则会出现红色的提示语和红色下划线">
      <owl-input
        class="input2-csm"
        placeholder="请输入您的手机号"
        v-model="input4"
        :rule="validate"
      />
    </owl-code-example>
    <h3>Props</h3>
    <owl-table :data="propsData" :columns="propsCol" />
  </div>
</template>
<script>
export default {
  data(){
    return{
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      propsCol: [
        {title: '名称', key: 'name', width: '180px'},
        {title: '类型', key: 'types'},
        {title: '说明', key: 'introduce'},
      ],
      propsData: [
        {name: 'value/v-model', types: 'string', introduce: '输入框的值'},
        {name: 'type', types: '"text"|"password"|"number"', introduce: '输入框的类型，默认是text'},
        {name: 'placeholder', types: 'string', introduce: '原生placeholder属性'},
        {name: 'rule', types: 'Array<{require: boolean, tip: string, validate: (value)=>boolean}>', introduce: '验证规则，"require"是否必填，"tip"提示语，"validate"验证规则函数，函数的参数是当前值，返回值是boolean类型'},
      ],
      validate: [
        {require: true, tip: '请输入手机号'},
        {require: true, tip: '请输入11位数字', validate:(val)=>{
          return /^\d{11}$/.test(val)
        }}
      ],
      code1:`&lt;template&gt;
  <div class="input1">
    <owl-input
      class="input1-csm"
      placeholder="请输入您的姓名"
      v-model="input1"
    />
    <owl-input
      class="input1-csm"
      placeholder="请输入您的手机号码"
      v-model="input2"
    />
  </div>
&lt;/template&gt;
&lt;script&gt;
  export default {
    data(){
      return {
        input1: '',
        input2: '',
      }
    }
  }
&lt;/script&gt;
`,
      code2:`&lt;template&gt;
  <owl-input
    class="input2-csm"
    type="password"
    placeholder="请输入您的密码"
    v-model="input1"
  />
&lt;/template&gt;
`,
      code3: `&lt;template&gt;
  <owl-input
    class="input2-csm"
    placeholder="请输入您的手机号"
    v-model="input4"
    :rule="validate"
  />
&lt;/template&gt;

&lt;script&gt;
export default {
  data(){
    return {
      input4: '',
      validate: [
        { require: true, tip: '请输入手机号' },
        { require: true, tip: '请输入11位数字', validate: (val) => {
          return /^\d{11}$/.test(val)
        } }
      ],
    }
  }
}
&lt;/script&gt; 
`
    }
  }
}
</script>
<style lang="less">
.input1{
  width: 480px;
  border: 1px solid #e1e1e1;
  padding: 20px;
  height: 200px;
  .input1-csm{
    height: 50px;
  }
}
.input2-csm{
  width: 280px;
}
</style>