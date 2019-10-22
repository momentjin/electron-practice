import * as api from '../api'

const actions = {
    FETCH_QUESTIONS({ commit }, { pageNo }) {
        return api.question.fetch({ pageNo })
            .then(data => {
                commit('SET_QUESTIONS', data.content);
                commit('SET_TOTAL_QUESTION_NUM', data.totalElements);
                commit('SET_PAGE_INFO_FOR_QUESTION', { pageNo: pageNo, totalPageNum: data.totalPages });
            });
    },
    FETCH_COVERLETTERS({ dispatch, commit }, { pageNo }) {
        return api.coverletter.fetch({ pageNo })
            .then(data => {
                commit('SET_COVERLETTERS', data.content);
                commit('SET_TOTAL_COVERLETTER_NUM', data.totalElements);
                commit('SET_PAGE_INFO', { pageNo: pageNo, totalPageNum: data.totalPages });
            })
            .then(() => dispatch('FETCH_HASHTAGS'))
            .then(() => dispatch('FETCH_NOTIFICATIONS'))
    },
    FETCH_COVERLETTER({ commit }, { id }) {
        return api.coverletter.fetch({ id })
            .then(data => {
                commit('SET_COVERLETTER', data)
            });
    },
    SEARCH_COVERLETTERS_BY_COMPANY_NAME({ commit }, { companyName }) {
        return api.coverletter.search({ companyName })
            .then(data => {
                commit('SET_FILTERED_COVERLETTERS', data.coverletters);
            });
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
    FETCH_QUESTIONS_BY_HASHTAG({ commit }, { hashtags }) {
        return api.question.fetchByHashtags({ hashtags })
            .then(data => commit('SET_FILTERED_QUESTIONS', data));
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
    },
    CONVERT_FILES({ dispatch }, files) {
        return api.converter.convert(files)
            .then(res => {
                dispatch('FETCH_COVERLETTERS');
                return res;
            });
    },
    FETCH_NOTIFICATIONS({ commit }) {
        return api.notification.fetch()
            .then(data => commit('SET_NOTIFICATIONS', data));
    },
    CHECK_NOTIFICATION({ dispatch }, id) {
        return api.notification.check(id)
            .then(() => dispatch('FETCH_NOTIFICATIONS'));
    }
}

export default actions;