<template>
  <div class="modal-page">
    <h2>Modal 弹窗</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="code">
      <div class="lookdetail1" @click="visible1 = true">点击查看</div>
    </owl-code-example>
    <h3>使用默认Slot自定义弹窗内容</h3>
    <owl-code-example :code="code">
      <div class="lookdetail1" @click="visible2 = true">点击查看</div>
    </owl-code-example>
    <h3>Props</h3>
    <owl-table :data="list" :columns="columns" />
    <owl-modal :visible.sync="visible1"></owl-modal>
    <owl-modal :visible.sync="visible2">
      <div class="modal-body-custom">自定义内容</div>
    </owl-modal>
  </div>
</template>

<script>
export default {
  data(){
    return {
      visible1: false,
      visible2: false,
      columns: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '默认值', key: 'default'},
        {title: '说明', key: 'introduce'},
      ],
      list: [
        {name: 'visible', types: 'boolean', default: 'false', introduce: '是否显示，支持.sync'},
        {name: 'shrink-menu', types: 'boolean', default: 'true', introduce: '是否显示菜单"减号"'},
        {name: 'middle', types: 'boolean', default: 'true', introduce: '是否居中'},
        {name: 'top', types: 'string', default: '200px', introduce: '如果不居中，则距离顶部200px'},
        {name: 'width', types: 'string', default: '680px', introduce: '是否居中'},
      ],
      code: `&lt;template&gt;
  <owl-modal :visible.sync="visible1">
    <div class="modal-body-custom">自定义内容</div>
  </owl-modal>
&lt;/template&gt;

&lt;script&gt;
  export default {
    data(){
      return {
        visible1: false,
      }
    }
  }
&lt;/script&gt;
`,
      code1:`
&lt;template&gt;
  <owl-modal :visible.sync="visible1">

  </owl-modal>
&lt;/template&gt;
`
    }
  }
}
</script>
<style lang="less">
.modal-page{
  .lookdetail1{
    cursor: pointer;
  }
}
.modal-body-custom{
  padding: 24px;
  text-align: center;
}
</style>