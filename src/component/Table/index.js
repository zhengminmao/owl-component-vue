import './table.less'

export default {
  name: 'OwlTable',
  functional: true,
  props: {
    columns:{
      type: Array,
      default: ()=> ([]),
    },
    data: {
      type: Array,
      require: false,
      default: ()=> ([])
    }
  },
  render(h, ctx){
    const props = ctx.props;
    return h('table', {class: 'owl-table'}, [
      h('tr', props.columns.map((item, index)=>h('th', {
        key: index, 
        style: { width: item.width || 'auto'}
      }, item.title))),
      ...props.data.map((item, index) => {
        return h('tr', {key: index}, props.columns.map((jtem, jndex) => h(
          'td', {key: jndex}, item[jtem.key]
        ))) 
      })
    ])
  }
}