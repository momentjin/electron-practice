const state = {
    token: null,
    coverletters: [{
            "id": 1,
            "companyName": "네이버",
            "applicationYear": 2018,
            "applicationType": 0,
            "applicationHalf": 1,
            "application": true,
            "pass": false,
            "jobType": "Backend",
            "deadline": "2018-12-08T18:00:00"
        },
        {
            "id": 2,
            "companyName": "카카오",
            "applicationYear": 2019,
            "applicationType": 2,
            "applicationHalf": 0,
            "jobType": "web developer",
            "application": false,
            "pass": false,
            "deadline": null
        }
    ],
    coverletter: {
       "id": 1,
       "companyName": "네이버",
       "applicationYear": 2018,
       "applicationType": "신입",
       "applicationHalf": "하반기",
       "application": true,
       "pass": false,
       "jobType": "Backend",
       "deadline": "2018-12-08T18:00:00",
       "questions": [
           {
               "id": 0,
               "title":"문항1",
               "contents":"본문1",
               "hashtags": ["태그1", "태그2", "태그3"]
           },
           {
               "id": 1,
               "title": "문항2",
               "contents": "본문2",
               "hashtags": ["태그1", "태그2"]
           },
           {
               "id": 2,
               "title": "문항3",
               "contents": "본문3",
               "hashtags": ["태그1", "태그3"]
           }
       ]
    }
};

export default state;