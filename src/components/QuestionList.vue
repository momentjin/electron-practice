<template>
  <div class="view_wrapper questions">
    <question-item v-for="(q, index) in questions" :key="q.id" :question="q" :idx="index" :removeQuestion="removeQuestion"/>
    <v-btn block color="secondary" dark @click="addQuestionForm">문항 +</v-btn>
  </div>
</template>

<script>
import QuestionItem from "../components/QuestionItem";
import { mapMutations } from 'vuex';

export default {
  components: { QuestionItem },
  props: ['questions'],
  data() {
    return {
      // questions: [],
      maxQuestionNum: 6
    };
  },
  created() {
    // this.questions = this.questionsProp;
  },
  methods: {
    ...mapMutations([
      "DELETE_QUESTION"
    ]),
    addQuestionForm() {
      if (this.questions.length >= this.maxQuestionNum) {
        alert("문항을 더 이상 추가할 수 없습니다.");
        return;
      }

      this.questions.push({title:'', contents:'', hashtags: []});
    },
    removeQuestion(questionId) {
      debugger;
      this.DELETE_QUESTION({cid:this.$route.params.cid, qid:questionId});
      // this.questions = this.questions.filter((question, idx) => idx != questionId);
    }
  }
};
</script>

<style>
</style>
