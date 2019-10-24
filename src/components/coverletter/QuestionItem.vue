<template>
  <div>
    <div>
      <div v-if="!question">로딩중입니다.</div>
      <div v-else>
        <my-header title="문항 정보" :buttons="headerButtons"></my-header>
        <div class="hashtag_container">
          <div class="coverletter_info_row row_type1">
            <label class="info-title" for="title">문항 태그</label>
            <div>
              <v-combobox
                v-model="selectedHashtags"
                :items="hashtags"
                :search-input.sync="search"
                hide-selected
                multiple
                persistent-hint
                small-chips
                item-text="value"
              >
                <template v-slot:selection="data">
                  <v-chip :key="JSON.stringify(data.item)">{{ data.item }}</v-chip>
                </template>
              </v-combobox>
            </div>
          </div>
        </div>
        <div class="coverletter_info_row row_type1">
          <label class="info-title" for="title">문항 제목</label>
          <input class="info-field" id="title" type="text" v-model="title" />
        </div>
        <div class="coverletter_info_row row_type1 contents">
          <label class="info-title" for="contents">
            문항 내용
            <span class="count">{{ contents.length }}글자</span>
          </label>
          <textarea class="info-field" id="contents" v-model="contents" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/common/MyHeader.vue";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";

export default {
  components: { MyHeader },
  data() {
    return {
      search: "",
      headerButtons: [
        {
          title: "deleteQuestion",
          icon: "delete",
          action: this.onRemove
        },
        {
          title: "saveCoverletter",
          icon: "save",
          action: this.onSave
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
        this.SET_HASHTAGS_IN_QUESTION({
          cid: this.coverletterId,
          qid: this.questionId,
          hashtags
        });
      }
    },
    title: {
      get() {
        return this.question.title;
      },
      set(value) {
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
        title: data.title || this.title,
        contents: data.contents || this.contents
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
textarea {
  min-height: 400px;
  max-height: 400px;
  border: 1px solid pink;
  overflow: scroll;
  resize: none;
}

.count {
  color: #a8a8a8;
  font-size: 13px;
}
</style>
