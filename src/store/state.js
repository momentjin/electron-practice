const state = {
    token: null,
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
    notifications: [
        {
          id: 0,
          coverletterId: 1,
          isChecked: true,
          contents: "삼성전자 서류 제출 마감일이 N일 남았습니다.",
          createDate: "2019-09-22T13:00"
        },
        {
          id: 1,
          coverletterId: 1,
          isChecked: true,
          contents: "0000자기소개서가 N일 남았습니다.",
          createDate: "2019-09-22T13:00"
        },
        {
          id: 2,
          coverletterId: 1,
          isChecked: false,
          contents: "0000자기소개서가 N일 남았습니다.",
          createDate: "2019-09-22T13:00"
        }
      ]
};

export default state;