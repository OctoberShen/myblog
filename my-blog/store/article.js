export const state = () => ({
  _id: null, //当前文章的_id
  TAG: '', //当前选中的tag
  ARTICLE: [] //全部文章
})

export const mutations = {
  GET_ID (state, value) {
    state._id = value
  },
  GET_TAG (state, value) {
    state.TAG = value
  },
  GET_ARTICLE(state, value) {
    state.ARTICLE = value
  }
}

export const actions = {
  // async nuxtServerInit({commit}, {app}) {
  //   let {data} = await app.$axios.$get('/api/getComponentsData');
  //   commit('setComponentsData', data);
  // }
}
