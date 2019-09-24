<template>
  <div class="view-container">
    <coverletter-nav :questions="coverletter.questions" />
    <router-view /> 
  </div>
</template>

<script>
import CoverletterNav from "../../components/coverletter/CoverletterNav.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { CoverletterNav },
  data() {
    return {
      edit: false
    };
  },
  beforeMount() {
    const coverletterId = this.$route.params.cid;
    this.fetchCoverletter(coverletterId);
  },
  computed: {
    ...mapGetters(["findCoverletterById"]),
    coverletter() {
      return this.findCoverletterById(this.$route.params.cid) || { coverletter: { questions: [] }} ;
    }
  },

  methods: {
    ...mapActions(["FETCH_COVERLETTER"]),
    fetchCoverletter(coverletterId) {
      this.FETCH_COVERLETTER(coverletterId)
        .then(data => {
          this.coverletter = data;
          debugger;
        })
        .catch(e => {
          alert(e.data.message || "server errror!");
          this.$router.push("/coverletters");
        });
    }
  }
};
</script>

<style>
.view-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.item2 {
  background-color: white;
  flex-grow: 1;
}
</style>
