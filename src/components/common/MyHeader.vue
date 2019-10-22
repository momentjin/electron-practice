<template>
  <header>
    <span class="header-title" v-bind:class="{clickable: isClickable}" ref="title">
      <h3>
        {{title}}
        <span class="header-title-sub">{{ subData }}</span>
        <span v-if="isClickable" class="more-btn"> ▼ </span> 
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
      required: false
    },
    subData: {
      type: Number,
      required: false
    },
    onClickHeaderTitle: {
      type: Function,
      required: false,
      default: null
    }
  },
  data() {
    return {
      isClickable: false
    };
  },
  mounted() {
    if (this.onClickHeaderTitle) {
      this.$refs.title.addEventListener("click", this.onClickHeaderTitle);
      this.isClickable = true;
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

.clickable {
  cursor: pointer;
}

.more-btn {
  font-size: 5px;
  color: #A6A6A6;
}
</style>
