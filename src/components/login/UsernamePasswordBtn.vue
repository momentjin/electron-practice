<template>
  <button
    class="login-button"
    :disabled="!isActive"
    v-on:click="signIn"
    v-bind:class="{active: isActive}"
  >로그인</button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    username: {
      type: String,
      required: false,
      default: ""
    },
    password: {
      type: String,
      required: false,
      default: ""
    },
    returnPath: {
      type: String,
      required: false,
      default: ""
    }
  },
  computed: {
    isActive() {
      return this.username && this.password;
    }
  },
  methods: {
    ...mapActions(["SIGN_IN"]),
    signIn() {
      this.SIGN_IN({
        id: this.username,
        password: this.password
      })
        .then(() => {
          this.$router.push(this.returnPath);
        })
        .catch(err => {
          alert(err.data.message);
        });
    }
  }
};
</script>

<style>
.login-button {
  width: 240px;
  padding: 10px;
  background-color: black;
  color: #acacac;
  border-radius: 0;
  border: 1px solid gray;
}
</style>