<template>
  <div class="coverletter-item" @click="openNewCoverletter">여기를 눌러서 자기소개서를 작성해보세요!</div>
</template>

<script>
export default {
  methods: {
    openNewCoverletter() {
      const popup = window.open(
        `coverletters/new/info`,
        `coverletter_new`,
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
/* .coverletter-item -> CoverletterItem과 동일 */
</style>