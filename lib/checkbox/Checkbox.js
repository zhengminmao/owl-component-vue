import './style/index.less'

export default {
  name: 'OwlCheckbox',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props:{
    name: String,
    value: String,
    label: String,
    checked: Array
  },
  computed:{
    isActive(){
      if(this.isInGroup){
        return this.$parent.checked.indexOf(this.value) >= 0
      }
      if(!this.checked) return false;
      return this.checked.indexOf(this.value) >= 0
    },
    isInGroup(){
      return this.$parent && this.$parent.$options._componentTag === 'owl-checkbox-group';
    }
  },
  methods:{
    changed(){
      if(this.isInGroup){
        this.$parent.changed(this.value)
        return;
      }
      const index = this.checked.indexOf(this.value);
      if(this.checked && index >= 0){
        this.$emit('change', this.checked.filter(item=> item !== this.value))
      } else {
        this.$emit('change', this.checked.concat(this.value))
      }
    }
  },
  render(h){
    return h('div', 
      {class: 'owl-checkbox', scopedSlots:{ default: () => h('span', this.label) }},
      [
        h('label', {
          class: 'owl-checkbox-label',
          attrs: { for: this.value }
        }, [
          h('input', {
            attrs: { id:this.value, name: this.name, value: this.value, type: 'checkbox', checked: this.isActive},
            on:{ change: this.changed }
          }),
          h('div', {class: 'owl-chk-crc'}, [h('span', {class: 'owlfont owl-gougou'})]),
          h('div', {class: 'owl-chk-lbl'}, this.$slots.default)
        ])
      ]
    )
  }
}

export const CheckboxGroup = {
  name: 'owlCheckboxGroup',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      required: true,
      type: Array,
      default: ()=>([])
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
      const index = this.checked.indexOf(val);
      if(index >= 0){
        this.$emit('change', this.checked.filter(item=> item !== val))
      } else {
        this.$emit('change', this.checked.concat(val))
      }
    }
  },
  render(h){
    return h('div', {class: ['owl-checkbox-group', this.direction === 'vertical' && 'vertical']}, this.$slots.default)
  }
}