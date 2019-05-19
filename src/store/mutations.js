const mutations = {
    SET_COVERLETTERS(state, coverletters) {
        state.coverletters = coverletters;
    },
    SET_COVERLETTER(state, coverletter) {
        state.coverletter.push(coverletter);
    },
    SET_COMPANY_NAME(state, { cid, value }) {
        getCoverletter(state, cid).companyName = value;
    },
    SET_APPLICATION_YEAR(state, { cid, value }) {
        getCoverletter(state, cid).applicationYear = value;
    },
    SET_APPLICATION_TYPE(state, { cid, value }) {
        getCoverletter(state, cid).applicationType = value;
    },
    SET_APPLICATION_HALF(state, { cid, value }) {
        getCoverletter(state, cid).applicationHalf = value;
    },
    SET_IS_APPLICATION(state, { cid, value }) {
        getCoverletter(state, cid).application = value;
    },
    SET_IS_PASS(state, { cid, value }) {
        getCoverletter(state, cid).pass = value;
    },
    SET_JOB_TYPE(state, { cid, value }) {
        getCoverletter(state, cid).jobType = value;
    },
    SET_DEADLINE(state, { cid, value }) {
        getCoverletter(state, cid).deadline = value;
    },
    SET_QUESTION(state, { cid, pid, title, contents }) {
        const coverletter = state.coverletter.find(c => c.id == cid);
        if (!coverletter)
            throw `could not found coverletter (${cid})`;

        var findQuestion = coverletter.questions.find((q, index) => index == pid)
        if (!findQuestion)
            throw `could not found question (${pid})`;

        if (title) findQuestion.title = title;
        if (contents) findQuestion.contents = contents;
    },
    DELETE_QUESTION(state, { cid, qid }) {
        state.coverletter.find(c => c.id == cid).questions = state.coverletter.find(c => c.id == cid).questions.filter((q, index) => index != qid);
    },
    INIT_COVERLETTER(state) {
        state.coverletter.push({
            id: 0,
            companyName: '',
            applicationYear: 2019,
            applicationHalf: 0,
            applicationType: 0,
            jobType: '',
            deadline: '',
            application: false,
            pass: false,
            questions: []
        });
    },
    ADD_QUESTION_FORM(state, { cid }) {
        state.coverletter.find(c => c.id == cid).questions.push(
            { title: "", contents: "", hashtags: [] }
        );
    }
};

function getCoverletter(state, cid) {
    const findCoverletter = state.coverletter.find(c => c.id == cid);
    if (!findCoverletter) throw `could not found coverletter ${cid}`;

    return findCoverletter;
}

export default mutations;