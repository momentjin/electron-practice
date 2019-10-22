<template>
  <div class="menu-container">
    <my-header
      title="문항"
      :subData="totalQuestionNum"
      :buttons="headerButtons"
      :onClickHeaderTitle="onClickHeaderTitle"
    />
    <question-search-bar :placeHolderValue="placeHolderValue" />
    <question-list />
  </div>
</template>

<script>
import MyHeader from "@/components/common/MyHeader.vue";
import QuestionSearchBar from "@/components/question/QuestionSearchBar.vue";
import QuestionList from "@/components/question/QuestionList.vue";

import { mapActions, mapState } from "vuex";

export default {
  components: {
    MyHeader,
    QuestionList,
    QuestionSearchBar
  },
  data() {
    return {
      placeHolderValue:
        "해시태그를 공백으로 구분해서 입력하고 'Enter' 키를 눌러 검색 (예시: 지원동기 포부 성장)",
      headerButtons: [
        {
          title: "addCoverletter",
          icon: "playlist_add",
          action: this.onClickAddBtn
        }
      ]
    };
  },
  computed: {
    ...mapState(["totalQuestionNum", "pageInfoForQuestion"])
  },
  created() {
    this.getQuestions();
  },
  methods: {
    ...mapActions(["FETCH_QUESTIONS"]),
    getQuestions() {
      this.FETCH_QUESTIONS({ pageNo: this.pageInfoForQuestion.currentPageNo });
    },
    onClickAddBtn() {
      const popup = window.open(
        "/coverletters/new/info",
        `coverletter_new`,
        "width=500,height=700"
      );

      const self = this;

      // TODO : VUEX 공유문제 임시 처리
      popup.onload = function() {
        popup.onbeforeunload = function() {
          self.FETCH_COVERLETTERS();
        };
      };
    },
    onClickHeaderTitle() {
      this.$router.push("/coverletters");
    }
  }
};
</script>

<style>
.menu-container {
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
}
</style>

