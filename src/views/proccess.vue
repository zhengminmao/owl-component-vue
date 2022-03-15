<template>
  <div class="proccess-page">
    <h2>Proccess 进度条</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="code">
      <div class="proccess-wrap">
        <owl-proccess id="circle1" :proccess="25" color="#FFAB30" subColor="#FF4D35" label="今日任务" />
        <owl-proccess id="circle1" :proccess="50" color="#FFAB30" subColor="#FF4D35" label="今日任务1" />
        <owl-proccess id="circle1" :proccess="75" color="#FFAB30" subColor="#FF4D35" label="今日任务2" />
        <owl-proccess id="circle1" :proccess="100" color="#FFAB30" subColor="#FF4D35" label="今日任务3" />
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
      code: `&lt;template&gt;
  <div class="proccess-wrap">
    <owl-proccess id="circle1" :proccess="25" color="#FFAB30" subColor="#FF4D35" label="今日任务" />
    <owl-proccess id="circle1" :proccess="50" color="#FFAB30" subColor="#FF4D35" label="今日任务1" />
    <owl-proccess id="circle1" :proccess="75" color="#FFAB30" subColor="#FF4D35" label="今日任务2" />
    <owl-proccess id="circle1" :proccess="100" color="#FFAB30" subColor="#FF4D35" label="今日任务3" />
  </div>  
&lt;/template&gt;
`,
      columns: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '说明', key: 'introduce'},
      ],
      list: [
        {name: 'id', types: 'string', introduce: '唯一标识符'},
        {name: 'proccess', types: 'number', introduce: '当前进度'},
        {name: 'label', types: 'string', introduce: '中间文字显示'},
        {name: 'color', types: 'string', introduce: '主色'},
        {name: 'subColor', types: 'string', introduce: '副色'},
      ],
    }
  }
}
</script>
<style scoped>
.proccess-wrap{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>