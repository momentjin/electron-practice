<template>
  <div class="my-container">
    <coverletter-item v-for="item in filteredCoverletters" :key="item.id" :coverletter="item" />
    <div v-if="!filteredCoverletters.length">
      <router-link to="/coverletters/new">여기를 눌러서 자기소개서를 작성해보세요!</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CoverletterItem from "./CoverletterItem.vue";

export default {
  components: { CoverletterItem },
  computed: {
    ...mapState(["filteredCoverletters"])
  }
};
</script>

<style>
.my-container {
  /* flex-grow: 1; */
  margin: 1px;
  /* max-height: 768px; * TODO : 현재 화면의 높이로 설정해야 하는데.. 흐어.. * */
  overflow: auto;
}
</style>
