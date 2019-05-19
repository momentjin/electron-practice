const getters = {
    findCoverletterById: state => id => {
        return state.coverletter.find(coverletter=>coverletter.id == id);
    }
}

export default getters;