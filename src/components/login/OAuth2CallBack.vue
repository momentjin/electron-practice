<template></template>

<script>
import { mapMutations } from "vuex";

export default {
  created() {
    const { token } = this.$route.query;
    if (token) {
      this.setToken(token);
    } else {
      alert("소셜 로그인 도중 오류가 발생했습니다. (invalid token)");
    }
    this.$router.push({ name: "main" });
  },
  methods: {
    ...mapMutations(["SET_TOKEN"]),
    setToken(token) {
      this.SET_TOKEN(token);
    }
  }
};
</script>

<style>
</style>