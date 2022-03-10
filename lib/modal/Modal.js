import './style/index.less'
export default {
  name: 'OwlModal',
  props: {
    visible: Boolean,
    shrinkMenu: {
      type: Boolean,
      default: true
    },
    middle: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '680px'
    },
    top: {
      type: String,
      default: '200px'
    },
  },
  mounted(){
    document.body.appendChild(this.$el)
  },
  beforeDestroy(){
    document.body.removeChild(this.$el)
  },
  methods:{
    close(){
      this.$emit('update:visible', false)
    }
  },
  render(h){
    return h('div', {
      class: ['owl-modal', this.middle && 'middle', this.visible && 'active'],
      
      on: { click: this.close }
    }, [
      h('div', {
        class: 'modal-contain-wrap', 
        on: {click: (e) => e.stopPropagation()},
        style: {width: this.width, 'margin-top': this.middle ? '': this.top},
      }, [
        this.shrinkMenu ? h('span', {
          class: 'modal-menu icon-shrink iconfont owl-jian',
          on: {click: this.$emit('on-shrink')}
        }) : null,
        h('span', {
          class: 'modal-menu icon-closable iconfont owl-cheng', on: {click: this.close}
        }),
        h('div', {class: 'modal-body'}, [this.$slots.default])
      ])
    ])
  }
}