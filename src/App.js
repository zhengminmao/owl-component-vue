export default {
  methods:{
    clickHandler(){
      this.$router.push({name: 'home'})
    }
  },
  render(h){
    return h(
      'div',
      [
        h('span', 'hello world12',),
        h('button',{
          on: {
            click: this.clickHandler
          }
        }, '跳转'),
        h(
          'router-view'
        )
      ]
    )
  }
}