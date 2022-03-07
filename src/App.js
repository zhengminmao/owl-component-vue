import './App.less'
import {routes} from './router'

var Slider = {
  data(){
    return {
      list: [],
    }
  },
  created(){
    this.list = routes.filter(item => item.meta.slide)
  },
  render: function(h){
    return h('div', {class: 'slider'}, this.list.map(item => {
      return h('router-link', {
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
          h('div', {class: 'header'}, [h('h1', {class: 'office-tit'}, 'Owl Component Vue')] )
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

