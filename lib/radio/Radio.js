import '../checkbox/style/index.less'
import './style/index.less'

export default {
  name: 'OwlRadio',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props:{
    name: String,
    value: [String, Number, Boolean],
    label: String,
    checked: [String, Number, Boolean]
  },
  computed:{
    isActive(){
      if(this.isInGroup){
        return this.$parent.checked === this.value
      }
      return this.checked === this.value
    },
    isInGroup(){
      return this.$parent && this.$parent.$options._componentTag === 'owl-radio-group';
    }
  },
  methods:{
    changed(){
      if(this.isInGroup){
        this.$parent.changed(this.value)
        return;
      }
      this.$emit('change', this.isActive? '': this.value);
    }
  },
  render(h){
    return h('div', 
      {
        class: ['owl-radio', this.isActive? 'active': '' ], 
        scopedSlots:{ default: () => h('span', this.label) }, 
        on:{ '!click': this.changed }
      },
      [
        h('label', {
          class: 'owl-radio-label',
          attrs: { for: this.value },
          on:{ 'click': e=>{e.preventDefault()&& e.stopPropagation()} }
        }, [
          h('input', {
            attrs: { id:this.value, name: this.name, value: this.value, type: 'radio', checked: this.isActive},
          }),
          h('div', {class: 'owl-rd-crc'}, [h('span', {class: 'owlfont owl-gougou'})]),
          h('div', {class: 'owl-rd-lbl'}, this.$slots.default)
        ])
      ]
    )
  }
}

export const RadioGroup = {
  name: 'owlRadioGroup',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      required: true,
      type: [String, Number, Boolean]
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(val)  {
        return ['horizontal', 'vertical'].indexOf(val) >= 0;
      }
    }
  },
  methods:{
    changed(val){
      this.$emit('change', val === this.checked? '' : val);
    }
  },
  render(h){
    return h('div', {class: ['owl-radio-group', this.direction === 'vertical' && 'vertical']}, this.$slots.default)
  }
}