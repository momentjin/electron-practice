<template>
  <div class="MyHeader">
    <div class="MyHeader__top">
      <span class="item-start">
        <h3>{{title}}</h3>
      </span>
      <div class="item-end">
        <span class="fn-button" v-for="(button, idx) in buttons" :key="idx">
          <v-icon @click="button.action">{{ button.icon }}</v-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    buttons: {
      type: Array,
      required: false
    }
  }
};
</script>

<style scoped>
.MyHeader {
  /* border: 1px solid black; */
}

.MyHeader__top {
  /* margin: 10px; */
  margin: 10px 0px 10px 0px;
  display: flex;
  padding: 5px;
  /* test border: 1px dotted black; */
}

input {
  width: 100%;
  padding: 5px;
  background-color: #F7F7F7;
}

.item-start {
  flex: none;
}

.item-end {
  margin-left: auto;
}

.fn-button {
  margin-left: 20px;
}
</style>
