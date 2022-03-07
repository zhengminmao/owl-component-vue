import './style/index.less'

export default{
  name: 'OwlLabel',
  functional: true,
  props: {
    height: String,
    label: String,
    ellipsisColor: String,
    ellipsisBgmColor: String
  },
  render: function(h, ctx){
    const props = ctx.props;
    return h('div', {class: 'owl-label', style: {height: props.height} }, [
      h('span', {class: 'line-label'}, props.label),
      h('span', {class: 'after', style: {
        'color': props && props.ellipsisColor? props.ellipsisColor: '#333333',
        'background': `linear-gradient(to right, rgba(255,255,255,0), ${(props && props.ellipsisBgmColor) || 'white'} 50%) `
      }}, '...')
    ])
  }
}