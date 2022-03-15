import './style/index.less'
import { getOffset } from '../_util/index.js'
let currentSelect = null; // 用一个全局变量存select
export const OwlSelectCover = {
  props:{
    visible: {
      type: Boolean,
      default: false
    },
  },
  mounted(){
    document.body.appendChild(this.$el);
  },
  beforeDestroy(){
    document.body.removeChild(this.$el);
  },
  watch: {
    visible(val){
      if(val){
        if(currentSelect && currentSelect !== this){
          currentSelect.onVisibled();
          currentSelect = null;
        }
        currentSelect = this;
        document.body.addEventListener('click', this.onVisibled, false)
      } else {
        document.body.removeEventListener('click', this.onVisibled, false)
      }
    }
  },
  methods:{
    onVisibled(){
      this.$emit('change', false)
      currentSelect = null;
      document.body.removeEventListener('click', this.onVisibled, false)
    }
  },
  render(h){
    return h('div', {class: ['owl-select-cover', this.visible && 'active']}, [this.$slots.default])
  }
}

export default {
  name: 'OwlSelect',
  components: {
    OwlSelectCover,
  },
  model:{
    prop: 'value',
    event: 'change'
  },
  props:{
    list: Array,
    config: {
      type: Object,
      default: ()=>({label: 'label', value: 'value'})
    },
    value: {
      type: [Number, String, Array],
      default: null
    },
    placeholder: {
      type: String,
      default: '请选择 Please select'
    },
    wordWrap: {
      type: String,
      default: '',
      validator(val){
        return ['wrap', 'nowrap', ''].indexOf(val) >= 0;
      }
    },
    multiple: {
      require: false,
      type: Boolean,
      default: false,
    }
  },
  data(){
    return {
      showSelect: false,
      currentLabel: '', // 当前的显示文本值
      filterValue: '', // 过滤文本值
      listMinWidth: '',
      listTop: 0,
      listLeft: 0,
      clearTime: '',
    }
  },
  computed:{
    filterList(){
      if(this.filterValue){
        return this.list.filter(item=>{
          return (item[this.config.label]+'').toLowerCase().indexOf(this.filterValue.toLowerCase()) >= 0
        })
      }
      return this.list;
    },
    _value:{
      get(){
        if(this.multiple && !(this.value instanceof Array)){
          return [];
        }
        return this.value;
      },
      set(val){
        this.$emit('change', val)
      }
    }

  },
  mounted(){
    this.getListPos();
    window.addEventListener('resize',this.onWinResize)
    this.$once("hook:beforeDestroy", ()=>{
      window.removeEventListener('resize', this.onWinResize)
    })
  },
  methods:{
    onWinResize(){
      this.recover();
      this.getListPos();
    },
    selectWrapClick(e){
      e && e.stopPropagation()
      this.getListPos();
      const dom = e.currentTarget.querySelector('input')
      this.showSelect = true;
      dom && dom.focus();
    },
    getListPos(){
      const dom = this.$refs.selectWrapDom;
      const domOffset = getOffset(dom)
      this.listMinWidth = dom.clientWidth
      this.listTop = domOffset.offsetTop + dom.clientHeight + 8;
      this.listLeft = domOffset.offsetLeft
    },
    choosed(val, label){
      if(this.multiple){
        if(!this.value || !this.value.length){ // 如果没值或者是空数组
          this._value = [val]
          this.currentLabel = [label];
          return;
        }
        const index = this.value.indexOf(val);
        if(index >= 0){
          this._value.splice(index, 1);
          this.currentLabel.splice(index, 1);
          if(this._value.length == 0) {
            this.currentLabel = '';
          }
        } else {
          this.currentLabel.push(label);
          this._value.push(val);
        }
      } else {
        this.recover()
        this.currentLabel = label;
        this._value = val
      }
    },
    clearValue(e){
      e.stopPropagation();
      this.currentLabel = '';
      this.recover();
      this._value= this.multiple? []: undefined;
    },
    recover(){
      if(!this.showSelect) return;
      this.showSelect = false;
      this.clearTime && clearTimeout(this.clearTime)
      this.clearTime = setTimeout(()=>{
        this.filterValue = '';
      },250)
    }
  },

  render(h){
    let listChildren = [];
    const valueKey = this.config.value;
    const labelKey = this.config.label;
    let shouldClear = false;  // 是否可以清空
    if( this.value instanceof Array ){
      shouldClear = this.value.length !== 0
    } else{
      shouldClear = Boolean(this.value);
    }
    if(!this.filterList.length){
      listChildren.push(h('div', {
        class: 'empty-data', 
        style: { 'width': this.listMinWidth + 'px' }
      },[
        h('span', {class:'iconfont owl-kongshuju'}), 
        h('span', {class: 'label'}, 'Empty'), 
      ]))
    } else {
      listChildren = this.filterList.map((item) => {
        const key = item[valueKey];
        const isActive = this.multiple? this.value.indexOf(key)>=0: key === this.value
        return h('div', {
          key, 
          class: ['owl-select-option', isActive ? 'active': ''],
          on: {
            click: () => this.choosed(key, item[labelKey])
          }
        }, item[labelKey])
      })
    }
    let multipleDom = null;
    if(this.multiple && this._value && this._value.length) { // 如果选了多选
      multipleDom = h('div', { class: 'owl-multiple-box' }, [
        h('div', {class: 'owl-multiple-item'}, this.currentLabel[0]+'...'),
        this._value.length > 1? h('div', {class: 'owl-multiple-item count'}, '+'+(this._value.length-1)):''
      ]);
    }
    let placeholder = this.multiple && this._value.length> 0
      ? ''
      : this.filterValue? '': this.currentLabel || this.placeholder;
    return h('div', {
      class: 'owl-select',
      ref: 'selectWrapDom',
      on: {
        'click': this.selectWrapClick
      }
    }, [
      h('div', {
        class: ['owl-select-wrap', this.showSelect && 'active', shouldClear && 'clear'], 
      }, [
        h('div', {class: ['owl-select-plchld', this.currentLabel && 'active']}, placeholder),
        multipleDom,
        h('input', {
          class: 'owl-select-npt',
          domProps:{
            value: this.filterValue,
          },
          on: {
            input: e => (this.filterValue = e.target.value),
          }
        }),
        h('span', {
          class: 'suffix-icon owl-arrow-xia iconfont',
          on: {
            click: (e)=> {e.stopPropagation();this.recover()}
          }
        }),
        h('span', {
          class: 'suffix-icon owl-close iconfont', 
          on: {
            click: this.clearValue
          }
        })
      ]),
      h('owl-select-cover', {
        props: { visible: this.showSelect },
        on: {
          change: val => {
            !val ? this.recover(): (this.showSelect = val)
          }
        }
      },[h('div', {
        class: ['owl-select-list-wrap', this.wordWrap],
        style: {
          'min-width': this.listMinWidth + 'px',
          top: this.listTop + 'px',
          left: this.listLeft + 'px',
        },
        on: {
          click: e => e.stopPropagation()
        }
      }, listChildren)])
    ])
  }
}