import Checkbox, {CheckboxGroup} from "./Checkbox";

Checkbox.install = function(vue){
  vue.component(Checkbox.name, Checkbox)
  vue.component(CheckboxGroup.name, CheckboxGroup)
}
export default Checkbox;