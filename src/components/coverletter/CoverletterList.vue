<template>
  <div class="my-container">
    <coverletter-item v-for="item in coverletters" :key="item.id" :coverletter="item" />
    <div v-if="!coverletters.length">
      <router-link to="/coverletters/new">여기를 눌러서 자기소개서를 작성해보세요!</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CoverletterItem from "./CoverletterItem.vue";

export default {
  components: { CoverletterItem },
  computed: {
    ...mapState(["coverletters"])
  },
  created() {
    this.getCoverletterList();
  },
  methods: {
    ...mapActions(["FETCH_COVERLETTERS"]),
    getCoverletterList() {
      this.FETCH_COVERLETTERS();
    }
  }
};
</script>

<style>
.my-container {
  flex-grow: 1;
  margin: 1px;
  max-height: 768px; /** 현재 화면의 헤이트를 계산해야하는데..? **/
  overflow: auto;
}
</style>
