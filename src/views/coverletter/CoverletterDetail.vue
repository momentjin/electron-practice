<template>
  <div class="main-container">
    <coverletter-nav :questions="coverletter.questions" :coverletterId="coverletter.id" />
    <main>
      <div class="menu-container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import CoverletterNav from "@/components/coverletter/CoverletterNav.vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: { CoverletterNav },
  data() {
    return {
      edit: false
    };
  },
  created() {
    const coverletterId = this.$route.params.cid;
    if (coverletterId == "new") {
      this.INIT_COVERLETTER();
    } else {
      this.fetchCoverletter(coverletterId);
    }
  },
  computed: {
    ...mapGetters(["findCoverletterById"]),
    ...mapState(["coverletterNewIndex"]),
    coverletter() {
      if (this.$route.params.cid == "new") {
        return this.findCoverletterById(this.coverletterNewIndex);
      }

      return (
        this.findCoverletterById(this.$route.params.cid) || {
          coverletter: { questions: [] }
        }
      );
    }
  },
  methods: {
    ...mapMutations(["INIT_COVERLETTER"]),
    ...mapActions(["FETCH_COVERLETTER"]),
    fetchCoverletter(coverletterId) {
      this.FETCH_COVERLETTER({ id: coverletterId })
        .then(data => {
          this.coverletter = data;
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
</style>
