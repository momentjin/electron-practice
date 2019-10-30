<template>
  <v-icon
    v-if="iconType"
    :disabled="disabled"
    :color="activeColor"
    @click.stop="clickAction"
  >{{ iconType }}</v-icon>
  <button :disabled="disabled" @click="clickAction" :style="{color: activeColor}" v-else>{{altText}}</button>
</template>


<script>
export default {
  name: "my-icon",
  data() {
    return {
      initColor: "",
      currentColor: ""
    };
  },
  props: {
    clickAction: {
      type: Function,
      required: false
    },
    // 'https://material.io/resources/icons/?style=baseline'에서 지원하는 icon 종류만 지원 가능합니다.
    // 만약 아이콘 없이 대체 텍스트를 사용하고 싶은 경우 altText 속성을 사용하세요.
    iconType: {
      type: String,
      required: false,
      default: ""
    },
    color: {
      type: String,
      required: false,
      default: "black"
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    altText: {
      type: String,
      required: false,
      default: ""
    },
    active: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  created() {
    this.initColor = this.color;
    this.currentColor = this.color;
  },
  computed: {
    activeColor() {
      if (!this.active) {
        return "#8d8683";
      } else {
        return this.initColor;
      }
    }
  }
};
</script>

<style>
button:active,
.v-icon:active {
  opacity: 0.3;
}
</style>