const history = {
  state: {
    history: []
  },
  mutations: {
    SET_HISTORY: (state, current) => {
      state.history.push(current)
      //去重
      state.history = state.history.filter((item, index, arr) => arr.indexOf(item) === index)
    },
    DELETE_HISTORY: (state, current) => {
      state.history = state.history.filter(item => item !==current)
    },
    CLEAR_HISTORY: (state, current) => {
      state.history = []
    }
  },
  namespaced: true
}

export default history
