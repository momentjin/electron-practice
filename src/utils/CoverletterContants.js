const APPLICATION_HALFS = [
    { key: 0, value: "상반기" },
    { key: 1, value: "하반기" },
    { key: 2, value: "수시" },
    { key: 3, value: "기타" }
];

const APPLICATION_TYPES = [
    { key: 0, value: "인턴" },
    { key: 1, value: "신입" },
    { key: 2, value: "경력" },
    { key: 3, value: "기타" }
  ];

const IS_APPLICATIONS = [
    { key: 0, value: "대기" },
    { key: 1, value: "미지원" },
    { key: 2, value: "지원완료" },
    { key: 3, value: "기타" }
];

const IS_PASSES = [
    { key: 0, value: "대기" },
    { key: 1, value: "합격" },
    { key: 2, value: "불합격" },
    { key: 3, value: "기타" }
];

const DEFAULT = 0;

const convert = {
    applicationHalf(val) {
       return getValueByKey(APPLICATION_HALFS, val);
    },
    applicationType(val) {
       return getValueByKey(APPLICATION_TYPES, val);
    },
    isApplication(val) {
       return getValueByKey(IS_APPLICATIONS, val);
    },
    isPass(val) {
        return getValueByKey(IS_PASSES, val);
    },
}

const getValueByKey = (items, key) => items.find(item => item.key == key).value || DEFAULT;

export { convert, APPLICATION_HALFS, APPLICATION_TYPES, IS_APPLICATIONS, IS_PASSES };