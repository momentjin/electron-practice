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
    <div class="MyHeader__bottom" v-if="useSearchBar">
      <input type="text" :placeholder="searchBarHint">
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
    useSearchBar: {
      type: Boolean,
      default: false
    },
    searchBarHint: {
      type: String,
      required: false,
      default: ""
    },
    /**
     * 정렬 기능 사용 여부 Props
     * : 사용한다고치면, 정렬 기준도 넣어줘야 하는 건가?
     */

    /**
     * 버튼 Props
     * : 버튼에 대한 액션을 넘겨줘야 하나??
     */
    buttons: {
      type: Array,
      required: false
    }
  }
};
</script>

<style scoped>
.MyHeader {
  border: 1px solid black;
  margin: 1px;
}

.MyHeader__top {
  margin: 10px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  /* test */ border: 1px dotted black;
}

.MyHeader__bottom {
  margin: 10px;
  display: flex;
  justify-content: center;

  /* test */ border: 1px dotted black;
}

input {
  width: 100%;
  padding: 5px;
  background-color: #F7F7F7;
}

</style>
