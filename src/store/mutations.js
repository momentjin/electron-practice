const mutations = {
    SET_COVERLETTERS(state, coverletters) {
        state.coverletters = coverletters;
    },
    TOGGLE_DATA(state, id, flag) {
        const coverletter = state.coverletters.find(coverletter => coverletter.id == id);
        coverletter.isApplication = flag;
    }
}

export default mutations;