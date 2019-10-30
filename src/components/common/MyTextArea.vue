<template>
  <div class="form-item-wrapper">
    <label class="form-item-label">{{ label }}</label>
    <span class="form-item-message">{{ruleMessages}}</span>
    <textarea class="form-item-field" v-model="myValue" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    maxLength: {
      type: Number,
      required: false
    },
    rules: {
      type: Array,
      required: false,
      default: () => []
    },
    hint: {
      type: String,
      required: false
    },
    // 부모컴포넌트에서 :value.sync="" 형태로 정의해야 한다.
    value: {
      type: String,
      required: true
    },
    showLength: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      warning: ""
    };
  },
  watch: {
    myValue(newValue, oldValue) {
      if (newValue.length > this.maxLength) this.myValue = oldValue;

      if (this.required)
        if (!newValue || !newValue.length) {
          this.warning = "반드시 작성해야 합니다.";
        } else {
          this.warning = "";
        }
    }
  },
  computed: {
    ruleMessages() {
      let messages = [];
      if (this.showLength) messages.push(this.value.length+"글자");
      if (this.currentLength) messages.push(this.currentLength);
      if (this.warning) messages.push(this.warning);
      this.ruleFunctions.forEach(r => messages.push(r));

      return messages.join(" ");
    },
    currentLength() {
      if (this.maxLength) return `${this.value.length}/${this.maxLength}`;
      else return undefined;
    },
    ruleFunctions() {
      let messages = [];
      this.rules.forEach(rule => {
        if (rule(this.value) !== true) {
          messages.push(rule(this.value));
        }
      });

      return messages;
    },
    myValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("update:value", newValue);
      }
    }
  }
};
</script>

<style>
textarea {
  min-height: 400px;
  max-height: 400px;
  border: 1px solid pink;
  overflow: scroll;
  resize: none;
}
</style>