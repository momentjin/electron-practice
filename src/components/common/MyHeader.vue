<template>
  <div class="MyHeader">
    <div class="MyHeader__top">
      <span>
        <h3>{{title}}</h3>
      </span>
      <span v-for="(button, idx) in buttons" :key="idx">
        <v-icon @click="button.action">{{ button.icon }}</v-icon>
      </span>
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
  margin: 10px 10px 10px 0px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  /* test border: 1px dotted black; */
}


input {
  width: 100%;
  padding: 5px;
  background-color: #F7F7F7;
}

</style>
