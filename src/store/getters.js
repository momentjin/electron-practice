const getters = {
    findCoverletterById: state => id => {
        debugger;
        return state.coverletter.find(coverletter => coverletter.id == id);
    },
    findQuestionById: state => (cid, pid) => {
        const coverletter = state.coverletter.find(coverletter => coverletter.id == cid);
        if (!coverletter || !coverletter.questions)
            return undefined;

        return coverletter.questions.find(x => x.id == pid);
    },
    isAuth: state => () => {
        return !!state.token;
    },
    getMemberInfo: state => () => {
        return state.memberInfo;
    },
    isLastPage: state => {
        debugger;
        const { currentPageNo, totalPageNum } = state.pageInfo;
        return currentPageNo == totalPageNum;
    }
}

export default getters;