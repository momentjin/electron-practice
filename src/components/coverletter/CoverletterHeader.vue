<template>
  <header>
    <span class="header-title" @click="onClickHeader">
      <h3>
        {{title}}
        <span class="header-title-sub">{{ subData }}</span>
      </h3>
    </span>
    <div class="header-button-container">
      <span class="header-button" v-for="(button, idx) in buttons" :key="idx">
        <v-icon @click="button.action">{{ button.icon }}</v-icon>
      </span>
    </div>
  </header>
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
      required: false,
      default: () => []
    },
    subData: {
      type: Number,
      required: false
    }
  },
  methods: {
      onClickHeader() {
          this.$router.push('/questions');
      }
  }
};
</script>

<style>
header {
  margin: 10px 0px 10px 0px;
  padding: 5px 5px 5px 0px;

  display: flex;
}

.header-title {
  flex: none;
  
}

.header-title-sub {
  color: #878787;
  font-weight: normal;
}

.header-button-container {
  margin-left: auto;
}

.header-button {
  margin-left: 20px;
}

button.v-btn[disabled] {
  opacity: 0.6;
  color: red;
  background-color: red;
}
</style>
