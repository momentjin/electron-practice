<template>
  <div class="coverletter-container">
    <coverletter-no-item v-if="!filteredCoverletters.length" />
    <div v-else>
      <coverletter-item
        v-for="coverletter in filteredCoverletters"
        :key="coverletter.id"
        :coverletter="coverletter"
      />
      <coverletter-more-btn />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CoverletterItem from "@/components/coverletter/CoverletterItem.vue";
import CoverletterNoItem from "@/components/coverletter/CoverletterNoItem.vue";
import CoverletterMoreBtn from "@/components/coverletter/CoverletterMoreBtn.vue";

export default {
  components: { CoverletterMoreBtn, CoverletterItem, CoverletterNoItem },
  computed: {
    ...mapState(["coverletters", "filteredCoverletters"]),
  }
};
</script>

<style>
.coverletter-container {
  margin: 1px;
  max-height: 90vh; /* TODO : 현재 화면의 높이로 설정해야 한다. * */
  overflow: scroll;
}
</style>
