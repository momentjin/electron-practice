<template>
  <button v-if="active" @click="loadMore">더보기</button>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["pageInfoForQuestion", "isSearchViewForQuestion"]),
    active() {
      debugger;
      const { currentPageNo, totalPageNum } = this.pageInfoForQuestion;
      return currentPageNo < totalPageNum && !this.isSearchViewForQuestion;
    }
  },
  methods: {
    ...mapActions(["FETCH_QUESTIONS"]),
    loadMore() {
      const nextPage = this.pageInfoForQuestion.currentPageNo + 1;
      this.FETCH_QUESTIONS({ pageNo: nextPage });
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
  background-color: #e3e3e3;
  border-radius: 20px 20px 20px 20px;
  font-weight: bold;
}
</style>