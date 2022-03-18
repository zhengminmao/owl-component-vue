<template>
  <div>
    <h2>Button 按钮</h2>
    <h3>基本用法</h3>
    <owl-code-example :code="code1">
      <p>三种尺寸</p>
      <div style="font-size: 0">
        <owl-button size="small">确定</owl-button>
        <owl-button size="default">确定</owl-button>
        <owl-button size="large">确定</owl-button>
      </div>
      <p>三种颜色</p>
      <div style="font-size: 0">
        <owl-button type="primary">确定</owl-button>
        <owl-button type="success">确定</owl-button>
        <owl-button type="error" >确定</owl-button>
      </div>
      <p>简易</p>
      <div style="font-size: 0">
        <owl-button type="primary" plain>确定</owl-button>
        <owl-button type="success" plain>确定</owl-button>
        <owl-button type="error" plain>确定</owl-button>
      </div>
    </owl-code-example>
    <h3>图标后缀</h3>
    <owl-code-example :code="code2">
      <owl-button search :loading="loading" @click="search">查询</owl-button>
      <br/>
      <br/>
      <owl-button >
        <span>新增人员</span>
        <span class="suffix-icon owlfont owl-user" slot="suffix-icon"></span>
      </owl-button>
    </owl-code-example>
    <h3>属性</h3>
    <owl-table :data="propsData" :columns="propsCol" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      loading: false,
      propsCol: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '默认', key: 'default'},
        {title: '说明', key: 'introduce'},
      ],
      propsData: [
        {name: 'loading', types: 'boolean', default: 'false', introduce: '显示loading，如果有slot图标优先级是slot'},
        {name: 'search', types: 'boolean', default: 'false', introduce: '显示查询图标，如果loading为true默认则显示loading'},
        {name: 'type', types: '"primary"|"success"|"error"', default: 'primary', introduce: '颜色'},
        {name: 'plain', types: 'boolean', default: 'false', introduce: '是否为简易版'},
        {name: 'size', types: '"large"|"small"|"default"', default: 'default', introduce: '尺寸'},
      ],
      code1:`&lt;template&gt;
  <p>三种尺寸</p>
  <div>
    <owl-button size="small">确定</owl-button>
    <owl-button size="default">确定</owl-button>
    <owl-button size="large">确定</owl-button>
  </div>
  <p>三种颜色</p>
  <div>
    <owl-button type="primary">确定</owl-button>
    <owl-button type="success">确定</owl-button>
    <owl-button type="error" >确定</owl-button>
  </div>
  <p>简易</p>
  <div>
    <owl-button type="primary" plain>确定</owl-button>
    <owl-button type="success" plain>确定</owl-button>
    <owl-button type="error" plain>确定</owl-button>
  </div>
&lt;/template&gt;`,
      code2:`&lt;template&gt;
  <owl-button search :loading="loading" @click="search">查询</owl-button>
  <br/>
  <br/>
  <owl-button @click="search">
    <span>新增人员</span>
    <span class="suffix-icon owlfont owl-user" slot="suffix-icon"></span>
  </owl-button>
&lt;/template&gt;`
    }
  },
  methods: {
    search(){
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
      },1000)
    }
  }
}
</script>
<style lang="less">

</style>