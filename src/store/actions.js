import * as api from '../api'

const actions = {
  FETCH_COVERLETTERS({ dispatch, commit }) {
    return api.coverletter.fetch()
      .then(data => commit('SET_COVERLETTERS', data.coverletters))
      .then(() => dispatch('FETCH_HASHTAGS'));
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
  FETCH_QUESTIONS_BY_HASHTAG({ commit }, hashtag) {
    return api.question.fetchByhashtags(hashtag)
      .then(data => commit('SET_QUESTIONS', data));
  },
  FETCH_HASHTAGS({ commit }) {
    return api.hashtag.fetch()
      .then(data => commit('SET_HASHTAGS', data));
  }
}

export default actions;