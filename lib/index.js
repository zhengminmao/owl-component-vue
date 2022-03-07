import Button from './button'
import Swiper from './swiper'
import Label from './label'
import Tabs from './tabs'
import Input from './input'
import './assets/common.less'
import './assets/iconfont.css'
const components = {
  Button,
  Swiper,
  Label,
  Tabs,
  Input
}
const install = function(Vue){
  for (let key in components){
    Vue.component(components[key].name, components[key])
  }
}

export default {
  install,
  components
}