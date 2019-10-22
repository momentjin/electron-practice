<template>
  <div class="coverletter-item" @click.stop="onClickItem">
    <div class="coverletter-item-main">
      <div class="coverletter-item-title">[{{question.companyName}}]</div>
      <div class="coverletter-item-title">Q. {{question.title}}</div>
      <div class="coverletter-item-info">
        <span
          class="hashtag-item"
          v-for="(hashtag, idx) in question.hashtags"
          :key="idx"
        >#{{hashtag}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["question"],
  methods: {
    onClickItem() {
      const popup = window.open(
        `coverletters/${this.question.coverletterId}/questions/${this.question.id}`,
        `question${this.question.id}`,
        "width=500,height=700"
      );

      const self = this;

      popup.onload = function() {
        popup.onbeforeunload = function() {
          self.FETCH_COVERLETTERS();
        };
      };
    }
  }
};
</script>

<style>
.hashtag-item {
  margin-right: 5px;
}
</style>