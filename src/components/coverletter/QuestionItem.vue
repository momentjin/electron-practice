<template>
  <div>
    <!-- TODO : 읽기모드일 때는 단순히 chip만 보여주기 -->
    <!-- 
      위 todo에 대해 다음 코드를 참고하기. 
      - https://next.vuetifyjs.com/ko/components/combobox#multiple-combobox 
    -->
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
          <v-chip :key="JSON.stringify(data.item)" @click="onClickHashtag">{{ data.item }}</v-chip>
        </template>
      </v-combobox>
    </div>
    <div class="question-item text-xs-right">
      <a href="#" @click.prevent="executeRemoveQuestion">X</a>
    </div>
    <div class="question-item down">
      <v-text-field v-model="title" label="문항 제목" :rules="[v => !!v || '문항 제목을 입력해주세요']"/>
      <v-textarea
        v-model="contents"
        label="문항 내용"
        v-bind:auto-grow="true"
        row-height="5"
        :rules="[v => !!v || '문항 내용을 입력해주세요.']"
      ></v-textarea>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  props: ["question", "removeQuestion", "idx", "coverletterId"],
  data() {
    return {
      search: null
    };
  },
  computed: {
    ...mapState(["hashtags"]),
    selectedHashtags: {
      get() {
        return this.question.hashtags;
      },
      set(hashtags) {
        this.SET_HASHTAGS_IN_QUESTION({
          cid: this.coverletterId,
          qid: this.idx,
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
    ...mapActions(["FETCH_QUESTIONS_BY_HASHTAG"]),
    ...mapMutations(["SET_HASHTAGS_IN_QUESTION"]),
    executeRemoveQuestion() {
      this.removeQuestion(this.idx);
    },
    updateQuestion(data) {
      this.$store.commit("SET_QUESTION", {
        cid: this.coverletterId,
        pid: this.idx,
        title: data.title || this.title,
        contents: data.contents || this.contents
      });
    }
  }
};
</script>

<style>
.question-item {
  /* padding: 5px; */
  border: 1px solid black;
}

.down {
  margin-bottom: 10px;
}
</style>
