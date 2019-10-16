const state = {
    token: null,
    totalCoverletterNum: 0,
    coverletters: [],
    filteredCoverletters: [],
    coverletter: [],
    coverletterNewIndex: -1,
    questions: [],
    hashtags: [],
    memberInfo: {
        profileImageUrl: '',
        id: '',
        name: '',
        motto: ''
    },
    notifications: [],
    pageInfo: {
        currentPageNo: 1,
        totalPageNum: 1,
    },
    isSearchView: false
};

export default state;