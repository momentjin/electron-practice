<template>
  <v-app>
    <div class="app-container">
      <div class="main-container">
        <!-- 팝업일 때 메뉴 노출 X -->
        <nav v-if="needNav"> 
          <left-navigation/>
        </nav>
        <v-content>
          <v-container fluid class="pa-0">
            <main>
              <router-view/>
            </main>
          </v-container>
        </v-content>
      </div>
    </div>
  </v-app>
</template>

<script>
import LeftNavigation from "./components/common/LeftNavigation.vue";
import { mapActions } from 'vuex';

export default {
  name: "App",
  components: {
    LeftNavigation
  },
  computed: {
    needNav() {
      return !opener && !this.$route.path.includes('login');
    },
    isLoginView() {
      return this.$route.path.includes('login');
    }
  },
  created() {
    if (this.isLoginView) return;
    this.FETCH_HASHTAGS();
  },
  props: {
    source: String
  },
  methods: {
    ...mapActions(["FETCH_HASHTAGS"]),
  }
};
</script>

<style>
.app-container {
  margin: 0px;
  height: 100vh;
  background-color: white;
}

.main-container {
  display: flex;
  min-width: 300px;
  min-height: 100%;
}

main {
  flex-grow: 1;
}
</style>



// 로그인 관련
// 1. 잘못된 토큰일 때, 유효한 토큰일 때 로그아웃 처리하는 로직이 필요하다. 
// - 즉, api를 호출할 때 토큰이 사용될텐데, 그 때 처리하도록 한다...? 언제 체크해야지?