import { getOffset } from '../lib/_util'
import './App.less'
import Icon from './assets/icon.png'
import {routes} from './router'

const Slider = {
  data(){
    return {
      list: [],
      value: '',
    }
  },
  created(){
    this.list = routes.filter(item => item.meta.slide)
  },
  render(h){
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
const ContentNav = {
  data(){
    return {
      navList: []
    }
  },
  watch:{
    '$route'(){
      this.getH3Dom()
    }
  },
  mounted(){
    this.getH3Dom()
  },
  methods:{
    getH3Dom(){
      const articleContent = document.querySelector('#article-content');
      const doms = articleContent.querySelectorAll('h3').entries()
      let navList = [];
      for (let dom of doms){
        navList.push({
          txt: dom[1].innerText,
          dom: dom[1]
        })
      }
      this.navList = navList;
    },
    goToDom(dom){
      const offset = getOffset(dom)
      window.scroll({
        top: offset.offsetTop - 100,
        behavior: 'smooth'
      })
    }
  },
  render(h){
    return h('div', {class: 'content-nav'}, this.navList.map((item,key)=>h(
      'div', {key, class: 'nav-item', on: {click: ()=>this.goToDom(item.dom)}}, [item.txt]
    )))
  }
}
export default {
  components: {
    'slider': Slider,
    'content-nav': ContentNav
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
            ]),
            h('a', {attrs: {'target': '__blank', href: 'https://github.com/zhengminmao/owl-component-vue'}}, [
              h('svg', {class: 'github-icon',attrs: {
                height: '28',
                width: '28',
                version: '1.1',
                viewBox: "0 0 16 16",
              }},[
                h('path', {attrs: {
                  'fill-rule': 'evenodd',
                  'd': 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'
                }})
              ])
            ]), 
          ]),
        ]),
        h('div',{class: 'content'}, [
          h('slider'),
          h('content-nav'),
          h('div', {class: 'main', attrs: {id: 'article-content'}}, [
            h('router-view')
          ]),
        ]),
        h('footer', {class: 'footer'})
      ]
    )
  }
}

