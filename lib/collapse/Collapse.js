import './style/index.less'
export default {
  name: 'owlCollapse',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: ()=>[]
    },
    expand: Boolean
  },
  provide(){
    return {
      changeVisible: (val) => this.changeVisible(val)
    }
  },
  mounted(){
    for(let item of this.$children){
      if(this.expand || this.value.indexOf(item.value) >= 0 ){
        item.switchVisible && item.switchVisible()
      }
    }
  },
  methods:{
    changeVisible(val){
      setTimeout(() => {
        const index = this.value.indexOf(val);
        const _value = JSON.parse(JSON.stringify(this.value));
        if(index >= 0){
          _value.splice(index)
        } else {
          _value.push(val);
        }
        this.$emit('change', _value)
      })
    }
  },
  render(h){
    return h('div', {class: 'owl-collapse'}, this.$slots.default)
  }
}

export const CollapsePanel = {
  name: 'owlCollapsePanel',
  props: {
    value: [String, Number],
    header: String
  },
  inject:['changeVisible'],
  data(){
    return{
      height: 0,
      visible: false,
    }
  },
  methods:{
    switchVisible(){
      if(this.visible){
        this.visible = false;
        this.height = 0;
      } else {
        this.visible = true;
        this.height = this.$refs.panelDom.clientHeight;
      }
      this.changeVisible(this.value)
    }
  },
  render(h){
    return h('div', {class: 'owl-collapse-panel'}, [
      h('div', {
        class: ['owl-collapse-panel-header', this.visible && 'active'],
        on: { click: this.switchVisible}
      }, [
        h('span', {class: 'iconfont owl-arrow-xia' } ),
        h('span', {class: 'panel-title'}, this.header ),
      ]),
      h('div', {
        class: 'owl-collapse-contain-wrap', 
        style: {height: this.height+'px'},
        
      }, [
        h('div', {class: 'owl-collapse-panel-contain', ref: 'panelDom'}, this.$slots.default)
      ])
      
    ])
  }
}