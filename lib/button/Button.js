'use strict';
import './style/index.less'
export default {
  name: 'OwlButton',
  props:{
    loading: Boolean,
    search: Boolean,
    type: {
      default: 'primary',
      validator(val){
        return ['primary','success','error', 'normal'].indexOf(val) !== -1;
      }
    },
    plain: Boolean,
    size: {
      default: 'default',
      validator(val){
        return ['large','default','small'].indexOf(val) !== -1;
      }
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  data: function data (){
    return {}
  },
  render(h){
    let suffix = '';
    if(this.$slots['suffix-icon']){
      suffix = this.$slots['suffix-icon'];
    } else if(this.loading){
      suffix = h('span', {class: 'suffix-icon owlfont owl-loading'});
    } else if(this.search){
      suffix = h('span', {class: 'suffix-icon owlfont owl-search'});
    }
    return h('div', {
      'class': ['owl-button', 'owl-'+this.size, 'type-'+this.type, this.plain ? 'plain': '', this.disabled && 'disabled'],
      on: !this.disabled && this.$listeners
    }, [
      h('button',{class: 'owl-inner-button'}, [
        h('span', { class: 'inner-text'}, this.$slots.default,),
        suffix,
      ]),
    ])
  }
}