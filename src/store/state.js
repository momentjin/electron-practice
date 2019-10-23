const state = {
    token: null,
    totalCoverletterNum: 0,
    coverletters: [],
    filteredCoverletters: [],
    coverletter: [],
    coverletterNewIndex: -1,
    totalQuestionNum: 0,
    questions: [],
    filteredQuestions: [],
    hashtags: [],
    memberInfo: {
        id: '',
        name: '',
        motto: ''
    },
    notifications: [],
    pageInfo: {
        currentPageNo: 1,
        totalPageNum: 1,
    },
    pageInfoForQuestion: {
        currentPageNo: 1,
        totalPageNum: 1,
    },
    isSearchView: false,
    isSearchViewForQuestion: false,
    profileImage: '',
};

export default state;