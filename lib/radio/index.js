import Radio, {RadioGroup} from './Radio'

Radio.install = function (Vue){
  Vue.component(Radio.name, Radio)
  Vue.component(RadioGroup.name, RadioGroup)
}
export {RadioGroup}
export default Radio