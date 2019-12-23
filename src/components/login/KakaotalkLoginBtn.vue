<template>
  <button class="login-btn kakao-btn" v-on:click="signInWithKakao">카카오톡으로 로그인</button>
</template>

<script>
export default {
  methods: {
    signInWithKakao() {
      location.href = "http://localhost:8080/oauth2/authorization/kakao";
    }
  }
};
</script>

<style>
.login-btn {
  width: 240px;
  padding: 10px;
  border-radius: 0;
  border: 1px solid white;
}

.kakao-btn {
  background-color: #f7e319;
  border: 1px solid #E5D431;
}
</style>