import Collapse, {CollapsePanel} from './Collapse'

Collapse.install = function(Vue){
  Vue.component(Collapse.name, Collapse)
}
CollapsePanel.install = function(Vue){
  Vue.component(CollapsePanel.name, CollapsePanel)
}
export {
  CollapsePanel
};
export default Collapse;