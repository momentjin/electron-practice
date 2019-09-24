<template>
  <div class="menu_view">
    <my-header title="자기소개서" :buttons="headerButtons"></my-header>
    <div>
      <input class="search_bar" type="text" placeholder="회사명으로 자기소개서 검색" @keyup="searchItem" />
    </div>
    <coverletter-list />
    <input type="file" multiple ref="converter" @change="onChangeFile" hidden />
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
          title: "convertCoverletter",
          icon: "input",
          action: this.onConvertFile
        },
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
    ...mapActions(["FETCH_COVERLETTERS", "CONVERT_FILES"]),
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
    onConvertFile() {
      if (!confirm("마이그레이션 하시겠습니까?")) return;
    },
    searchItem(e) {
      var searchText = e.target.value;

      const filteredList = this.coverletters().filter(c => {
        return c.companyName.normalize().indexOf(searchText) >= 0;
      });

      this.SET_FILTERED_COVERLETTERS(filteredList);
    },
    onChangeFile() {
      const selectedFiles = this.$refs.converter.files;
      if (!selectedFiles || !selectedFiles.length) return;

      // TODO : toast message로 변경되야 한다.
      alert(
        `총 ${selectedFiles.length}` +
          "개 파일을 자기소개서 데이터로 변환합니다."
      );

      // call api
      let formDatas = new FormData();
      for (let f of selectedFiles) {
        formDatas.append("file", f);
      }

      this.CONVERT_FILES(formDatas)
        .then(() => alert("자기소개서 변환을 완료했습니다."))
        .catch(err => {
          alert(err.data.message);
        });
    }
  }
};
</script>

<style>
.menu_view {
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
}

.search {
  align-items: center;
  margin: 20px 10px 10px 15px;
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

