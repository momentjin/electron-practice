<template>
  <div class="menu-container">
    <my-header title="자기소개서" :subData="totalCoverletterNum" :buttons="headerButtons" headerMenuDatas></my-header>
    <search-bar :placeHolderValue="placeHolderValue" />
    <coverletter-list />
    <input type="file" multiple ref="converter" @change="onChangeFile" hidden />
  </div>
</template>

<script>
import CoverletterList from "@/components/coverletter/CoverletterList.vue";
import MyHeader from "@/components/coverletter/CoverletterHeader.vue";
import SearchBar from "@/components/coverletter/SearchBar.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    CoverletterList,
    MyHeader,
    SearchBar
  },
  data() {
    return {
      placeHolderValue: "회사명을 입력하고 'Enter' 키를 눌러 검색",
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
  computed: {
    ...mapState(["totalCoverletterNum", "pageInfo"])
  },
  created() {
    this.getCoverletterList();
  },
  methods: {
    ...mapActions(["FETCH_COVERLETTERS", "CONVERT_FILES"]),
    getCoverletterList() {
      this.FETCH_COVERLETTERS({pageNo: this.pageInfo.currentPageNo});
    },
    onClickAddBtn() {
      const popup = window.open(
        "/coverletters/new/info",
        `coverletter_new`,
        "width=500,height=700"
      );

      const self = this;

      // VUEX 공유문제 임시 처리
      popup.onload = function() {
        popup.onbeforeunload = function() {
          self.FETCH_COVERLETTERS();
        };
      };
    },
    onConvertFile() {
      if (!confirm("마이그레이션 하시겠습니까?")) return;

      this.$refs.converter.click();
    },

    onChangeFile() {
      const selectedFiles = this.$refs.converter.files;
      if (!selectedFiles || !selectedFiles.length) return;

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
.menu-container {
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
}
</style>

