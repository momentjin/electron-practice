<template>
  <div>
    <input
      class="search-bar"
      type="text"
      :placeholder="placeHolderValue"
      v-model="searchValue"
      @keyup.enter.stop="onPressEnter"
    />
  </div>
</template>

<script>
export default {
  props: {
    placeHolderValue: {
      type: String,
      required: false,
      default: ""
    }
  },
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
        this.reset();
      }
    }
  },
  methods: {
    onPressEnter() {
      const self = this;
      if (!self.enterKeyFlag) return;

      self.enterKeyFlag = false;

      this.search()
        .catch(e => console.log(e))
        .finally(() => {
          setTimeout(() => {
            self.enterKeyFlag = true;
          }, 1500);
        });
    },
    reset() {
      return;
    },
    search() {
      return new Promise();
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