<template>
  <div class="coverletter_container" @click.stop="onClickCoverletter">
    <div class="coverletter_section1">
      <span>{{coverletter.companyName}}</span>
      <div>{{coverletter.applicationYear}} {{coverletter.applicationHalf}} {{ coverletter.applicationType}} {{coverletter.jobType}}</div>
      <div>{{coverletter.isApplication ? '' : `서류마감일시 : ${deadline}`}}</div>
    </div>
    <div class="coverletter_section2">
      <span>{{coverletter.isApplication ? '지원O' : '지원X' }}</span>
      &nbsp;
      <span
      >{{coverletter.isApplication ? coverletter.isPass ? '합격' : '불합격' : '' }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {  
  props: ["coverletter"],
  computed: {
    deadline: function() {
      return this.coverletter.deadline ? this.coverletter.deadline : "no deadline";
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
