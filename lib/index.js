import Button from './button'
import Swiper from './swiper'
import Label from './label'
import Tabs from './tabs'
import Input from './input'
import Slide from './slide'
import Modal from './modal'
import Proccess from './proccess'
import Select from './select'
import Collapse from './collapse'
import Checkbox from './checkbox'
import Date from './date'
import Radio from './radio'
import Pagination from './pagination'
import Form from './form'
import Popover from './popover'
import Affix from './affix'
import Message from './message'
import './_assets/common.less'
import './_assets/iconfont.css'
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
  Checkbox,
  Date,
  Radio,
  Pagination,
  Form,
  Popover,
  Affix,
  Message
}
const install = function(Vue){
  for (let key in components){
    components[key].install(Vue)
  }
}

export default {
  install,
}