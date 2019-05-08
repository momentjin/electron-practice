import * as api from '../api'

const actions = {
  FETCH_COVERLETTERS({ commit }) {
      return api.coverletter.fetch()
      .then(data => commit('SET_COVERLETTERS', data.coverletters));
  },
  FETCH_COVERLETTER({ commit }, id) {
    return api.coverletter.fetch(id)
      .then(data => {
        debugger;
        commit('SET_COVERLETTER', data)
      });
  },
  SAVE_COVERLETTER({ commit }, data) {
    return api.coverletter.save(data)
  },
  UPDATE_COVERLETTER({ commit }, data) {
    debugger;
    return api.coverletter.update(data).then(response => {
      debugger;
      return response
    });
  },
  DELETE_COVERLETTER({ commit }, id) {
    return api.coverletter.delete(id);
  }
}

export default actions;