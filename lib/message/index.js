import './style/index.less'
import Vue from 'vue';

const getContainer = function(){
  return document.body;
}
const MessageItem = {
  props: {
    type: {
      default: 'info',
      validator(val){
        return ['info', 'success', 'error', 'loading'].indexOf(val) !== -1;
      }
    },
    duration: Number,
    content: String,
    id: [Number, String]
  },
  data(){
    return {
      time: ''
    }
  },
  mounted(){
    this.startCountDown()
  },
  beforeDestory(){
    clearTimeout(this.time); 
  },
  watch: {
    duration(val){
      this.clearCountdown()
      this.setCountDown()
    }
  },
  methods:{
    clearCountdown(){
      this.time && clearTimeout(this.time)
    },
    startCountDown(){
      if(!this.duration) return;
      this.time = setTimeout(()=>{
        this.$emit('close', this.id)
      }, this.duration)
    }
  },
  render(h){
    return h('div', {
      class: 'owl-message-item '+ this.type,
      on: {
        'mouseenter': this.clearCountdown,
        'mouseleave': this.startCountDown,
      }
    }, [
      h('span', {class: ['owlfont ', 'owl-'+this.type]}),
      h('div', {class: '--message-cnt'}, this.content)
    ])
  }
}
const MessageWrap = new Vue({
  components:{
    MessageItem,
  },
  data(){
    return {
      messages: []
    }
  },
  methods:{
    deleteItem(key){
      const index = this.messages.findIndex(item=> item.id === key);
      index >= 0 && this.messages.splice(index, 1);
    },
    addItem({type, content, key, duration}){
      // type, content, key, duration 毫秒
      if(!content) return new Error('content is empty');
      let id = key ? key : Date.now()+this.messages.length
      if(key) {
        const hasExit = this.messages.findIndex(item=>item.id == key)
        if(hasExit >= 0){
          this.messages[hasExit].type = type;
          this.messages[hasExit].content = content;
          this.messages[hasExit].duration = duration;
        }
      } else {
        let addInfo = {
          type: type || 'info',
          content: content || '',
          id,
          duration: duration === 0? 0: duration || 2000,
        }
        this.messages.push(addInfo);
      }
      
      return () => {
        this.deleteItem(id)
      }
    }
  },
  render(h){
    return h('div', 
      {class: 'owl-message-wrap'}, 
      [
        h('transition-group', {
          props: {name: 'owl-msg-lst'},
          class: 'owl-message-box'
        }, this.messages.map((item)=> h(
          'message-item', {
            key: item.id, 
            props: {...item},
            on: {
              close: this.deleteItem
            }
          })
        ))
      ]
    )
  }
})

// this.$message.loading('content', 'key')
// this.$message({type: 'loading', key:'key', content:'', duration: 3000})
 
const Message = function(params){
  if(!Message.$el){
    Message.$el = document.createElement('div');
    getContainer().appendChild(Message.$el);
    MessageWrap.$mount(Message.$el);
  }
  return new Promise((res) => {
    const ret = MessageWrap.addItem(params);
    res(ret)
  })
};
['info', 'success', 'error', 'loading'].forEach(item => {
  Message[item] = function(content, key, duration){
    if(!content) return Promise.reject('content is empty');
    if(typeof key === 'number') {
      duration = key;
      key = ''
    }
    return Message({
      type: item,
      content: content,
      id: key,
      duration: duration
    })
  }
});
Message.install = function(Vue) {
  Vue.prototype.$message = Message;
}

export default Message;