<template>
  <div class="coverletter-container">
    <coverletter-no-item v-if="!filteredQuestions.length" />
    <div v-else>
      <question-item v-for="question in filteredQuestions" :key="question.id" :question="question" />
    </div>
    <question-more-btn />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CoverletterNoItem from "@/components/coverletter/CoverletterNoItem.vue";
import QuestionItem from "@/components/question/QuestionItem.vue";
import QuestionMoreBtn from "@/components/question/QuestionMoreBtn.vue";

export default {
  components: { CoverletterNoItem, QuestionItem, QuestionMoreBtn },
  computed: {
    ...mapState(["filteredQuestions"])
  }
};
</script>

<style>
</style>