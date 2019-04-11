<template>
  <div class="coverletter_container" @click.stop="onClickCoverletter">
    <div class="coverletter_section1">
      <span>{{coverletter.companyName}}</span>
      <div>{{coverletter.applicationYear}} {{coverletter.applicationHalf}} {{ coverletter.applicationType}} {{coverletter.jobType}}</div>
      <div>{{coverletter.isApplication ? '' : `서류마감일시 : ${coverletter.deadline}`}}</div>
    </div>
    <div class="coverletter_section2">
      <span @click.stop="onClickIsApplication">{{coverletter.isApplication ? '지원O' : '지원X' }}</span>
      <span
        @click.stop="onClickIsPass"
      >{{coverletter.isApplication ? coverletter.isPass ? '합격' : '불합격' : '' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  // TODO : props 데이터 필수값 및 기본값 셋팅하기
  props: ["coverletter"],
  methods: {
    onClickCoverletter() {
      const { id } = this.coverletter;
      alert(id);
    },
    onClickIsApplication() {
      const { isApplication } = this.coverletter;
      alert(isApplication);
      // TODO : 상태값 변경 API 호출하기
    },
    onClickIsPass(e) {
      const { isPass } = this.coverletter;
      alert(isPass);
      // TODO : 상태값 변경 API 호출하기 (isApplication=True일때만)
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
}

.coverletter_section1 {
  margin: 1px;
  border: 1px solid black;
  /* font-size: 20px; */
}

.coverletter_section2 {
  margin: 1px;
  border: 1px solid black;
  align-self: center;
  margin-left: auto;
}

</style>
