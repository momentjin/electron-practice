<template>
  <button v-if="!moreButton" @click="loadMore">더보기</button>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      moreButton: false
    };
  },
  computed: {
    ...mapState(["filteredCoverletters", "pageInfo"])
  },
  watch: {
    pageInfo: function(val) {
      this.moreButton = val.currentPageNo == val.totalPageNum;
    }
  },
  methods: {
    ...mapGetters(["isLastPage"]),
    ...mapActions(["FETCH_COVERLETTERS"]),
    loadMore() {
      const nextPage = this.pageInfo.currentPageNo + 1;
      this.FETCH_COVERLETTERS({ pageNo: nextPage });
    }
  }
};
</script>

<style scoped>
    button {
        width: 100%;
        margin-top: 20px;
        padding: 5px;
        text-align: center;
        background-color: #E3E3E3;
        border-radius: 20px 20px 20px 20px;
        font-weight: bold;
    }
</style>