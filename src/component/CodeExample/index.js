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
  mounted(){
    if(!this.code) return;
    let cpCode = this.code.replace(/\&lt;/g, '<').replace(/\&gt;/g, '>')
    const highlightedCode = hljs.highlight(cpCode, {language: 'javascript'}).value
    this.$refs.codeDom.innerHTML =  highlightedCode
  },
  render(h){
    return h(
      'div', {class: 'owl-example'}, [
        h('div', {class: 'sample'}, this.$slots.default),
        this.$slots.introduce || this.introduce ? 
          h('div', {class: 'introduce'}, this.$slots.introduce || this.introduce)
          : null,
        h('code', {class: 'owl-code', ref: 'codeDom'},),
      ]
    ) 
  }
}