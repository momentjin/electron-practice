<template>
  <div class="app-container">
    <div class="main-container">
      <left-navigation />
      <router-view></router-view>
      <!-- <section class="contents"
        <header>헤더</header>
        <main>메인</main>
      </section> -->
    </div>
  </div>
</template>

<script>
import LeftNavigation from "./components/LeftNavigation";

export default {
  name: "App",
  components: {
    LeftNavigation
  },
  data() {
    return {};
  },
  props: {
    source: String
  }
};
</script>

<style>
.app-container {
  margin: 0px;
  height: 100vh;
}

.main-container {
  display: flex;
  min-width: 300px;
  min-height: 100%;
}

</style>
