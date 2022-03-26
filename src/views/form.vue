<template>
  <div>
    <h2>Form 表单</h2>
    <h3>基本用法</h3>
    <owl-code-example :code="code">
      <owl-form :model="form" width="60%" size="large">
        <owl-form-item prop="name" label="您的姓名:">
          <owl-input border v-model="form.name"></owl-input>
        </owl-form-item>
        <owl-form-item prop="email" label="邮件:">
          <owl-input border v-model="form.email"></owl-input>
        </owl-form-item>
        <owl-form-item prop="phone" label="手机号:">
          <owl-input border></owl-input>
        </owl-form-item>
        <owl-form-item prop="phone" label="生日:">
          <owl-date v-model="form.birthday" placeholder="请选择生日"></owl-date>
        </owl-form-item>
        <owl-form-item prop="phone" label="出生地:">
          <owl-select 
            v-model="form.country" 
            placeholder="请选择地址"
            :list="[
              {label: '湖南', value: '湖南'},
              {label: '湖北', value: '湖北'},
              {label: '广东', value: '广东'},
            ]"
          ></owl-select>
        </owl-form-item>
        <owl-form-item prop="gender" label="性别:">
          <owl-radio-group v-model="form.gender">
            <owl-radio :value="0">女</owl-radio>
            <owl-radio :value="1">男</owl-radio>
          </owl-radio-group>
        </owl-form-item>
        <owl-form-item prop="area" label="升学目的国家/地区:">
          <owl-checkbox-group v-model="form.aim">
            <owl-checkbox value="uk">英国</owl-checkbox>
            <owl-checkbox value="us">美国</owl-checkbox>
            <owl-checkbox value="au">澳大利亚</owl-checkbox>
            <owl-checkbox value="ca">加拿大</owl-checkbox>
            <owl-checkbox value="hk">香港</owl-checkbox>
          </owl-checkbox-group>
        </owl-form-item>
        <owl-form-item label="教学环境:">
          <owl-slide v-model="form.teach" :width="400"/>
        </owl-form-item>
        <owl-form-item label="安全指数:">
          <owl-slide v-model="form.safe" :width="400"/>
        </owl-form-item>
        <owl-form-item label="生活舒适:">
          <owl-slide v-model="form.life" :width="400"/>
        </owl-form-item>
        <owl-form-item>
          <owl-button>确定</owl-button>
          <owl-button type="success" plain>重置</owl-button>
        </owl-form-item>
      </owl-form>
    </owl-code-example>
    <h3>内联</h3>
    <owl-code-example :code="code1">
      <owl-form :model="form1" inline label-position="right">
        <owl-form-item prop="name" label="您的姓名:">
          <owl-input border v-model="form.name"></owl-input>
        </owl-form-item>
        <owl-form-item prop="email" label="邮件:">
          <owl-input border v-model="form.email"></owl-input>
        </owl-form-item>
          <owl-button>确定</owl-button>
      </owl-form>
    </owl-code-example>
    <h3>验证</h3>
    <owl-code-example :code="code2">
      <owl-form :model="form2" label-position="right" ref="form2">
        <owl-form-item prop="account" label="账号:" :rule="[
          {required: true},
          {validator: (val)=> {
            return /^\d+$/.test(val)? true: false;
          }, tip: '账号必须是数字'}
        ]">
          <owl-input border v-model="form2.account"></owl-input>
        </owl-form-item>
        <owl-form-item prop="password" label="密码:" :rule="[
          {required: true},
          {validator: (val)=> {
            return val.length < 6? false: true;
          }, tip: '密码长度不能小于6'}
        ]">
          <owl-input border v-model="form2.password"></owl-input>
        </owl-form-item>
        <owl-form-item>
          <owl-button @click="login">登录</owl-button>
          <owl-button @click="clearform2" plain>清空</owl-button>
        </owl-form-item>
      </owl-form>
    </owl-code-example>
    <h3>Form 属性</h3>
    <owl-table :data="list" :columns="columns"></owl-table>
    <h3>FormItem 属性</h3>
    <owl-table :data="list1" :columns="columns"></owl-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        gender: 0,
        aim: [],
        teach: 0,
        safe: 0,
        life: 0,
        birthday: '',
        country: '',
      },
      form1: {
        name: '',
        email: '',
      },
      form2: {
        account: '',
        pwd: '',
      },
      columns: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '默认值', key: 'default'},
        {title: '说明', key: 'introduce'},
      ],
      list: [
        {name: 'model', default: '', types: 'Object', introduce: '表单的值'},
        {name: 'labelPosition', types: '"left"|"top"|"right"', default:'left', introduce: '显示文本的位置'},
        {name: 'inline', types: 'boolean', default:'false', introduce: '是否内联'},
        {name: 'width', types: 'string', default:'100%', introduce: '表单宽度'},
        {name: 'size', types: '"large"|"default"|"small"', default:'default', introduce: '尺寸'},
      ],
      list1: [
        {name: 'label', default: '', types: 'string', introduce: '表单标题'},
        {name: 'prop', types: 'string', default:'', introduce: '表单检验的值'},
        {name: 'labelWidth', types: 'string | number', default:'', introduce: '文本宽度'},
        {name: 'rule', types: '{required: boolean, validator(str)=> boolean, tip: string}[]', default:'[]', introduce: '检验规则'},
      ],
      code: `&lt;template&gt;
  <owl-form :model="form" width="60%" size="large">
    <owl-form-item prop="name" label="您的姓名:">
      <owl-input border v-model="form.name"></owl-input>
    </owl-form-item>
    <owl-form-item prop="email" label="邮件:">
      <owl-input border v-model="form.email"></owl-input>
    </owl-form-item>
    <owl-form-item prop="phone" label="手机号:">
      <owl-input border></owl-input>
    </owl-form-item>
    <owl-form-item prop="phone" label="生日:">
      <owl-date v-model="form.birthday" placeholder="请选择生日"></owl-date>
    </owl-form-item>
    <owl-form-item prop="phone" label="出生地:">
      <owl-select 
        v-model="form.country" 
        placeholder="请选择地址"
        :list="[
          {label: '湖南', value: '湖南'},
          {label: '湖北', value: '湖北'},
          {label: '广东', value: '广东'},
        ]"
      ></owl-select>
    </owl-form-item>
    <owl-form-item prop="gender" label="性别:">
      <owl-radio-group v-model="form.gender">
        <owl-radio :value="0">女</owl-radio>
        <owl-radio :value="1">男</owl-radio>
      </owl-radio-group>
    </owl-form-item>
    <owl-form-item prop="area" label="升学目的国家/地区:">
      <owl-checkbox-group v-model="form.aim">
        <owl-checkbox value="uk">英国</owl-checkbox>
        <owl-checkbox value="us">美国</owl-checkbox>
        <owl-checkbox value="au">澳大利亚</owl-checkbox>
        <owl-checkbox value="au">加拿大</owl-checkbox>
        <owl-checkbox value="hk">香港</owl-checkbox>
      </owl-checkbox-group>
    </owl-form-item>
    <owl-form-item label="教学环境:">
      <owl-slide v-model="form.teach" :width="400"/>
    </owl-form-item>
    <owl-form-item label="安全指数:">
      <owl-slide v-model="form.safe" :width="400"/>
    </owl-form-item>
    <owl-form-item label="生活舒适:">
      <owl-slide v-model="form.life" :width="400"/>
    </owl-form-item>
    <owl-form-item>
      <owl-button>确定</owl-button>
      <owl-button type="success" plain>重置</owl-button>
    </owl-form-item>
  </owl-form>
&lt;/template&gt;

&lt;script&gt;
  export default {
    data(){
      return {
        form: {
          name: '',
          email: '',
          phone: '',
          gender: 0,
          aim: [],
          teach: 0,
          safe: 0,
          life: 0,
          birthday: '',
          country: '',
        },
      }
    }
  }
&lt;/script&gt;`,
      code1: `&lt;template&gt;
  <owl-form :model="form1" inline label-position="right">
    <owl-form-item prop="name" label="您的姓名:">
      <owl-input border v-model="form.name"></owl-input>
    </owl-form-item>
    <owl-form-item prop="email" label="邮件:">
      <owl-input border v-model="form.email"></owl-input>
    </owl-form-item>
      <owl-button>确定</owl-button>
  </owl-form>
&lt;/template&gt;
      `,
      code2: `&lt;template&gt;
  <owl-form :model="form2" label-position="right" ref="form2">
    <owl-form-item prop="account" label="账号:" :rule="[
      {required: true},
      {validator: (val)=> {
        return /^\d+$/.test(val)? true: false;
      }, tip: '账号必须是数字'}
    ]">
      <owl-input border v-model="form2.account"></owl-input>
    </owl-form-item>
    <owl-form-item prop="password" label="密码:" :rule="[
      {required: true},
      {validator: (val)=> {
        return val.length < 6? false: true;
      }, tip: '密码长度不能小于6'}
    ]">
      <owl-input border v-model="form2.password"></owl-input>
    </owl-form-item>
    <owl-form-item>
      <owl-button @click="login">登录</owl-button>
      <owl-button @click="clearform2" plain>清空</owl-button>
    </owl-form-item>
  </owl-form>
&lt;/template&gt;

&lt;script&gt;
  export default {
    data(){
      return {
        form2: {
          account: '',
          pwd: '',
        },
      }
    },
    methods: {
      login(){
        this.$refs.form2.validate((ret)=>{
          console.log(ret)
        })
      },
      clearform2(){
        this.$refs.form2.clearValidate();
        this.form2 = {
          account: '',
          pwd: '',
        }
      }
    }
  }
&lt;/script&gt;
`
    }
  },
  methods: {
    login(){
      this.$refs.form2.validate((ret)=>{
        console.log(ret)
      })
    },
    clearform2(){
      this.$refs.form2.clearValidate();
      this.form2 = {
        account: '',
        pwd: '',
      }
    }
  }
}
</script>
<style lang="less">
.slide-wrap{
  display: flex;
  align-items: center;
  .t{
    color: #999;
    font-size: 14px;
    padding-right: 12px;
    width: 80px;
    padding: 0 12px;
  }
}
</style>