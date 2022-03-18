import './style/index.less'

export default {
  name: 'owlPagination',
  props: {
    totalResult: Number,
    showCount: Number,
    currentPage: Number,
  },
  computed:{
    size(){
      return Math.ceil(this.totalResult / this.showCount) 
    },
    page(){
      let arr = [];
      if(this.size <= 2){
        return [];
      }
      const currentPage = this.currentPage > this.size? 1: this.currentPage;

      let first = 1;
      if(currentPage > 3) {
        first = currentPage - 2;
      }
      if(currentPage + 3 > this.size && this.size > 5){
        first = this.size - 4
      }
      if(first !== 1){
        // 如果第一个有值
        arr.push(first);
      }
      let max = 5 - (currentPage <= 3 ? 1 : 0)
      while(arr.length < max && this.size > first + 1 ) {
        arr.push(++first)
      }
      return arr;
    }
  },
  mounted(){
    console.log(this.page);
  },
  methods:{
    changeCurrent(val){
      this.$emit('change', val)
    },
    substractPage(){
      if(this.currentPage === 1) return;
      this.$emit('change', this.currentPage - 1)
    },
    addPage(){
      if(this.size === this.currentPage) return;
      this.$emit('change', this.currentPage + 1)
    }
  },
  render(h){
    let children = [
      h('li', {
        class: ['owl-pagination-item prev', this.currentPage === 1 && 'disabled'],
        on: {click: this.substractPage}
      }, [
        h('span', {class: 'owlfont owl-arrow-you'})
      ]),
      h('li', {
        class: ['owl-pagination-item', this.currentPage === 1 && 'active'],
        on: {click: ()=>this.changeCurrent(1)}
      }, 1),
    ]
    if(this.page && this.page.length){
      if(this.page[0] - 1 > 1){
        children.push(h('li', { 
          class: 'owl-pagination-ellipse prev',
          on: {click: ()=>this.changeCurrent(this.currentPage - 5 < 1? 1: this.currentPage - 5)},
          attrs: {
            title: 'Subtract 5 pages'
          }
        }, [
          h('span', {class: 'owlfont owl-double-arrow-you'}),
          h('span', {class: 'more'})
        ]))
      }
      children.push(...this.page.map(item=>h('li', {
        key:item, 
        class: ['owl-pagination-item', this.currentPage === item && 'active'],
        on: {click: ()=>this.changeCurrent(item)}
      }, item)))
      if(this.size - this.page[this.page.length - 1] > 1){
        children.push(h('li', { 
          class: 'owl-pagination-ellipse next',
          on: {click: ()=>this.changeCurrent(this.currentPage + 5 > this.size ? this.size : this.currentPage + 5)},
          attrs: {
            title: 'Add 5 pages',
          }
        }, [
          h('span', {class: 'owlfont owl-double-arrow-you'}),
          h('span', {class: 'more'})
        ]))
      }
    }
    children.push(h('li', {
      class: ['owl-pagination-item', this.currentPage === this.size && 'active'],
      on: {click: ()=>this.changeCurrent(this.size)}
    }, this.size))
    children.push(
      h('li', {
        class: ['owl-pagination-item next', this.currentPage === this.size && 'disabled'],
        on: {click: this.addPage}
      }, [
        h('span', {class: 'owlfont owl-arrow-you'})
      ])
    )
    children.push(this.$slots.total || h('li', {class: 'owl-pagination-total'}, this.totalResult+' in total'))
    return h('ul', {class: 'owl-pagination'}, children)
  }
}