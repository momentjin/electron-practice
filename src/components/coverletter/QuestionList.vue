<template>
  <div class="view_wrapper questions">
    <question-item
      v-for="(q, index) in questions"
      :key="q.id"
      :question="q"
      :idx="index"
      :removeQuestion="removeQuestion"
      :coverletterId="coverletterId"
    />
    <v-btn block color="secondary" dark @click="addQuestionForm">문항 +</v-btn>
  </div>
</template>

<script>
import QuestionItem from "./QuestionItem";
import { mapMutations } from "vuex";

export default {
  components: { QuestionItem },
  props: ["questions", "coverletterId"],
  data() {
    return {
      maxQuestionNum: 6
    };
  },
  methods: {
    ...mapMutations(["DELETE_QUESTION", "ADD_QUESTION_FORM"]),
    addQuestionForm() {
      if (this.questions.length >= this.maxQuestionNum) {
        alert("문항을 더 이상 추가할 수 없습니다.");
        return;
      }

      this.ADD_QUESTION_FORM({ cid: this.coverletterId });
    },
    removeQuestion(questionId) {
      this.DELETE_QUESTION({ cid: this.coverletterId, qid: questionId });
    }
  }
};
</script>

<style>
</style>
