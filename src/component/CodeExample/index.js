import './codeExample.less'
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

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
      return hljs.highlight(cpCode, {language: 'javascript'}).value
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
  render(h){
    return h(
      'div', {class: 'owl-example'}, [
        h('div', {class: 'sample'}, this.$slots.default),
        this.$slots.introduce || this.introduce ? 
          h('div', {class: 'introduce'}, this.$slots.introduce || this.introduce)
          : null,
        h('div', {class: 'code-wrap', style:{height: this.currentCodeHeight+'px'}}, [
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