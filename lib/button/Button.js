'use strict';
import './style/index.less'
export default {
  name: 'OwlButton',
  data: function data (){
    return {}
  },
  render(h){
    return h(
      'button',
      {
        'class': 'owl-button'
      },
      this.$slots.default
    )
  }
}