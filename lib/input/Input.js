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
      validator(val){
        return ['number','text','password'].indexOf(val) !== -1;
      }
    },
    border: Boolean,
    rule: Array,
    size: {
      default: 'default',
      validator(val){
        return ['large','default','small'].indexOf(val) !== -1;
      }
    }
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
    },
    onInput(val){
      this.$emit('change', this.type === 'number'? val.replace(/\D+/g, ''): val)
    }
  },
  render: function(h){
    return h('div', {class: ['owl-input', this.showTip && 'error', this.border && 'border', 'owl-' + this.size]}, [
      this.$slots.prefix,
      h('input', {
        class: 'input',
        attrs: {
          type: this.type,
          placeholder: this.placeholder 
        },
        domProps:{
          value: this.value,
        },
        on: {
          input: e => {e.stopPropagation(); this.onInput(e.target.value)},
          focus: e=>{e.stopPropagation(); this.onFocus()} ,
          blur: e=>{e.stopPropagation(); this.onBlur()} 
        },
      }),
      this.$slots.suffix
        ? this.$slots.suffix
        : this.type !== 'password'
          ? (this.value && h(
            'span', {class: 'suffix-icon owlfont owl-close', on: {click: ()=> this.$emit('change', '')}}
          ))
          : (this.value && h(
            'span', 
            {
              class: ['suffix-icon owlfont', this.showPassword? 'owl-yanjing1': 'owl-yanjing'],
              on: {
                click:()=>{this.showPassword = !this.showPassword}
              }
            }
          )
      ),
      h('div', {class: 'tip'}, [ h('span', this.tip) ]),
      h('div', {class: 'active-line'})
    ])
  }
}