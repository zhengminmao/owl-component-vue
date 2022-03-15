import Date from './Date.js'

Date.install = function (Vue) {
  Vue.component(Date.name, Date)
}
export default Date;
