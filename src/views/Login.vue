<template>
  <div class="login-container">
    <div class="login-main">
      <div class="login_input user_email">
        <input v-model="email" type="text" placeholder="이메일을 입력해주세요" ref="email" />
      </div>
      <div class="login_input user_password">
        <input v-model="password" type="password" placeholder="비밀번호를 입력해주세요" ref="password" />
      </div>
    </div>
    <div class="login-footer">
      <div class="item">
        <UsernamePasswordBtn :username="email" :password="password" :returnPath="returnPath" />
      </div>
      <div class="item">
        <KakaotalkLoginBtn />
      </div>
      <div class="item">
        <SignUpBtn />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MyInput from "@/components/common/MyInput.vue";
import UsernamePasswordBtn from "@/components/login/UsernamePasswordBtn.vue";
import KakaotalkLoginBtn from "@/components/login/KakaotalkLoginBtn.vue";
import SignUpBtn from "@/components/login/SignUpBtn.vue";

export default {
  components: { MyInput, KakaotalkLoginBtn, SignUpBtn, UsernamePasswordBtn },
  data() {
    return {
      email: "",
      password: "",
      returnPath: ""
    };
  },
  created() {
    this.returnPath = this.$route.query.returnPath || "/";

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
    ...mapActions(["SIGN_IN", "SIGN_IN_WITH_KAKAO"]),
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
    }
  }
};
</script>

<style>
.login-container {
  background-color: #eeeeee;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login_input > input {
  background-color: white;
  width: 240px;
  padding: 10px;
}

.user_email {
  border-bottom: 1px solid #f5f6f6;
}

.login-footer {
  margin-top: 10px;
}

.active {
  color: white;
  cursor: pointer;
}

.link {
  margin-top: 30px;
  font-size: 12px;
  color: #7f771d;
  cursor: pointer;
}

.login-footer > .item {
  margin-bottom: 2px;
}
</style>
