<template>
  <button class="login-btn signup-btn" v-on:click="signUp">회원가입</button>
</template>

<script>
export default {
  methods: {
    signUp() {
      alert(
        "아직 지원하지 않습니다. 데모 테스트를 원하는 경우 아이디 항목에 test@test.test, 비밀번호 항목에 test를 입력하고 로그인 부탁드립니다."
      );
    }
  }
};
</script>

<style>
.signup-btn {
  background-color: white;
}
</style>