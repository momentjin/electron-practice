<template>
  <div>
    <div>
      <div v-if="!question">로딩중입니다.</div>
      <div v-else>
        <my-header title="문항 정보" :buttons="headerButtons"></my-header>
        <div class="my-form-row">
          <my-combo-box label="문항 태그" :datas="hashtags" :item.sync="selectedHashtags" :maxLength="5" />
        </div>
        <div class="my-form-row">
          <my-input label="문항 제목" :required="true" :maxLength="200" :value.sync="title" />
        </div>
        <div class="my-form-row">
          <my-text-area label="문항 내용" :showLength="true" :value.sync="contents" />
        </div>
      </div>
    </div>
  </div>
</template>

1. 문항 태그 5개이상 추가 불가능 로직 만들기
2. chip에 x버튼 만들기 (지울려면 이전꺼 다지워야해서)


<script>
import MyHeader from "@/components/common/MyHeader.vue";
import MyInput from "@/components/common/MyInput.vue";
import MyTextArea from "@/components/common/MyTextArea.vue";
import MyComboBox from "@/components/common/MyComboBox.vue";

import { mapGetters, mapMutations, mapActions, mapState } from "vuex";

export default {
  components: { MyHeader, MyInput, MyTextArea, MyComboBox },
  data() {
    return {
      search: "",
      headerButtons: [
        {
          title: "deleteQuestion",
          icon: "delete",
          action: this.onRemove,
          tooltip: "현재 문항을 삭제합니다."
        },
        {
          title: "saveCoverletter",
          icon: "save",
          action: this.onSave,
          tooltip: "자기소개서를 저장합니다."
        }
      ]
    };
  },
  computed: {
    ...mapState(["hashtags", "coverletterNewIndex"]),
    ...mapGetters(["findQuestionById", "findCoverletterById"]),
    questionId() {
      return this.$route.params.qid;
    },
    coverletterId() {
      return this.$route.params.cid == "new"
        ? this.coverletterNewIndex
        : this.$route.params.cid;
    },
    coverletter() {
      return this.findCoverletterById(this.coverletterId);
    },
    question() {
      return this.findQuestionById(this.coverletterId, this.questionId);
    },
    selectedHashtags: {
      get() {
        return this.question.hashtags;
      },
      set(hashtags) {
        debugger;
        this.SET_HASHTAGS_IN_QUESTION({
          cid: this.coverletterId,
          qid: this.questionId,
          hashtags
        });
      }
    },
    title: {
      get() {
        debugger;
        return this.question.title;
      },
      set(value) {
        debugger;
        this.updateQuestion({ title: value });
      }
    },
    contents: {
      get() {
        return this.question.contents;
      },
      set(value) {
        this.updateQuestion({ contents: value });
      }
    }
  },
  methods: {
    ...mapMutations(["DELETE_QUESTION"]),
    ...mapActions([
      "CREATE_COVERLETTER",
      "UPDATE_COVERLETTER",
      "DELETE_COVERLETTER"
    ]),
    ...mapMutations(["SET_HASHTAGS_IN_QUESTION"]),
    executeRemoveQuestion() {
      this.removeQuestion(this.idx);
    },
    updateQuestion(data) {
      const coverletterId = this.coverletterId;

      this.$store.commit("SET_QUESTION", {
        cid: coverletterId,
        pid: this.question.id,
        title: data.title != undefined ? data.title : this.title,
        contents: data.contents != undefined ? data.contents : this.contents
      });
    },
    onSave() {
      if (this.$route.params.cid == "new") {
        this.CREATE_COVERLETTER(this.coverletter)
          .then(() => alert("자기소개서가 저장되었습니다"))
          .catch(() => alert("오류"));
      } else {
        this.UPDATE_COVERLETTER(this.coverletter)
          .then(() => {
            alert("자기소개서가 수정되었습니다.");
          })
          .catch(() => alert("오류"));
      }
    },
    onRemove() {
      if (!confirm("해당 문항을 삭제하시겠습니까?")) return;

      this.DELETE_QUESTION({
        cid: this.coverletterId,
        qid: this.questionId
      });

      const cid = this.$route.params.cid;
      this.$router.push(`/coverletters/${cid}/info`);
    }
  }
};
</script>

<style>
.form-item-field2 {
  width: 100%;
}
</style>
