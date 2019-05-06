const mutations = {
    SET_COVERLETTERS(state, coverletters) {
        state.coverletters = coverletters;
    },
    SET_COVERLETTER(state, coverletter) {
        state.coverletter = coverletter;
    },
    SET_COMPANY_NAME(state, value) {
        state.coverletter.companyName = value;
    },
    SET_APPLICATION_YEAR(state, value) {
        state.coverletter.applicationYear = value;
    },
    SET_APPLICATION_TYPE(state, value) {
        state.coverletter.applicationType = value;
    },
    SET_APPLICATION_HALF(state, value) {
        state.coverletter.applicationHalf = value;
    },
    SET_IS_APPLICATION(state, value) {
        state.coverletter.application = value;
    },
    SET_IS_PASS(state, value) {
        state.coverletter.pass = value;
    },
    SET_JOB_TYPE(state, value) {
        state.coverletter.jobType = value;
    },
    SET_DEADLINE(state, value) {
        state.coverletter.deadline = value;
    },
    SET_QUESTION(state, {id, title, contents}) {
      debugger;
        var findQuestion = state.coverletter.questions.find(q=>q.id == id)
        if (!findQuestion)
            throw 'not found question id : ' + id;

        if (title)
            findQuestion.title = title;
        if (contents)
            findQuestion.contents = contents;
    }
}

export default mutations;