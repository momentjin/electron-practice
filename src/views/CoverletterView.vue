<template>
  <div v-if="loading">로딩 중입니다.</div>
  <div v-else>
    <coverletter-info :coverletter="coverletter"/>
    <question-list :questions="coverletter.questions"/>
    <v-btn @click="deleteCoverletter"> 삭제 </v-btn>
    <v-btn @click="edit ? updateCoverletter() : createCoverletter()" color="secondary"> 저장 </v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CoverletterInfo from '../components/CoverletterInfo.vue';
import QuestionList from '../components/QuestionList.vue';

export default {
  components: { CoverletterInfo, QuestionList },
  data() {
    return {
      loading: false,
      edit: false,
    };
  },
  created() {
     if (this.$route.params.cid == 'new') {
      this.edit = false;
      return;
    }

    this.edit = true;
    this.getCoverletter();
  },
  computed: {
    ...mapGetters(["findCoverletterById"]),
    coverletter() {
      debugger;
      return this.findCoverletterById(this.$route.params.cid);
    }
  },
  methods: {
    ...mapActions([
      "FETCH_COVERLETTER",
      "CREATE_COVERLETTER",
      "UPDATE_COVERLETTER",
      "DELETE_COVERLETTER"
    ]),
    getCoverletter() {
      if(!this.edit) return;

      const coverletterId = this.$route.params.cid;
      this.loading = true;
      
      this.FETCH_COVERLETTER(coverletterId)
        .then(data=> { this.coverletter = data })
        .catch(e => {
          alert(e.data.message || "server errror!");
          this.$router.push("/coverletters");
        })
        .finally(() => (this.loading = false));
    },
    createCoverletter() {
      debugger;
      // this.CREATE_COVERLETTER(this.coverletter)
      //   .then(() => {
      //     alert("자기소개서가 저장되었습니다.");
      //     this.$router.push("/coverletters");
      //   })
      //   .catch(() => alert("오류"));
    },
    updateCoverletter() {
      debugger;
      this.UPDATE_COVERLETTER(this.coverletter)
        .then(() => {
          alert("자기소개서가 수정되었습니다.");
          this.$router.push("/coverletters");
        })
        .catch(e => {
          alert(e.data.message);
        });
    },
    deleteCoverletter() {
      if (!confirm("정말 삭제하시겠습니까?")) return;

      this.DELETE_COVERLETTER(this.coverletter.id).then(() =>
        this.$router.push("/coverletters")
      );
    }
  }
};
</script>

<style>
</style>
