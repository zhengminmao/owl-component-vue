import { OwlSelectCover } from '../select/Select'
import './style/index.less'
import { getOffset } from '../_util'
export default {
  name: 'owlPopover',
  components:{
    OwlSelectCover,
  },
  props: {
    trigger: {
      default: 'click',
      validator(val){
        return ['click','hover'].indexOf(val) !== -1;
      }
    },
    textArrow: Boolean, 
    coverArrow: Boolean,
  },
  data(){
    return {
      visible: false,
      left: 0,
      top: 0,
      time: '',
    }
  },
  mounted(){
    const dom = this.$refs.owlPopoverRef;
    const offset = getOffset(dom)
    this.left = offset.offsetLeft;
    this.top = dom.clientHeight + offset.offsetTop + 8
  },
  methods: {
    hoverChange(val){
      if(this.trigger !== 'hover') return;
      this.time && clearTimeout(this.time)
      if(val){
        this.visible = val;
      } else {
        this.time = setTimeout(()=>{
          window.requestAnimationFrame(()=>{
            this.visible = val;
          })
        },300)
      }
    }
  },
  render(h){
    const wrapDom = h('div', {
      on: {
        click:(e)=>{e.stopPropagation(); this.visible = false;},
        '!mouseenter': ()=>this.hoverChange(true),
        '!mouseout': ()=>this.hoverChange(false)
      },
      class: 'owl-popover-cover-box',
      style: {
        left: this.left + 'px',
        top: this.top + 'px'
      }
    },[
      this.coverArrow ? h('span', {class: 'arrow'}): '',
      h('div', {class: '--propover-cover-wrap'}, this.$slots.cover)
    ])
    return h('div', {class: 'owl-popover'}, [
      h('owl-select-cover',{ 
        props: {visible: this.visible},
        on: {
          change: (val)=>(this.visible = val)
        },
      }, [wrapDom]),
      h('div',{
        class: 'owl-popover-content',
        ref: 'owlPopoverRef',
        on: {
          'click': (e)=>{e.stopPropagation(); this.trigger ==='click'&& (this.visible = !this.visible)},
          '!mouseenter': ()=>this.hoverChange(true),
          '!mouseout': ()=>this.hoverChange(false)
        },
      },[
        this.$slots.default,
        this.textArrow ? h('span', {class: ['owlfont owl-arrow-xia --popover-content-arrow', this.visible && 'active']}) : ''
      ])
    ])
  }
}