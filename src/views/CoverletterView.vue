<template>
  <div v-if="loading"> 로딩 중입니다. </div>
  <div v-else>
    <!-- 자기소개서 지원 정보 -->
    <div class="coverletter_info">
      <v-text-field v-model="companyName" label="기업명" required/>
      <v-text-field v-model="applicationYear" label="지원연도" required />
      <v-text-field v-model="applicationType" label="지원종류" required />
      <v-text-field v-model="applicationHalf" label="지원분기" required />
      <v-text-field v-model="isApplication" label="지원여부" required />
      <v-text-field v-model="isPass" label="합격여부" required />
      <v-text-field v-model="jobType" label="직무" required />
      <v-text-field v-model="deadline" label="마감일" required />
    </div>

    <!-- 자기소개서 문항 리스트 -->
    <div class="questions">
      <div v-for="q in this.coverletter.questions" :key="q.id" :id="q.id">
        <div>
          <v-chip v-for="t in q.hashtags" :key="t.index">
            <strong>{{ t.value }}</strong>&nbsp;
          </v-chip>
        </div>
        <input type="text" :value="q.title" @input="v => updateQuestion({id:q.id, title:v})">
        <v-textarea outline :value="q.contents" @input="v => updateQuestion({id:q.id, contents:v})"></v-textarea>
      </div>
    </div>

    <!-- 버튼 -->
    <button @click="edit ? updateCoverletter() : createCoverletter()"> {{edit ? '수정' : '저장'}} </button> &nbsp; 
    <button @click="deleteCoverletter"> 삭제 </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      loading: false,
      edit: false
    }
  },
  created() {
    // 신규일 때
    if (this.$route.params.cid == 'new') {
      this.edit = false;
      this.INIT_COVERLETTER();
      return;
    }

    // 디테일 조회일 때
    this.edit = true;
    this.getCoverletter();
  },
  computed: {
    ...mapState(["coverletter"]),
    companyName: {
      get() { return this.coverletter.companyName },
      set(value) { return this.$store.commit("SET_COMPANY_NAME", value) }
    },
    applicationYear: {
      get() { return this.coverletter.applicationYear },
      set(value) { this.$store.commit("SET_APPLICATION_YEAR", value) }
    },
    applicationType: {
      get() { return this.coverletter.applicationType},
      set(value) { this.$store.commit("SET_APPLICATION_TYPE", value)}
    },
    applicationHalf: {
      get() { return this.coverletter.applicationHalf},
      set(value) { this.$store.commit("SET_APPLICATION_HALF", value)}
    },
    isApplication: {
      get() { return this.coverletter.application},
      set(value) { this.$store.commit("SET_IS_APPLICATION", value)}
    },
    isPass: {
      get() { return this.coverletter.pass},
      set(value) { this.$store.commit("SET_IS_PASS", value)}
    },
    jobType: {
      get() { return this.coverletter.jobType},
      set(value) { this.$store.commit("SET_JOB_TYPE", value)}
    },
    deadline: {
      get() { return this.coverletter.deadline},
      set(value) { this.$store.commit("SET_DEADLINE", value)}
    }
  },
  methods: {
    ...mapMutations(["INIT_COVERLETTER"]),
    ...mapActions(["FETCH_COVERLETTER", "CREATE_COVERLETTER", "UPDATE_COVERLETTER", "DELETE_COVERLETTER"]),
    getCoverletter() {
      const coverletterId = this.$route.params.cid;
      this.loading = true;
      this.FETCH_COVERLETTER(coverletterId)
        .catch(e => {
          alert(e.data.message || 'server errror!');
          this.$router.push('/coverletters');
        })
        .finally(()=> this.loading = false);
    },
    updateQuestion(data) {
      this.$store.commit("SET_QUESTION", {
        id: data.id,
        title: data.title ? data.title.target.value : null,
        contents: data.contents
      })
    },
    updateCoverletter() {
      this.UPDATE_COVERLETTER(this.coverletter)
        .then(() => {
          alert('자기소개서가 수정되었습니다.')
          this.$router.push('/coverletters')
        })
        .catch((e) => {
          alert(e.data.message);
        });
    },
    createCoverletter() {
      this.CREATE_COVERLETTER(this.coverletter)
        .then(()=> {
          alert('자기소개서가 저장되었습니다.');
          this.$router.push('/coverletters');
        })
        .catch(()=>alert('오류'));
    },
    deleteCoverletter() {
      if (!confirm("정말 삭제하시겠습니까?"))
        return;

      const coverletterId = this.$route.params.cid;

      this.DELETE_COVERLETTER(coverletterId)
        .then(() => this.$router.push('/coverletters'));
    }
  }
};
</script>

<style>
</style>
