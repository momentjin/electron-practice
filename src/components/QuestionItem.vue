<template>
  <div>
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
export default {
  props: ["question", "removeQuestion", "idx", "coverletterId"],
  computed: {
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
