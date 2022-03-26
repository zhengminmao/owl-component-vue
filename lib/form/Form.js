import './style/index.less'

export default {
  name: 'owlForm',
  props:{
    model:{
      validator: () => true
    },
    size:{
      default: 'default',
      validator(val){
        return ['large','default','small'].indexOf(val) !== -1;
      }
    },
    labelPosition:{
      default: 'left',
      validator(val){
        return ['right', 'top', 'left'].indexOf(val) !== -1;
      }
    },
    inline:{
      default: false,
      type: Boolean
    },
    width: {
      default: '100%',
      type: [String , Number]
    }
  },
  methods:{
    validate(callback){
      let ret = true;
      for (let child of this.$children){
        if(child.validate){
          if(!child.validate()){
            ret = false;
          }
        }
      }
      callback && callback(ret);
    },
    clearValidate(){
      for (let child of this.$children){
        child.resetError && child.resetError()
      }
    }
  },
  render(h){
    return h('div', {
      class: [
        'owl-form', 
        'label-position-' + this.labelPosition, 
        this.inline && 'inline',
        'owl-' + this.size
      ], 
      style: {
        width: typeof this.width === 'string'? this.width : this.width +'px' 
      }
    }, this.$slots.default)
  }
}

export const FormItem = {
  name: 'owlFormItem',
  props: {
    label: String,
    prop: String,
    labelWidth: {
      type: [String, Number],
      default: ''
    },
    rule: Array
  },
  data(){
    return {
      error: '', // 错误提示，如果有值显示错误
    }
  },
  methods:{
    validate(){
      if(this.rule && this.rule.length === 0) {
        this.error = '';
        return true;
      }
      let val = this.$parent.model[this.prop];
      try {
        for (let item of this.rule){
          if(item.required){
            this.error = item.tip || 'please complete';
            if(!val) return false;
          }
          if(item.validator && !item.validator(val)){
            this.error = item.tip;
            return false;
          }
        }
      } catch (e){
        this.error = e 
        return false;
      }
      this.error = '';
      return true;
    },
    resetError(){
      this.error = '';
    }
  },
  render(h){
    const isRequire = this.rule && this.rule.length ? Boolean(this.rule.find(item=>item.required)): false;
    return h('div', {class: ['owl-form-item', this.error ? '--error': '']}, [
      h('div', {
        class: ['owl-form-label', isRequire && '--require'], 
        style: {
          width: typeof this.labelWidth === 'string'? this.labelWidth : this.labelWidth+'px'
        }
      }, this.label || ''),
      h('div', {class: 'form-item-inner', attrs:{ tabindex: '1'}, on: {'!focus': this.resetError}}, [
        h('div', this.$slots.default),
        h('div', {class: 'form-tip'}, this.error)
      ])
    ])
  }
}