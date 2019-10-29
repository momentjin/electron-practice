<template>
  <header>
    <span class="header-title" v-bind:class="{clickable: isClickable}" ref="title">
      <h3>
        {{title}}
        <span class="header-title-sub">{{ subData }}</span>
        <span v-if="isClickable" class="more-btn">▼</span>
      </h3>
    </span>
    <div class="header-button-container">
      <span class="header-button" v-for="(button, idx) in buttons" :key="idx">
        <my-tool-tip v-if="button.tooltip" :contents="button.tooltip">
          <my-icon
            :clickAction="button.action"
            :iconType="button.icon"
            :disabled="button.disabled"
          />
        </my-tool-tip>
        <my-icon
          v-else
          :clickAction="button.action"
          :iconType="button.icon"
          :disabled="button.disabled"
        />
      </span>
    </div>
  </header>
</template>

<script>
import MyIcon from "@/components/common/MyIcon.vue";
import MyToolTip from "@/components/common/MyToolTip.vue";

export default {
  components: { MyIcon, MyToolTip },
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
  updated() {
    debugger;
  },
  mounted() {
    debugger;
    if (this.onClickHeaderTitle) {
      this.$refs.title.addEventListener("click", this.onClickHeaderTitle);
      this.isClickable = true;
    }
  }
};
</script>

<style>
header {
  background-color: white;
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

.clickable {
  cursor: pointer;
}

.more-btn {
  font-size: 10px;
  color: #a6a6a6;
}
</style>
