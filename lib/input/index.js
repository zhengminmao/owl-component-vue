import './style/index.less'
export default {
  name: 'OwlInput',
  model: {
    prop: 'value',
    event: 'change'
  },
  props:{
    placeholder: String,
    value: String,
    type: {
      default: 'text',
      type: String
    },
    rule: Array
  },
  data(){
    return {
      showPassword: false,
      showTip: false,
      tip: '',
    }
  },
  methods:{
    onFocus(){
      this.showTip = false;
    },
    onBlur(){
      this.validateField();
    },
    validateField(){
      if(this.rule && this.rule.length){
        for (let i = 0, lng = this.rule.length; lng > i ; i++){
          if (this.rule[i].require && this.value.length == 0){
            this.tip = this.rule[i].tip;
            this.showTip = true;
            return false;
          }
          if(this.rule[i].validate){
            if (!this.rule[i].validate(this.value)){
              this.tip = this.rule[i].tip;
              this.showTip = true;
              return false;
            }
          }
        }
      }
      return true;
    }
  },
  render: function(h){
    return h('label', {class: ['owl-input', this.showTip && 'error']}, [
      this.$slots.prefox,
      h('input', {
        class: 'input',
        attrs: {
          type: this.type != 'password' ? this.type: this.showPassword? 'text': 'password',
          placeholder: this.placeholder 
        },
        domProps:{
          value: this.value,
        },
        on: {
          input: e=> this.$emit('change', e.target.value),
          focus: this.onFocus,
          blur: this.onBlur
        },
      }),
      this.$slots.suffix || 
      this.type !== 'password'? (this.value && h(
        'span', {class: 'suffix-icon iconfont owl-close', on: {click: ()=> this.$emit('change', '')}}
      )): (this.value && h(
        'span', 
        {
          class: ['suffix-icon iconfont', this.showPassword? 'owl-yanjing1': 'owl-yanjing'],
          on: {
            click:()=>{this.showPassword = !this.showPassword}
          }
        }
      )),
      h('div', {class: 'tip'}, [ h('span', this.tip) ]),
      h('div', {class: 'active-line'})
    ])
  }
}