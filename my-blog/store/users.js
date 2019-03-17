export const state = () => ({
  username: 'october'
})

export const mutations = {
  changeName(state, text) {
    state.username = text
  }
}
