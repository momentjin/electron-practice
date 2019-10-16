<template>
  <div>
    <input
      class="search-bar"
      type="text"
      placeholder="회사명을 입력하고 'Enter' 키를 눌러 검색"
      v-model="searchValue"
      @keyup.enter.stop="onPressEnter"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      searchValue: "",
      enterKeyFlag: true
    };
  },
  watch: {
    searchValue(newValue) {
      if (!newValue.trim()) {
        console.log("?");
        this.RESET_FILTERED_COVERLETTERS();
      }
    }
  },
  methods: {
    ...mapMutations(["RESET_FILTERED_COVERLETTERS"]),
    ...mapActions(["SEARCH_COVERLETTERS_BY_COMPANY_NAME"]),
    onPressEnter() {
      const self = this;
      if (!self.enterKeyFlag) return;

      self.enterKeyFlag = false;

      this.SEARCH_COVERLETTERS_BY_COMPANY_NAME({
        companyName: this.searchValue
      })
        .catch(e => console.log(e))
        .finally(() => {
          setTimeout(() => {
            self.enterKeyFlag = true;
          }, 1500);
        });
    }
  }
};
</script>

<style>
.search-bar {
  background-color: #f7f7f7;

  width: 100%;
  margin: 0 auto;
  align-items: center;

  padding: 2px 2px 2px 7px;
  margin: 0px 1px 10px 0px;

  border-radius: 5px 5px 5px 5px;

  font-size: 12px;
}
</style>