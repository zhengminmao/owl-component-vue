import './App.less'
import Icon from './assets/icon.png'
import {routes} from './router'

var Slider = {
  data(){
    return {
      list: [],
      value: '',
    }
  },
  created(){
    this.list = routes.filter(item => item.meta.slide)
  },
  render: function(h){
    return h('div', {class: 'slider'}, this.list.map(item => {
      return item.meta && item.meta.subtitle ? h('div', {
        class: 'subtitle',
      }, item.meta.title): h('router-link', {
        class: 'item', 
        key: item.name, 
        props: { to: {name: item.name} }
      }, [ h('span', item.meta.title ), h('span', {class: 'arrow'})])
    }))
  }
}

export default {
  components: {
    'slider': Slider
  },
  methods:{
    clickHandler(){
      this.$router.push({name: 'home'})
    }
  },
  render(h){
    return h(
      'div',
      { class: 'owl-container' },
      [
        h('header', {class: 'header-wrap'}, [
          h('div', {class: 'header'}, [
            h('img',{attrs: {src: Icon,}, class: 'header-icon' }),
            h('h1', {class: 'office-tit'}, 'Owl Component Vue'),
            h('owl-input', {
              class: 'slide-search',
              props:{value: this.value, placeholder: '输入关键字查找'},
            }, [
              h('span', {class:'owlfont owl-search', slot: 'suffix', style:{'font-size': '20px'}})
            ])
          ]),
        ]),
        h('div',{class: 'content'}, [
          h('slider'),
          h('div', {class: 'main'}, [
            h('router-view')
          ]),
        ]),
        h('footer', {class: 'footer'})
      ]
    )
  }
}

