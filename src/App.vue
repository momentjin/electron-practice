<template>
  <v-app>
    <div class="app-container">
      <div class="main-container">
        <!-- 팝업일 때 메뉴 노출 X -->
        <nav v-if="isPopup"> 
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
    isPopup() {
      return !opener;
    }
  },
  created() {
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
