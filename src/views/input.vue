<template>
  <div>
    <h2>Input 输入框</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="code1">
      <div class="input1">
        <div class="subt">Default版：</div>
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
      <div class="input1">
        <div class="subt">Border版：</div>
        <owl-input
          border
          class="input1-csm"
          size="large"
          placeholder="大输入框"
          v-model="borderInput1"
        />
        <owl-input
          border
          class="input1-csm"
          placeholder="中输入框"
          v-model="borderInput2"
        />
        <owl-input
          border
          size="small"
          class="input1-csm"
          placeholder="小输入框"
          v-model="borderInput3"
        />
      </div>
    </owl-code-example>
    <h3>密码和数字输入</h3>
    <owl-code-example :code="code2">
      <p class="subtitle">密码：</p>
      <owl-input
        class="input2-csm"
        type="password"
        placeholder="请输入您的密码"
        v-model="input3"
      />
      <p class="subtitle">数字：</p>
      <owl-input
        class="input2-csm"
        type="number"
        placeholder="请输入您的年龄"
        v-model="inputNum"
      />
    </owl-code-example>
    <h3>验证</h3>
    <owl-code-example :code="code3" introduce="当触发input的onblur事件时，组件会检验rule属性，如果有值且长度大于一且其中一个validate返回的是false，则会出现红色的提示语和红色下划线">
      <div class="input2">
        <div class="subt">Default版：</div>
        <owl-input
          class="input3-csm"
          placeholder="请输入您的手机号"
          v-model="input4"
          :rule="validate"
        />
      </div>
      <div class="input2">
        <div class="subt">Border版：</div>
        <owl-input
          border
          class="input3-csm"
          placeholder="请输入您的手机号"
          v-model="borderInput4"
          :rule="validate"
        />
      </div>
    </owl-code-example>
    <h3>Slots</h3>
    <owl-code-example :code="code4">
      <div class="input-account-wrap">
        <div class="input-account">
          <div class="title">前缀插槽</div>
          <owl-input placeholder="请输入账号" v-model="userVal">
            <template slot="prefix"><span class="owlfont owl-user" style="font-size: 16px;"></span></template>
          </owl-input>
          <owl-input placeholder="请输入密码" v-model="passwordVal" type="password">
            <template slot="prefix"><span class="owlfont owl-mima" style="font-size: 16px;"></span></template>
          </owl-input>
        </div>
        <div class="input-account">
          <div class="title">后缀插槽</div>
          <owl-input border placeholder="请输入关键字" v-model="searchVal">
            <template slot="suffix"><span class="owlfont owl-search suffix-icon"></span></template>
          </owl-input>
        </div>
      </div>
    </owl-code-example>
    <h3>属性</h3>
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
      userVal: '',
      passwordVal: '',
      searchVal: '',
      borderInput1: '',
      borderInput2: '',
      borderInput3: '',
      borderInput4: '',
      
      inputNum: '',
      propsCol: [
        {title: '名称', key: 'name', width: '180px'},
        {title: '类型', key: 'types'},
        {title: '默认', key: 'default'},
        {title: '说明', key: 'introduce'},
      ],
      propsData: [
        {name: 'value/v-model', types: 'string', default: '', introduce: '输入框的值，必填'},
        {name: 'type', types: '"text"|"password"|"number"', default:'text', introduce: '输入框的类型'},
        {name: 'border', types: 'boolean', default:'false', introduce: '是否是border框，默认是下划线'},
        {name: 'size', types: '"large"|"default"|"small"', default:'default', introduce: 'border框类型的输入框尺寸'},
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
    <div class="subt">Default版：</div>
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
  <div class="input1">
    <div class="subt">Border版：</div>
    <owl-input
      border
      class="input1-csm"
      size="large"
      placeholder="大输入框"
      v-model="borderInput1"
    />
    <owl-input
      border
      class="input1-csm"
      placeholder="中输入框"
      v-model="borderInput2"
    />
    <owl-input
      border
      size="small"
      class="input1-csm"
      placeholder="小输入框"
      v-model="borderInput3"
    />
  </div>
&lt;/template&gt;
`,
      code2:`&lt;template&gt;
  <p class="subtitle">密码：</p>
  <owl-input
    class="input2-csm"
    type="password"
    placeholder="请输入您的密码"
    v-model="input3"
  />
  <p class="subtitle">数字：</p>
  <owl-input
    class="input2-csm"
    type="number"
    placeholder="请输入您的年龄"
    v-model="inputNum"
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
`,
      code4: `&lt;template&gt;
  <div class="input-account-wrap">
    <div class="input-account">
      <div class="title">前缀插槽</div>
      <owl-input placeholder="请输入账号" v-model="userVal">
        <template slot="prefix">
          <span class="owlfont owl-user" style="font-size: 16px;"></span>
        </template>
      </owl-input>
      <owl-input placeholder="请输入密码" v-model="passwordVal" type="password">
        <template slot="prefix">
          <span class="owlfont owl-mima" style="font-size: 16px;"></span>
        </template>
      </owl-input>
    </div>
    <div class="input-account">
      <div class="title">后缀插槽</div>
      <owl-input  placeholder="请输入关键字" v-model="searchVal">
        <template slot="suffix">
          <span class="owlfont owl-search"></span>
        </template>
      </owl-input>
    </div>
  </div>
&lt;/template&gt;
`,
      codeNumber: ``
    }
  }
}
</script>
<style lang="less">
.input1{
  width: 380px;
  border: 1px solid #e1e1e1;
  padding: 20px;
  height: 200px;
  display: inline-block;
  margin-right: 12px;
  vertical-align: top;
  .subt{
    color: #999;
    font-size: 14px;
  }
  &:last-child{
    margin-right: 0;
  }
  .owl-input.border{
    margin: 12px 0;
  }
}
.input2{
  display: inline-block;
  vertical-align: top;
  margin-right: 12px;
  &:last-child{
    margin-right: 0;
  }
  .subt{
    color: #999;
    font-size: 14px;
    margin-bottom: 12px;
  }
}
.input2-csm{
  width: 280px;
}
.input3-csm{
  width: 280px;
  display: inline-block;
  margin-right: 12px;
  vertical-align: top;
}
.input-account-wrap{
  display: flex;
}
.input-account{
  width: 380px;
  .title{
    font-size: 14px;
    color: #999;
    margin-bottom: 12px;
  }
  &:last-child{
    margin-left: 24px;
  }
}
</style>