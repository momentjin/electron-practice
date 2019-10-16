<template>
  <div class="login_wrapper">
    <div class="login_form form-border">
      <div class="login_input user_email">
        <input v-model="email" type="text" placeholder="이메일" ref="email" />
      </div>
      <div class="login_input user_password">
        <input v-model="password" type="password" placeholder="비밀번호" ref="password" />
      </div>
    </div>
    <div class="login_footer">
      <button
        class="login-button form-border"
        :disabled="!isActive"
        v-on:click="signIn"
        v-bind:class="{active: isActive}"
      >로그인</button>
    </div>
    <div class="link" @click="openSignIn">회원가입</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      returnPath: ""
    };
  },
  created() {
    this.returnPath = this.$route.query.returnPath || "/coverletters";

    if (this.$store.getters.isAuth()) {
      this.$router.push(this.returnPath);
    }
  },
  computed: {
    isActive() {
      return this.email && this.password;
    }
  },
  methods: {
    ...mapActions(["SIGN_IN"]),
    signIn() {
      this.SIGN_IN({
        id: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push(this.returnPath);
        })
        .catch(err => {
          alert(err.data.message);
        });
    },
    openSignIn() {
      alert("지원하지 않는 기능입니다.");
    }
  }
};
</script>

<style>
.login_wrapper {
  background-color: #ffeb35;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-border {
  border: 1.2px solid #e4d42d;
}

.login_input > input {
  background-color: white;
  width: 240px;
  padding: 10px;
}

.user_email {
  border-bottom: 1px solid #f5f6f6;
}

.login_footer {
  margin-top: 10px;
}

.login-button {
  width: 240px;
  padding: 10px;
  background-color: #f6f6f7;
  color: #acacac;
  font-weight: bold;
  border-radius: 0;
}

.active {
  background-color: #423631;
  color: white;
  cursor: pointer;
}

.link {
  margin-top: 30px;
  font-size: 12px;
  color: #7f771d;
  cursor: pointer;
}
</style>
