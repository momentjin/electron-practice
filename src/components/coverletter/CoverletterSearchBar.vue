<script>
import { mapActions, mapMutations } from "vuex";
import SearchBar from "@/components/common/SearchBar.vue";

export default {
  mixins: [SearchBar],
  methods: {
    ...mapMutations(["RESET_FILTERED_COVERLETTERS"]),
    ...mapActions(["SEARCH_COVERLETTERS_BY_COMPANY_NAME"]),
    search() {
      return this.SEARCH_COVERLETTERS_BY_COMPANY_NAME({
        companyName: this.searchValue
      });
    },
    reset() {
      this.RESET_FILTERED_COVERLETTERS();
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