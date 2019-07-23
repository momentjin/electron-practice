const getters = {
    findCoverletterById: state => id => {
        return state.coverletter.find(coverletter=>coverletter.id == id);
    },
    isAuth: state => () => {
        return !!state.token;
    },
    getMemberInfo: state => () => {
        return state.memberInfo;
    }
}

export default getters;