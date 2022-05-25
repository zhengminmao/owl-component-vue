import './style/index.less'

export default {
  name: 'OwlTabs',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    list: Array,
    value: [Number, String],
    config: {
      default: ()=>({label: 'label', key: 'key'}),
      require: false,
    },
    type: {
      default: 'line',
      validator: function(val){
        return ['line', 'border'].indexOf(val) !== -1
      }
    }
  },
  data(){
    return {
      line: {
        width: 1,
        left: 0,
      },
      isOverflow: false, // 是否需要滚动
    }
  },
  computed:{
    justify(){
      return this.isOverflow ? 'unset' : 'space-around'
    }
  },
  mounted(){
    this.changeClient()
  },
  watch: {
    list: {
      handler(){
        this.changeClient()
      },
      deep: true
    },
    value(val){
      const wrapDom = this.$refs.wrapDom;
      if(!wrapDom || !wrapDom.children) return;
      const itemDom = wrapDom.querySelector(`#id-${val}`);
      this.line.width = itemDom.clientWidth;
      this.line.left = itemDom.offsetLeft;
      if(this.isOverflow){
        const left = itemDom.offsetLeft - (wrapDom.clientWidth - itemDom.clientWidth) / 2
        wrapDom.scrollTo({
          left,
          behavior: 'smooth'
        })
      }
    }
  },
  methods:{
    changeClient(){
      const wrapDom = this.$refs.wrapDom;
      if(!wrapDom || !wrapDom.children) return;
      const itemDom = wrapDom.querySelector(`#id-${this.value}`);
      if(itemDom) {
        this.line.width = itemDom.clientWidth;
        this.line.left = itemDom.offsetLeft;
      }
      if(wrapDom.scrollWidth > wrapDom.clientWidth){
        this.isOverflow = true
      } else {
        this.isOverflow = false;
      }
    }
  },
  render(h){
    let children = [];
    if(this.isOverflow){
      children.push(h('div', {class: 'left-shadow'}))
      children.push(h('div', {class: 'right-shadow'}))
    }
    if(this.list && this.list.length){
      const tabs = this.list.map((item, index) => {
        return h('div', {
          key: index, 
          on: { 'click': ()=> this.$emit('change',item[this.config.key]) }, 
          class: ['item', this.value == item[this.config.key] && 'active'],
          attrs: {'id': 'id-'+item[this.config.key]},
          style: {'margin-right': index == this.list.length - 1 && this.type === 'line' && '0px'}
        }, [h('span', item[this.config.label])] )
      })
      if(this.type === 'line'){
        tabs.push(h('div', {class: 'line', style: {
          transform: `translateX(${this.line.left}px)`,
          'transform-origin': '0 50%',
          width: this.line.width + 'px'
        }}))
      }
      children.push(h('div', {
        class: 'category-wrap', 
        style: {'justify-content': this.justify},
        ref: 'wrapDom'
      }, tabs ))
    }
    return h('div', {class: ['owl-tabs', this.type]}, children)
  }
}