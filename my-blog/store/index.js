// import Vue from 'vue'
// import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './actions'
// Vue.use(Vuex);
export const state = () => ({
  count: 0
})
export const mutations = {
  addNUm (state) {
    state.count ++
  }
}
