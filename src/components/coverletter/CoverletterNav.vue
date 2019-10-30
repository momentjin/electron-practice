<template>
  <nav class="view-container">
    <ul>
      <!-- 자기소개서 지원 정보 버튼 -->
      <li>
        <my-icon
          color="white"
          :active="activeInfoIcon"
          :clickAction="onClickCoverletterInfo"
          :iconType="info_icon.name"
        />
      </li>

      <!-- 문항별 버튼 -->
      <li v-for="(q, index) in questions" :key="index">
        <my-icon
          :id="q.id"
          ref="questions"
          color="white"
          :active="q.active"
          :clickAction="onClickQuestion"
          :data-question-id="q.id"
          :altText="`Q${index+1}`"
        />
      </li>

      <!-- 문항 추가 버튼 -->
      <li>
        <my-icon color="white" :clickAction="onClickAddQuestion" iconType="add_circle" />
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MyIcon from "@/components/common/MyIcon.vue";

export default {
  components: { MyIcon },
  props: {
    questions: {
      type: Array,
      default: () => [],
      required: false
    },
    coverletterId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      info_icon: {
        name: "info"
      }
    };
  },
  mounted() {
    this.setActiveMenu();
  },
  watch: {
    questions() {
      this.setActiveMenu();
    },
    $route(to) {
      this.setActiveMenu(to.path);
    }
  },
  computed: {
    ...mapState(["coverletterNewIndex"]),
    activeInfoIcon() {
      return this.$route.name == "coverletterInfo";
    }
  },
  methods: {
    ...mapMutations(["ADD_QUESTION_FORM"]),
    setActiveMenu() {
      const { qid } = this.$route.params;

      if (!this.questions) return;
      // if (this.$route.name != "question") return;
      for (let question of this.questions) {
        if (qid == question.id) {
          question.active = true;
        } else {
          question.active = false;
        }
      }
    },
    onClickCoverletterInfo() {
      this.$router.push({ name: "coverletterInfo" });
    },
    onClickAddQuestion() {
      this.ADD_QUESTION_FORM({
        cid: this.coverletterId
      });
    },
    onClickQuestion(e) {
      const questionId = e.target.getAttribute("data-question-id");
      this.$router.push({ name: "question", params: { qid: questionId } });
    }
  }
};
</script>

<style>
.view-menu-item {
  color: #7b736e;
  font-size: 20px;

  text-align: center;
  padding: 5px;
  margin: 10px 5px 5px 5px;
}

.view-menu-item:hover {
  color: white;
  cursor: pointer;
}
</style>