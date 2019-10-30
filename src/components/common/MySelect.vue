<template>
  <div class="form-item-wrapper">
    <label class="form-item-label">{{label}}</label>
    <select class="form-item-field" v-model="myItem">
      <option
        v-for="data in datas"
        :key="data.key"
        :value="data"
        :selected="myItem ? data.key == myItem.key : data.key == 0"
      >{{data.value}}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    datas: {
      type: Array,
      required: true,
      default: () => [{ key: 0, value: "" }]
    },
    item: {
      type: Object,
      required: false
    }
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
  }
};
</script>

<style>
</style>