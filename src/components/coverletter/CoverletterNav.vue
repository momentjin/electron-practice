<template>
  <div class="view-menu-container">
    <!-- 자기소개서 지원 정보 버튼 -->
    <div class="view-menu-item">
      <v-icon medium dark>info</v-icon>
    </div>

    <!-- 문항별 버튼 -->
    <div v-for="(q, index) in questions" :key="q.id">
      <router-link :to="{ name: 'question', params: { qid: q.id } }"> 
        <div class="view-menu-item">{{index+1}}</div>
      </router-link>
    </div>

    <!-- 문항 추가 버튼 -->
    <div class="view-menu-item">
      <v-icon medium dark>add_circle</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questions: {
      type: Array,
      default: () => [],
      required: false
    }
  }
};
</script>

<style>
.view-menu-container {
  background: white;
  width: 65px;
}

.view-menu-container {
  background-color: #423630;
}

.view-menu-item {
  color: #7b736e;
  font-size: 20px;

  text-align: center;
  padding: 5px;
  margin: 10px 5px 5px 5px;
}

.view-menu-item:hover {
  color: white;
  cursor: pointer;
}
</style>