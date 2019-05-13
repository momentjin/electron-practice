<template>
  <div class="c-view">
    <div class="c-header">
      <h2>자기소개서</h2>
      <v-icon class="func" @click="onClickAddBtn"> playlist_add </v-icon>
    </div>
    <div class="search">
      <input type="text" placeholder="자기소개서 검색" >
    </div>
    <!-- TODO : Search 컴포넌트 추가 -->
    <coverletter-list/>
  </div>
</template>

<script>
import CoverletterList from "../components/CoverletterList.vue";

export default {
  components: {
    CoverletterList
  },
  methods: {
    onClickAddBtn() {
      this.$router.push('/coverletters/new');
    }
  }
};
</script>

<style>
.c-view {
  border:1px solid black;
  flex-grow: 1;
  margin: 1px;
}

.search {
  align-items: center;
  /* margin: 20px 10px 10px 15px; */
}

.c-header {
  border-bottom: 1px solid black;
  display: flex;
}

.func {
  margin-left: auto;
}
</style>

