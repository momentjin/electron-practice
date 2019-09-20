<template>
  <div class="coverletter_container" @click.stop="onClickCoverletter">
    <div class="coverletter_wrapper coverletter_title">
      <span class="title_info"> <b> {{coverletter.companyName}} </b> </span>
      <div class="sub_info">{{coverletter.applicationYear}} | {{applicationHalf}} | {{applicationType}} | {{coverletter.jobType}}</div>
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
import { convert } from '../../utils/CoverletterContants';


export default {
  props: ["coverletter"],
  computed: {
    applicationHalf() { return convert.applicationHalf(this.coverletter.applicationHalf) },
    applicationType() { return convert.applicationType(this.coverletter.applicationType) },
    isApplication() { return convert.isApplication(this.coverletter.isApplication) },
    isPass() { return convert.isPass(this.coverletter.isPass) },
    deadline() {

      // 미지원이거나 마감일 데이터가 없는 경우 표시 안함
      if (!this.coverletter.application || !this.coverletter.deadline) return;

      // 지원 완료한 경우 표시 안함
      if (this.coverletter.application) return;

      // TODO : DateTime 의존성 분리 필요
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
  border: 1px solid #E3E3E3;
  flex-grow: 1;
  padding: 10px;
  overflow: hidden;
  margin-bottom: 3px;
  border-radius: 5px 5px 5px 5px;
  cursor: pointer;
}

.coverletter_container:hover {
  background-color: #F7F7F7;
}

.coverletter_etc {
  align-self: center;
  margin-left: auto;
}

.sub_info {
  color: #808080;
}

</style>
