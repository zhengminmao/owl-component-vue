import './style/index.less'
import { throttleFunc } from '../_util/index'
export default {
  name: 'OwlAffix',
  props: {
    offsetBottom: {
      required: false,
      type: Number,
    },
    offsetTop: {
      required: false,
      type: Number,
    },
    target: {
      required: false,
      type: Function,
      default: ()=>{
        return window
      }
    },
  },
  data(){
    return {
      resizeObserver: undefined,
      domOffsetTop: 0,
      style: {},
    }
  },
  mounted(){
    const childDom = this.$refs.affixWrap
    this.domOffsetTop = childDom.offsetTop;
    this.resizeObserver = new ResizeObserver(this.ResizeObserverCall)
    this.resizeObserver.observe(childDom)
    const scrollDom = this.target();
    this.onScroll = throttleFunc(this.onScroll);
    this.getPosition = throttleFunc(this.getPosition)
    scrollDom.addEventListener('scroll', this.onScroll)
    scrollDom.addEventListener('resize', this.onScroll)
  },
  beforeDestroy(){
    this.resizeObserver && this.resizeObserver.disconnect();
    this.target().removeEventListener('scroll', this.onScroll)
    this.target().removeEventListener('resize', this.onScroll)
  },
  methods:{
    onScroll(){
      this.getPosition()
    },
    getPosition(){
      const clientRect = this.$refs.affixWrap.getBoundingClientRect();
      let style = {
        position: '', 
        top: '', 
        bottom: '', 
        width: clientRect.width, 
        height: clientRect.height
      };
      const scrollDom = this.target() === window? window.document.scrollingElement: this.target();
      const scrollTop = scrollDom.scrollTop
      if(this.offsetTop !== undefined){
        if( this.offsetTop >= clientRect.top && scrollTop + this.offsetTop >= this.domOffsetTop ) {
          style = {
            position: 'fixed', 
            top: this.offsetTop, 
            width: clientRect.width, 
            height: clientRect.height
          }
        }
      } else if(this.offsetBottom !== undefined){
        if( scrollTop + scrollDom.clientHeight <= this.domOffsetTop + this.offsetBottom + clientRect.height){
          style = {
            position: 'fixed', 
            bottom: this.offsetBottom, 
            width: clientRect.width, 
            height: clientRect.height
          }
        }
      } 
      if(JSON.stringify(this.style) !== JSON.stringify(style)) {
        this.style = style;
      }
    },
    ResizeObserverCall(entires){
      if(entires && entires.length) {
        if(!!Object.keys(this.style).length){
          this.style.height = entires[0].contentRect.height;
          this.style.width = entires[0].contentRect.width;
        } else {
          this.style = {
            height: entires[0].contentRect.height,
            width: entires[0].contentRect.width,
            position: '',
            top: '',
            bottom: ''
          }
        }
      }
    }
  },
  render(h){
    const domStyle = this.style.position === 'fixed'? {
      width: this.style.width && this.style.width + 'px',
      height: this.style.height && this.style.height + 'px' 
    }:''
    const wrapStyle = {
      width: this.style.width && this.style.width + 'px',
      height: this.style.height && this.style.height + 'px',
      top: this.style.top && this.style.top + 'px',
      bottom: this.style.bottom && this.style.bottom + 'px',
      position: this.style.position
    }
    return h('div', {class: 'owl-affix', style: domStyle}, [
      h('div', {
        ref: 'affixWrap', 
        class: 'owl-affix-wrap',
        style: wrapStyle
      }, [
        this.$slots.default
      ])
    ])
  }
}