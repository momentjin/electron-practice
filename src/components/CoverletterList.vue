<template>
  <div class="my-container">
    <coverletter-item v-for="item in coverletters" :key="item.id" :coverletter="item" />
    <div v-if="!coverletters.length" @click="this.$router.push('/coverletters/new')">여기를 눌러서 자기소개서를 작성해보세요!</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CoverletterItem from "./CoverletterItem";

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
  border: 1px solid black;
  flex-grow: 1;
  margin: 1px;
}
</style>
