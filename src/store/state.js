const state = {
    token: null,
    coverletters: [],
    coverletter: {
       "id": 0,
       "companyName": "",
       "applicationYear": new Date().getFullYear(),
       "applicationType": "",
       "applicationHalf": "",
       "application": false,
       "pass": false,
       "jobType": "",
       "deadline": "",
       "questions": []
    }
};

export default state;