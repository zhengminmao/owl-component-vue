import Collapse, {CollapsePanel} from './Collapse'

Collapse.install = function(Vue){
  Vue.component(Collapse.name, Collapse)
  Vue.component(CollapsePanel.name, CollapsePanel)
}
export default Collapse;