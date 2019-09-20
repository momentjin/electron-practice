<template>
  <div class="menu_view">
      <my-header
        title="자기소개서"
        :buttons="headerButtons"
      ></my-header>
      <div>
        <input class="search_bar" type="text" placeholder="회사명으로 자기소개서 검색"/>
      </div>
    <coverletter-list/>
  </div>
</template>

<script>
import CoverletterList from "../../components/coverletter/CoverletterList.vue";
import MyHeader from "../../components/common/MyHeader.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      newPopupCount: 0,
      headerButtons: [
        {
          title: "addCoverletter",
          icon: "playlist_add",
          action: this.onClickAddBtn
        }
      ]
    };
  },
  components: {
    CoverletterList,
    MyHeader
  },
  methods: {
    ...mapActions(["FETCH_COVERLETTERS"]),
    onClickAddBtn() {
      let routeData = this.$router.resolve({
        name: "coverletterNew",
        params: { cid: "new" }
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
.menu_view {
  /* border: 1px solid black; */
  margin-left: 10px;
  margin-right: 10px;
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

.search_bar {
  background-color: #F7F7F7;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  padding: 2px;
  font-size: 12px;
  margin-right: 1px;
  border-radius: 5px 5px 5px 5px;
  margin-bottom: 10px;
}




</style>

