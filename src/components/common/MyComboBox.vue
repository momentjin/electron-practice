<template>
  <div class="form-item-wrapper">
    <label class="form-item-label">{{label}}</label>
    <span class="form-item-message">태그는 {{maxLength}}개까지 추가할 수 있습니다</span>
    <v-combobox
      class="form-item-field2"
      v-model="myItem"
      :items="datas"
      :search-input.sync="searchValue"
      hide-selected
      multiple
      persistent-hint
      item-text="value"
      color="#E5E5E5"
      @input="limitItemNumber"
      :deletableChips="true"
      chips
    ></v-combobox>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    maxLength: {
      type: Number,
      required: false,
      default: 5
    },
    datas: {
      type: Array,
      required: true,
      default: () => [{ key: 0, value: "" }]
    },
    item: {
      type: Array,
      required: true,
      default: () => [""]
    }
  },
  data() {
    return {
      searchValue: ""
    };
  },
  computed: {
    myItem: {
      get() {
        return this.item;
      },
      set(newValue) {
        this.$emit("update:item", newValue);
      }
    }
  },
  methods: {
    limitItemNumber(e) {
      if (!this.maxLength) return;
      if (e.length > this.maxLength) e.pop();
    }
  }
};
</script>

<style>
</style>