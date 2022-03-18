import Radio, {RadioGroup} from './Radio'

Radio.install = function (Vue){
  Vue.component(Radio.name, Radio)
}
RadioGroup.install = function(vue){
  vue.component(RadioGroup.name, RadioGroup)
}
export {RadioGroup}
export default Radio