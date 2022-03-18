<template functional>
  <div class="label-page">
    <h2>Label 文本</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="code1">
      <owl-label
        height="42px"
        label="这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本"
        ellipsis-bgm-color="#fff"
      />
    </owl-code-example>

    <h3>省略号颜色和背景</h3>
    <owl-code-example :code="code2">
      <div class="label2">
        <owl-label 
          height="42px"
          label="这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本"
          ellipsis-color="var(--owl-success-color)"
          ellipsis-bgm-color="#f7e8e8"
        />
      </div>
    </owl-code-example>
    <h3>属性</h3>
    <owl-table :data="list" :columns="columns" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      columns: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '说明', key: 'introduce'},
      ],
      list: [
        {name: 'height', types: 'string', introduce: '文本的高度。如果文本超出高度会省略'},
        {name: 'label', types: 'string', introduce: '文本'},
        {name: 'ellipsisColor', types: 'string', introduce: '省略的颜色'},
        {name: 'ellipsisBgmColor', types: 'string', introduce: '省略蒙层的背景色，从左到右是透明到蒙层背景色'},
      ],
      code1:`&lt;template&gt;
  &lt;owl-label 
    height="42px" 
    label="这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本" 
    ellipsis-bgm-color="#fff"
  /&gt;
&lt;/template&gt;    
      `,
      code2:`&lt;style&gt;
.label1{
  background-color: #f7e8e8;
  padding: 20px;
}
.label1 .owl-label{
  color: var(--owl-primary-color);
}
&lt;/style&gt;
&lt;template&gt;
  &lt;div class="label1"&gt;
    &lt;owl-label 
      height="42px" 
      label="这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本" 
      ellipsis-bgm-color="#fff"
      ellipsis-color="#f7e8e8"
    /&gt;
  &lt;/div&gt;   
&lt;/template&gt;       
`
    }
  }
}
</script>
<style lang="less">
.label-page{
  .label1{
    width: 420px;
    padding: 20px;
    background-color: #fff;
  }
  .label2{
    padding: 20px;
    background-color: #f7e8e8;
    .owl-label{
      color: var(--owl-success-color)
    }
  }
}
</style>
