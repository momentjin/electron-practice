<template>
  <button v-if="active" @click="loadMore">더보기</button>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["pageInfo", "isSearchView"]),
    active() {
      const { currentPageNo, totalPageNum } = this.pageInfo;
      return currentPageNo < totalPageNum && !this.isSearchView;
    }
  },
  methods: {
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
  background-color: #e3e3e3;
  border-radius: 20px 20px 20px 20px;
  font-weight: bold;
}
</style>