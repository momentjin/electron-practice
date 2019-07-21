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
        const coverletter = getCoverletter(state, cid);
        if (!coverletter)
            throw `could not found coverletter (${cid})`;

        var findQuestion = coverletter.questions.find((q, index) => index == pid)
        if (!findQuestion)
            throw `could not found question (${pid})`;

        if (title) findQuestion.title = title;
        if (contents) findQuestion.contents = contents;
    },
    DELETE_QUESTION(state, { cid, qid }) {
        const coverletter = getCoverletter(state, cid);
        coverletter.questions = coverletter.questions.filter((q, index) => index != qid);
    },
    INIT_COVERLETTER(state) {
        state.coverletterNewIndex -= 1;

        const newCoverletterTemplate = {
            id: state.coverletterNewIndex,
            companyName: '',
            applicationYear: 2019,
            applicationHalf: 0,
            applicationType: 0,
            jobType: '',
            deadline: '',
            application: false,
            pass: false,
            questions: []
        };

        state.coverletter.push(newCoverletterTemplate);
    },
    ADD_QUESTION_FORM(state, { cid }) {
        state.coverletter.find(c => c.id == cid).questions.push(
            { title: "", contents: "", hashtags: [] }
        );
    },
    SET_QUESTIONS(state, questions) {
        state.questions = questions;
    },
    SET_HASHTAGS(state, hashtags) {
        state.hashtags = hashtags;
    },
    SET_HASHTAGS_IN_QUESTION(state, {cid, qid, hashtags}) {
        const coverletter = getCoverletter(state, cid);
        const question = coverletter.questions.find((q,index)=>index == qid);
        question.hashtags = hashtags;
    },
    SET_MEMBER_INFO(memberInfo) {
        state.memberInfo = memberInfo;ㅁㅃ
    },
    SET_TOKEN(state, token) {
        state.token = token;
    }
};

function getCoverletter(state, cid) {
    const findCoverletter = state.coverletter.find(c => c.id == cid);
    if (!findCoverletter) throw `could not found coverletter ${cid}`;

    return findCoverletter;
}

export default mutations;