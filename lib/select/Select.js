import './style/index.less'
let currentSelect = null; // 用一个全局变量存select
const OwlSelectCover = {
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
      type: [Number, String, undefined, null, Array],
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
    }
  },
  mounted(){
    const dom = this.$refs.selectWrapDom;
    const domOffset = this.getOffset(dom)
    this.listMinWidth = dom.clientWidth
    this.listTop = domOffset.offsetTop + dom.clientHeight + 8;
    this.listLeft = domOffset.offsetLeft
  },
  methods:{
    selectWrapClick(e){
      e.stopPropagation()
      const dom = e.currentTarget.querySelector('input')
      this.showSelect = true;
      dom && dom.focus();
    },
    getOffset(dom){
      function getParent(dom, offsetTop = 0, offsetLeft = 0){
        if(dom.offsetParent){
          offsetTop += dom.offsetParent.offsetTop;
          offsetLeft += dom.offsetParent.offsetLeft;
          getParent(dom.offsetParent, offsetTop, offsetLeft);
        }
        return {offsetTop, offsetLeft};
      }
      return getParent(dom, dom.offsetTop, dom.offsetLeft);
    },
    choosed(val, label){
      this.currentLabel = label;
      this.recover()
      this.$emit('change', val)
    },
    clearValue(e){
      e.stopPropagation();
      this.currentLabel = '';
      this.recover();
      this.$emit('change', undefined)
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
        return h('div', {
          key: item[valueKey], 
          class: ['owl-select-option', item[valueKey] === this.value ? 'active': ''],
          on: {
            click: () => this.choosed(item[valueKey], item[labelKey])
          }
        }, item[labelKey])
      })
    }
    let placeholder = this.currentLabel || this.placeholder 
    return h('div', {
      class: 'owl-select',
      ref: 'selectWrapDom',
      on: {
        'click': this.selectWrapClick
      }
    }, [
      h('div', {
        class: ['owl-select-wrap', this.showSelect && 'active', this.value && 'clear'], 
      }, [
        h('div', {class: ['owl-select-plchld', this.currentLabel && 'active']}, this.filterValue? '': placeholder),
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
          left: this.listLeft + 'px'
        },
        on: {
          click: e => e.stopPropagation()
        }
      }, listChildren)])
    ])
  }
}