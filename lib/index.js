import Button from './button'
import Swiper from './swiper'
import Label from './label'
import Tabs from './tabs'
import './assets/common.less'

const components = {
  Button,
  Swiper,
  Label,
  Tabs
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