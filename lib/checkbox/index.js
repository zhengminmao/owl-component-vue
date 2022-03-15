import Checkbox, {CheckboxGroup} from "./Checkbox";

Checkbox.install = function(vue){
  vue.component(Checkbox.name, Checkbox)
}
CheckboxGroup.install = function(vue){
  vue.component(CheckboxGroup.name, CheckboxGroup)
}

export default Checkbox;
export {CheckboxGroup}