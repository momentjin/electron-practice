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
  },
  GET_MEMBER_INFO({ commit }) {
    return api.member.getMemberInfo()
      .then(data => commit('SET_MEMBER_INFO', data));
  },
  SIGN_UP(_, data) {
    return api.member.signUp(data);
  },
  SIGN_IN({ commit }, data) {
    return api.member.signIn(data)
      .then(data => commit('SET_TOKEN', data));
  },
  UPDATE_MEMBER_INFO({ dispatch }, data) {
    return api.member.updateMemberInfo(data)
      .then(() => dispatch('GET_MEMBER_INFO'));
  }
}

export default actions;