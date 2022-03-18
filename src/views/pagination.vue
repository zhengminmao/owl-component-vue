<template>
  <div>
    <h2>Pagination 分页</h2>
    <h3>基本用法</h3>
    <owl-code-example :code="code1">
      <owl-pagination 
        :totalResult="totalResult" 
        :showCount="showCount" 
        :currentPage="currentPage" 
        @change="val=>currentPage = val"
      />
    </owl-code-example>
    <h3>属性</h3>
    <owl-table :data="list" :columns="columns" />
    <h3>事件</h3>
    <owl-table :data="list1" :columns="columns" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      totalResult: 50,
      showCount: 5,
      currentPage: 1,
      columns: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '默认值', key: 'default'},
        {title: '说明', key: 'introduce'},
      ],
      list: [
        {name: 'totalResult', types: 'boolean', default: 'false', introduce: '数据总共多少条'},
        {name: 'showCount', types: 'boolean', default: 'true', introduce: '一页显示多少数据'},
        {name: 'currentPage', types: 'boolean', default: 'true', introduce: '当前的页数'},
      ],
      list1: [
        {name: 'change', types: '(val: number) => void', default: '', introduce: '当前页数发生改变'},
      ],
      code1: `&lt;template&gt;
  <owl-pagination 
    :totalResult="totalResult" 
    :showCount="showCount" 
    :currentPage="currentPage" 
    @change="val=>currentPage = val"
  />
&lt;/template&gt;

&lt;script&gt;
  export default {
    data(){
      return {
        totalResult:50,
        showCount: 5,
        currentPage: 1,
      }
    }
  }
&lt;/script&gt;
      `
    }
  }
}
</script>