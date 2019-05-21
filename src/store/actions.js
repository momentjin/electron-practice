import * as api from '../api'

const actions = {
  FETCH_COVERLETTERS({ commit }) {
    return api.coverletter.fetch()
      .then(data => commit('SET_COVERLETTERS', data.coverletters));
  },
  FETCH_COVERLETTER({ commit }, id) {
    return api.coverletter.fetch(id)
      .then(data => commit('SET_COVERLETTER', data));
  },
  CREATE_COVERLETTER(_, data) {
    return api.coverletter.create(data)
  },
  UPDATE_COVERLETTER(_, data) {
    return api.coverletter.update(data);
  },
  DELETE_COVERLETTER(_, id) {
    return api.coverletter.delete(id);
  },
  FETCH_HASHTAGS({ commit }) {
    return api.hashtag.fetch()
      .then(data => commit('SET_HASHTAGS', data));
  }
}

export default actions;