<template>
  <div class="menu_view">
    <my-header title="자기소개서" :buttons="headerButtons"></my-header>
    <div>
      <input class="search_bar" type="text" placeholder="회사명으로 자기소개서 검색" @keyup="searchItem" />
    </div>
    <coverletter-list />
  </div>
</template>

<script>
import CoverletterList from "../../components/coverletter/CoverletterList.vue";
import MyHeader from "../../components/common/MyHeader.vue";
import { mapActions, mapState, mapMutations } from "vuex";

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
  created() {
    this.getCoverletterList();
    
  },
  methods: {
    ...mapState(["coverletters"]),
    ...mapMutations(["SET_FILTERED_COVERLETTERS"]),
    ...mapActions(["FETCH_COVERLETTERS"]),
    getCoverletterList() {
      this.FETCH_COVERLETTERS();
    },
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
    },
    searchItem(e) {
      var searchText = e.target.value;

      // * 선행조건
      // 1. 초기 서버에서 받아온 coverletters를 filteredCoverletters로 복사해서 이걸로 렌더링해야한다.
      // -> 그러러면 비동기 이후, 할당되도록 적절한 조치가 필요하다. 우선 이것부터 해보자.
      const filteredList = this.coverletters().filter(c=>c.companyName.startsWith(searchText));
      console.log(filteredList);
      this.SET_FILTERED_COVERLETTERS(filteredList);
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
  background-color: #f7f7f7;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  padding: 2px;
  padding-left: 7px;
  font-size: 12px;
  margin-right: 1px;
  border-radius: 5px 5px 5px 5px;
  margin-bottom: 10px;
}
</style>

