import * as api from '../api'

const actions = {
  FETCH_COVERLETTERS({ commit }) {
      return api.coverletter.fetch()
      .then(data => commit('SET_COVERLETTERS', data.coverletters));
  },
  TOGGLE_DATA({ dispatch }, id, flag) {
    return api.coverletter.UPDATE_TOGGLE_DATA(id, flag)
      .then(_=>dispatch("FETCH_COVERLETTERS"));
  }
}

export default actions;