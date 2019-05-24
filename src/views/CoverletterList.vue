<template>
  <div class="c-view">
    <div class="c-header">
      <h2>자기소개서</h2>
      <v-icon class="func" @click="onClickAddBtn">playlist_add</v-icon>
    </div>
    <div class="search">
      <input type="text" placeholder="자기소개서 검색">
    </div>
    <coverletter-list/>
  </div>
</template>

<script>
import CoverletterList from "../components/CoverletterList.vue";
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      newPopupCount: 0
    };
  },
  components: {
    CoverletterList
  },
  methods: {
    ...mapActions(["FETCH_COVERLETTERS"]),
    onClickAddBtn() {
      let routeData = this.$router.resolve({
        name: "coverletterNew",
        params: { cid: 'new' }
      });

      const popup = window.open(
        routeData.href,
        `coverletter_new`,
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
.c-view {
  border: 1px solid black;
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

