<template>
  <div>
    자기소개서 상세화면
    {{this.coverletter.companyName}}
    <p v-for="q in this.coverletter.questions" :key="q.id" :id="q.id">
        {{q.title}} <br>
        {{q.contents}}
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  created() {
    this.getCoverletter();
  },
  computed: {
    ...mapState(["coverletter"])
  },
  methods: {
    ...mapActions(["FETCH_COVERLETTER"]),
    getCoverletter() {
      const coverletterId = this.$route.params.cid;
      debugger;
      this.FETCH_COVERLETTER(coverletterId);
    }
  }
};
</script>

<style>
</style>
