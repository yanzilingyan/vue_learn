import Pagination from './Pagination.vue'

const pagination={
  install:function (Vue) {
    Vue.component('vPagination',Pagination)
  }
};
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(pagination)
}
export default pagination
