<template>
  <div class="slide-page">
    <h2>Slide 滑块</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="code1">
      <template>
        <p class="subtitle">您需要的校园环境</p>
        <div class="slide">
          <owl-slide v-model="value" :width="400"/>
          <span class="value">{{value}}</span>
        </div>
      </template>
    </owl-code-example>
    <h3>显示文本</h3>
    <owl-code-example :code="code2">
      <template>
        <p class="subtitle">您需要的工作待遇</p>
        <div class="slide2">
          <owl-slide v-model="value2" :width="400" :options="options"/>
          <span class="value">{{value2}}</span>
        </div>
      </template>
    </owl-code-example>
    <h3>属性</h3>
    <owl-table :data="list" :columns="columns" />
  </div>
</template>
<script>
export default {
  data(){
    return {
      value: 0,
      value1: 5,
      value2: 5,
      options: [
        {label: '差', value: 0},
        {label: '较差', value: 1},
        {label: '普通', value: 2},
        {label: '较好', value: 3},
        {label: '好', value: 4},
        {label: '非常好', value: 5},
      ],
      columns: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '说明', key: 'introduce'},
      ],
      list: [
        {name: 'width', types: 'string | number', introduce: 'slide组件宽度默认100%'},
        {name: 'value/v-model', types: 'number', introduce: '当前滑块的值默认取值是value∈[0,10]'},
        {name: 'options', types: 'Array<{label: string, value: number}>', introduce: '显示文本参数option.value的值等于组件的滑块的值高亮'},
      ],
      code1: `&lt;template&gt;
  <div class="slide">
    <owl-slide v-model="value" :width="400"/>
    <span class="value">{{value}}</span>
  </div>
  <div class="slide">
    <owl-slide v-model="value1" :width="320"/>
    <span class="value">{{value1}}</span>
  </div>
&lt;/template&gt;
`,
      code2: `&lt;template&gt;
  <owl-slide v-model="value2" :width="400" :options="options"/>
&lt;/template&gt;
&lt;script&gt;
  export default {
    data(){
      return {
        value2: 5,
        options: [
          {label: '差', value: 0},
          {label: '较差', value: 1},
          {label: '普通', value: 2},
          {label: '较好', value: 3},
          {label: '好', value: 4},
          {label: '非常好', value: 5},
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
<style lang="less" scoped>
.slide-page{
  .slide{
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    &:last-child{
      margin-bottom: 0;
    }
  }
  .value{
    padding-left: 12px;
    font-size: 14px;
  }
  .slide2{
    display: flex;
    align-items: center;
    margin-top: 16px;
  }
}
</style>