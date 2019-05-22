<template>
  <div>
    <!-- 여기는 본인이 갖고 있는 모든 해시태그여야 함ㄴ -->
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
      ></v-combobox>
    </div>
    <div class="question-item text-xs-right">
      <a href="#" @click.prevent="removeQuestion1">X</a>
    </div>
    <div class="question-item down">
      <v-text-field v-model="title" label="문항 제목" required/>
      <v-textarea v-model="contents" label="문항 내용" v-bind:auto-grow="true" row-height="5"></v-textarea>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: ["question", "removeQuestion", "idx", "coverletterId"],
  data() {
    return {
      search: null // 이걸 computed로 넘겨서,, hashtag가 추가될 때 id를 0 설정해서 객체로 넘기면?!
    };
  },
  computed: {
    ...mapState(["hashtags"]),
    selectedHashtags: {
      get() {
        return this.question.hashtags;
      },
      set(hashtags) {
        this.SET_HASHTAGS_IN_QUESTION({cid: this.coverletterId, qid: this.idx, hashtags});
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
    ...mapMutations(["SET_HASHTAGS_IN_QUESTION"]),
    removeQuestion1() {
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
