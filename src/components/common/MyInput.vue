<template>
  <div class="form-item-wrapper">
    <label class="form-item-label">{{ label }}</label>
    <span class="form-item-message">{{ruleMessages}}</span>
    <input
      class="form-item-field"
      :disabled="disabled"
      type="text"
      v-model="myValue"
      :placeholder="hint"
    />
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
    disabled: {
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
  created() {
    if (this.required)
      if (!this.myValue || !this.myValue.length) {
        this.warning = "반드시 작성해야 합니다.";
      } else {
        this.warning = "";
      }
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
      if (this.currentLength) messages.push(this.currentLength);
      if (this.warning) messages.push(this.warning);
      this.ruleFunctions.forEach(r => messages.push(r));

      return messages.join(" ");
    },
    currentLength() {
      if (!this.value) return;
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
        return this.value || '';
      },
      set(newValue) {
        this.$emit("update:value", newValue);
      }
    }
  }
};
</script>

<style>
.form-item-label {
  font-weight: bold;
  margin-right: 5px;
}

.form-item-field {
  margin-top: 5px;
  padding: 5px;

  width: 100%;

  border: 1px solid #e5e5e5;
  border-radius: 5px 5px 5px 5px;
}

.form-item-field:focus {
  outline-color: black;
}

.form-item-wrapper {
  margin-right: 5px;
  flex-grow: 1;
}

.rule {
  font-weight: normal;
}
</style>