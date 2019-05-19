const mutations = {
    SET_COVERLETTERS(state, coverletters) {
        state.coverletters = coverletters;
    },
    SET_COVERLETTER(state, coverletter) {
        state.coverletter.push(coverletter);
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
    SET_QUESTION(state, { cid, pid, title, contents }) {
        const coverletter = state.coverletter.find(c => c.id == cid);
        if (!coverletter)
            throw `could not found coverletter (${cid})`;

        var findQuestion = coverletter.questions.find((q,index) => index == pid)
        if (!findQuestion)
            throw `could not found question (${pid})`;

        if (title) findQuestion.title = title;
        if (contents) findQuestion.contents = contents;
    },
    DELETE_QUESTION(state, { cid, qid }) {
        state.coverletter.find(c => c.id == cid).questions = state.coverletter.find(c => c.id == cid).questions.filter((q, index) => index != qid);
    }
}

export default mutations;