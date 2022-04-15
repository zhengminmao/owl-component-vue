import './codeExample.less'


export default {
  props:{
    code: String,
    introduce: {
      default: '',
      type: String,
    }
  },
  data(){
    return {
      showCode: false,
      codeHeight: 0,
    }
  },
  computed:{
    highlightedCode(){
      if(!this.code) return '';
      let cpCode = this.code.replace(/\&lt;/g, '<').replace(/\&gt;/g, '>')
      return this.$hljs.highlight(cpCode, {language: 'javascript'}).value
    },
    currentCodeHeight(){
      if(!this.showCode) return 0;
      return this.codeHeight;
    },
  },
  mounted(){
    this.$nextTick(()=>{
      this.codeHeight = this.$refs.codeDom.clientHeight
    })
  },
  methods:{
    copySucc(){
      if(navigator.clipboard !== undefined){
        navigator.clipboard.writeText(this.code.replace(/&lt;/g, '<').replace(/&gt;/g, '>'))
        this.$message.success('复制成功')
      } else {
        this.$message.error('当前浏览器不支持复制')
      }
      
    }
  },
  render(h){
    return h(
      'div', {class: 'owl-example'}, [
        h('div', {class: 'sample'}, this.$slots.default),
        this.$slots.introduce || this.introduce ? 
          h('div', {class: 'introduce'}, this.$slots.introduce || this.introduce)
          : null,
        h('div', {class: 'code-wrap', style:{height: this.currentCodeHeight+'px'}}, [
          h('span', {class: 'owlfont owl-copy', on: {click: this.copySucc}}),
          h('code', {class: 'owl-code', ref:'codeDom', domProps: {innerHTML: this.highlightedCode}},),
        ]),
        h(
          'div', 
          {
            class: ['owl-arrow-wrap', this.showCode && 'active'],
            on: {
              click:()=>(this.showCode = !this.showCode)
            }
          }, 
          [ h('span', {class: 'arrow'}), !this.showCode? '显示代码': '隐藏代码' ],
        ),
      ]
    ) 
  }
}