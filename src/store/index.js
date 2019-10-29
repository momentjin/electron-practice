import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const store = new Vuex.Store({
    actions,
    getters,
    mutations,
    state,
    strict: true
});

store.commit('SET_TOKEN', localStorage.token);

export default store