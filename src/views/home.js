
import './home.css'
export default {
  render(h){
    return h(
      'div',
      [
        h('h1', {class: 'home-title'}, 'this is Home page'),
      ]
    ) 
  }
}