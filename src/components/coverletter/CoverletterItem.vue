<template>
  <div class="coverletter-item" @click.stop="onClickCoverletter">
    <div class="coverletter-item-main">
      <span class="coverletter-item-title">{{coverletter.companyName}}</span>
      <div class="coverletter-item-info">{{applicationInfo}}</div>
      <div class="coverletter-item-info" v-if="deadline">{{deadline}}</div>
    </div>
    <div class="coverletter-item-status">
      <span>{{applicationStatus}}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { convert } from "@/utils/CoverletterContants";

export default {
  props: ["coverletter"],
  computed: {
    applicationInfo() {
      const { applicationYear, jobType } = this.coverletter;
      const infos = [
        applicationYear,
        this.applicationHalf,
        this.applicationType,
        jobType
      ].filter(item => !!item);
      return infos.join(" | ");
    },
    applicationHalf() {
      return convert.applicationHalf(this.coverletter.applicationHalf);
    },
    applicationType() {
      return convert.applicationType(this.coverletter.applicationType);
    },
    isApplication() {
      return convert.isApplication(this.coverletter.isApplication);
    },
    isPass() {
      return convert.isPass(this.coverletter.isPass);
    },
    applicationStatus() {
      // 지원대기일 경우 지원대기
      if (this.isApplication == "지원 대기") return this.isApplication;

      // 지원 완료 -> 결과 대기
      // 합격했을 경우 합격
      // 불합격했을 경우 불합격
      if (
        this.isPass == "합격" ||
        this.isPass == "불합격" ||
        this.isApplication == "지원 완료"
      )
        return this.isPass;

      // 기타일 경우 출력 x
      else return "";
    },
    deadline() {
      // 미지원이거나 마감일 데이터가 없는 경우 표시 안함
      if (!this.isApplication == "지원 대기") return;
      if (!this.coverletter.deadline) return;

      // TODO : DateTime 의존성 분리 필요
      const deadline = this.$moment(this.coverletter.deadline).format(
        "YYYY년 MM월 DD일 HH시"
      );

      return `서류 마감 : ${deadline}`;
    }
  },
  methods: {
    ...mapActions(["FETCH_COVERLETTERS"]),
    onClickCoverletter() {
      const popup = window.open(
        `coverletters/${this.coverletter.id}/info`,
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
.coverletter-item {
  display: flex;
  flex-direction: row;

  padding: 10px;
  margin-bottom: 3px;

  border: 1px solid #e3e3e3;
  border-radius: 5px 5px 5px 5px;

  cursor: pointer;
}

.coverletter-item:hover {
  background-color: #f7f7f7;
}

.coverletter-item-status {
  align-self: center;
  margin-left: auto;
}

.coverletter-item-info {
  color: #808080;
}
</style>
