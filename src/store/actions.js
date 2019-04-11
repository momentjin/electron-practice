import * as api from '../api'

const actions = {
  FETCH_COVERLETTERS({ commit }) {
      return api.coverletter.fetch()
      .then(data => commit('SET_COVERLETTERS', data.coverletters));
  }
}

export default actions;