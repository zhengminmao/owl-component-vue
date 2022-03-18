import Form, { FormItem } from './Form'

Form.install = function (Vue){
  Vue.component(Form.name, Form)
  Vue.component(FormItem.name, FormItem)
}
export default Form