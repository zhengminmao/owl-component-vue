import './style/index.less'

export default {
  name: 'owlSlide',
  model: {
    prop: 'value',
    event: 'changed'
  },
  props:{
    options: Array,
    width: {
      type: [Number, String],
      default: '100%'
    }, 
    value: Number, //0~100
  },
  data(){
    return {
      translateX: 0,
      startX: 0,
      moveX: 0,
      moveActive: false,
      wrapWidth: 0,
    }
  },
  computed:{
    btnX(){
      let x = this.translateX+this.moveX;
      if(x== 0){
        return 5
      } else if( x == this.wrapWidth){
        return x - 5
      } else {
        return x
      }
    },
    marks(){
      let arr = new Array(11).fill(0)
      if(this.options && this.options.length > 1){
        const first = this.options[0].value;
        const last = this.options[this.options.length - 1].value;
        const dis = (last - first) / 10;
        return arr.map((_,index)=>{
          return first + Number((index * dis).toFixed(1))
        })
      } else {
        return arr.map((_,index)=>index)
      }
    },
    domWidth(){
      if(typeof this.width === 'number'){
        return this.width + 'px'
      }
      return this.width
    }
  },
  mounted(){
    this.getWrapWidth()
    this.translateX = this.value2px(this.value);
  },
  watch: {
    value(newVal){
      this.$nextTick(()=>{
        this.translateX = this.value2px(newVal);
      })
    },
    width(){
      this.$nextTick(()=>{
        this.getWrapWidth()
      })
    }
  },
  methods:{
    getWrapWidth(){
      if(typeof this.width === 'number') {
        this.wrapWidth = this.width;
      } else if(this.width.indexOf('px') >= 0){
        this.wrapWidth = this.width.replace('px','');
      } else if(this.$refs.slidebox) {
        this.wrapWidth = this.$refs.slidebox.clientWidth;
      }
    },
    onMouseDown(e){
      e.stopPropagation();
      this.moveActive = true;
      this.startX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
      if(e.clientX != undefined){
        document.body.addEventListener('mouseup', this.onMouseEnd)
        document.body.addEventListener('mousemove', this.onMouseMove)
      }
      if(e.changedTouches){
        document.body.addEventListener('touchend', this.onMouseEnd)
        document.body.addEventListener('touchmove', this.onMouseMove)
      }
    },
    onMouseMove(e){
      e.preventDefault();
      if(!this.moveActive) return;
      let moveX = (e.clientX || (e.changedTouches && e.changedTouches[0].clientX)) - this.startX;
      if((moveX + this.translateX) <= 0){
        return;
      }
      if((moveX + this.translateX) > this.wrapWidth){
        return;
      }
      this.moveX = moveX;
    },
    onMouseEnd(e){
      e.preventDefault();
      if(!this.moveActive) return;
      this.moveActive = false;
      this.translateX += this.moveX;
      this.startX = 0;
      this.moveX = 0;
      this.$emit('changed', this.px2Value(this.translateX))
      if(e.clientX != undefined){
        document.body.removeEventListener('mouseup', this.onMouseEnd)
        document.body.removeEventListener('mousemove', this.onMouseMove)
      }
      if(e.changedTouches){
        document.body.addEventListener('touchend', this.onMouseEnd)
        document.body.addEventListener('touchmove', this.onMouseMove)
      }
    },
    onClickSlide(e){
      let x = e.offsetX;
      if (x) {
        this.translateX = x;
        this.$emit('changed', this.px2Value(this.translateX));
      }
    },
    /* px:number */
    px2Value(px){
      return this.marks[Math.round(px / (this.wrapWidth / 10))];
    },
    /* value:number */
    value2px(value){
      const index =  this.marks.indexOf(value) 
      return (index >= 0 ? index : 0) * (this.wrapWidth/10)
    }
  },
  render(h){
    let children = [];
    if(this.options && this.options.length){
      const slideTips = h('div', {class: 'slide-tip'}, this.options.map((item, key)=>
        h('span', {key, class: ['tip', item.value == this.value && 'active']}, item.label)
      ))
      children.push(slideTips)
    }
    const slideBox = h('div', {
      class: 'slide-box',
      ref: 'slidebox',
      on: {
        '~touchmove': this.onMouseMove,
        'click': this.onClickSlide
      }
    }, [
      h('div', {class: 'slide-active', style: {width: this.translateX+this.moveX+'px'}}),
      h('div', {
        class: 'circle-btn', 
        style: `transform: translate3d(${this.btnX}px, 0, 0)`,
        on: {
          'click':(e)=> e.stopPropagation(),
          '~touchstart': this.onMouseDown,
          'mousedown': this.onMouseDown
        }
      })
    ])
    children.push(slideBox)
    return h('div', {class: 'owl-slide', style: {width: this.domWidth}}, children)
  }
}