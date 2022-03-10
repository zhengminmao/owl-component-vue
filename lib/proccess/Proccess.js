import './style/index.less'

export default {
  name: 'owlProccess',
  props:{
    label: String,
    proccess: Number, // 0 - 100 完成度
    color: String,
    subColor: String,
    id: String,
  },
  data(){
    return {
      dashoffset: 315,
    }
  },
  watch: {
    proccess:{
      handler(newVal){
        setTimeout(()=>{
          this.dashoffset = 315 - newVal * 3.15
        })
      },
      immediate: true
    }
  },
  render(h){
    return h('div', {class: 'owl-proccess'}, [
      h('div', {class: 'circle-wrap'},  [
        h('svg', {
          attrs: { xmlns: 'http://www.w3.org/2000/svg', version: '1.1' }, 
          class: 'circle'
        }, [
          h('defs', [
            h('linearGradient', {attrs: { id: this.id+'bgm', x1: '0%', y1: '0%', x2: '0%', y2: '100%'}}, [
              h('stop', {attrs: {offset: '0%'}, style: `stop-color:${this.subColor};stop-opacity:1`}),
              h('stop', {attrs: {offset: '100%'}, style: `stop-color:${this.color};stop-opacity:1`})
            ]),
            h('linearGradient', {attrs: { id: 'circleBorderBtm', x1: '0%', y1: '0%', x2: '0%', y2: '100%'}}, [
              h('stop', {attrs: {offset: '0%'}, style: `stop-color:#595959;stop-opacity:1`}),
              h('stop', {attrs: {offset: '100%'}, style: `stop-color:#C2C2C2;stop-opacity:1`})
            ])
          ]),
          h('path', {
            attrs: {
              d: "m5, 55 a50 50 0 1 1 100 0a50 50 0 1 1 -100 0",
              stroke: `url(#circleBorderBtm)`,
              fill: "transparent",
              'stroke-width': "10" 
            },
            class: "bgm-path"
          }),
          h('path', {
            attrs: {
              d: "m5, 55 a50 50 0 1 1 100 0a50 50 0 1 1 -100 0",
              stroke: `url(#${this.id}bgm)`,
              fill: "transparent",
              'stroke-width': "10" 
            },
            class: "fgm-path",
            style: { 'stroke-dashoffset': this.dashoffset }
          })
        ]),
        h('div', {class: 'label-wrap', style: {color: this.proccess == 100 ? this.color: ''}}, this.label || '')
      ]),
      h('div', {class: 'compelete', style:{color: this.proccess == 100 ? this.color: ''}}, this.proccess+'%'),
    ])
  }
}