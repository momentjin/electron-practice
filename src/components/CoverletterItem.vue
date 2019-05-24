<template>
  <div class="coverletter_container" @click.stop="onClickCoverletter">
    <div class="coverletter_wrapper coverletter_title">
      <span>{{coverletter.companyName}}</span>
      <div>{{coverletter.applicationYear}} | {{applicationHalf}} | {{applicationType}} | {{coverletter.jobType}}</div>
      <div v-if="deadline">{{deadline}}</div>
    </div>
    <div class="coverletter_wrapper coverletter_etc">
      <span v-if="isPass">{{isPass}}</span>
      <span v-else>{{isApplication}}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ["coverletter"],
  computed: {
    applicationHalf: function() {
      switch (this.coverletter.applicationHalf) {
        case 0:
          return "상반기";
        case 1:
          return "하반기";
        default:
          return "기타";
      }
    },
    applicationType: function() {
      switch (this.coverletter.applicationType) {
        case 0:
          return "인턴";
        case 1:
          return "신입";
        case 2:
          return "경력";
        default:
          return "기타";
      }
    },
    isApplication: function() {
      return this.coverletter.application ? "지원 완료" : "미지원";
    },
    isPass: function() {
      if (!this.coverletter.application) return;

      return this.coverletter.pass ? "합격" : "불합격";
    },
    deadline: function() {
      // 미지원이거나 마감일 데이터가 없는 경우
      if (!this.coverletter.application || !this.coverletter.deadline) return;

      const deadline = this.$moment(this.coverletter.deadline).format(
        "YYYY년 MM월 DD일 HH시"
      );
      return `서류 마감 : ${deadline}`;
    }
  },
  methods: {
    ...mapActions(['FETCH_COVERLETTERS']),
    onClickCoverletter() {
      let routeData = this.$router.resolve({
        name: "coverletterDetail",
        params: { cid: this.coverletter.id }
      });

      const popup = window.open(
        routeData.href,
        `coverletter${this.coverletter.id}`,
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
.coverletter_container {
  display: flex;
  flex-direction: row;
  /* margin: 10px; */
  /* min-width: 400px; */
  /* max-width: 100%; */
  border: 1px solid black;
  flex-grow: 1;
  margin: 1px;
  overflow: hidden;
}

.coverletter_wrapper {
  margin: 1px;
  border: 1px solid black;
}

.coverletter_etc {
  margin: 1px;
  border: 1px solid black;
  align-self: center;
  margin-left: auto;
}
</style>
