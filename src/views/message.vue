<template>
  <div>
    <h2>Message 消息</h2>
    <h3>基本用法</h3>
    <owl-code-example :code="code1">
      <owl-button @click="showMessage('info')">弹出info消息</owl-button>
      <br/><br/>
      <owl-button @click="showMessage('success')" type="success">弹出success消息</owl-button>
      <br/><br/>
      <owl-button @click="showMessage('error')" type="error">弹出error消息</owl-button>
      <br/><br/>
      <owl-button @click="showMessage('loading')">弹出loading消息</owl-button>
    </owl-code-example>
    <h3>自定义关闭时间</h3>
    <owl-code-example :code="code2">
      <owl-button @click="showMessage1" search :loading="loading">搜索</owl-button>
    </owl-code-example>
    <h3>快捷指令</h3>
    <p>可以使用以下快捷指令打开相对应的消息类型。当参数有三个时，分别时内容，key和时间，如果是两个则是内容和时间</p>
    <code>this.$message.success(content, key, duration)<br/>this.$message.info(content, key, duration)<br/>this.$message.error(content, key, duration)<br/>this.$message.loading(content, key, duration)</code>
    <h3>属性</h3>
    <owl-table :data="list" :columns="columns" />
  </div>
</template>
<script>
export default {
  data(){
    return {
      loading: false,
      code1: `&lt;template&gt;
  <owl-button @click="showMessage('info')">弹出info消息</owl-button>
  <br/><br/>
  <owl-button @click="showMessage('success')" type="success">弹出success消息</owl-button>
  <br/><br/>
  <owl-button @click="showMessage('error')" type="error">弹出error消息</owl-button>
  <br/><br/>
  <owl-button @click="showMessage('loading')">弹出loading消息</owl-button>
&lt;/template&gt;
&lt;script&gt;
  export default {
    methods:{
      showMessage(type){
        this.$message({
          type,
          content: \`这是一条\${type}消息\`
        })
      },
    }
  }
&lt;/script&gt;`,
      code2:`&lt;template&gt;
  <owl-button @click="showMessage1" search :loading="loading">搜索</owl-button>
&lt;/template&gt;
&lt;script&gt;
  export default {
    data(){
      return {
        loading: false
      }
    },
    methods:{
      showMessage1(){
        this.$message({
          type: 'loading',
          content: '数据加载中...',
          duration: 0,
        }).then(res=>{
          this.loading = true;
          setTimeout(()=>{
            this.loading = false;
            res()
          }, 4500)
        })
      }
    }
  }
&lt;/script&gt; `,
      columns: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '默认值', key: 'default'},
        {title: '说明', key: 'introduce'},
      ],
      list: [
        {name: 'params.key', types: 'string', default:'Date.now()', introduce: '消息key'},
        {name: 'params.type', types: 'info|error|success|loading', default: 'info', introduce: '消息类型'},
        {name: 'params.content', types: 'string', introduce: '内容'},
        {name: 'params.duration', types: 'number', default: '2000', introduce: '消息存在时间，单位毫秒'},
      ],
    }
  },
  methods: {
    showMessage(type){
      this.$message({
        type,
        content: `这是一条${type}消息`
      })
    },
    showMessage1(){
      this.$message({
        type: 'loading',
        content: '数据加载中...',
        duration: 0,
      }).then(res=>{
        this.loading = true;
        setTimeout(()=>{
          this.loading = false;
          res()
        }, 4500)
      })
    }
  }
}
</script>