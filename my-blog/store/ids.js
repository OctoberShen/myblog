export const state = () => ({
  IDS: 0
})

export const mutations = {
  SET_ID (state, value) {
    state.IDS = value
  }
}

export const actions = {
  async nuxtServerInit({commit}, {app}) {
    let {data} = await app.$axios.$get('/api/getComponentsData');
    commit('setComponentsData', data);
  }
}
