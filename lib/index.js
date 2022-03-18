import Button from './button'
import Swiper from './swiper'
import Label from './label'
import Tabs from './tabs'
import Input from './input'
import Slide from './slide'
import Modal from './modal'
import Proccess from './proccess'
import Select from './select'
import Collapse, {CollapsePanel} from './collapse'
import Checkbox, {CheckboxGroup} from './checkbox'
import Date from './date'
import Radio, {RadioGroup} from './radio'
import './assets/common.less'
import './assets/iconfont.css'
export const components = {
  Button,
  Swiper,
  Label,
  Tabs,
  Input,
  Slide,
  Modal,
  Proccess,
  Select,
  Collapse,
  CollapsePanel,
  Checkbox,
  CheckboxGroup,
  Date,
  Radio,
  RadioGroup,
}
const install = function(Vue){
  for (let key in components){
    Vue.component(components[key].name, components[key])
  }
}

export default {
  install,
}