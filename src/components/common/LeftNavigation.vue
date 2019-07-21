<template>
  <nav class="nav">
    <ul>
      <li
        v-for="menu in viewMenus"
        :key="menu.index"
        :title="menu.title"
        @click.stop="onChangeView"
      >
        <v-icon medium :disabled="menu.disabled" dark :title="menu.title">{{menu.icon}}</v-icon>
      </li>
      <li v-for="menu in functionMenus" :key="menu.index">
        <v-icon small dark :title="menu.title" @click="menu.callback">{{menu.icon}}</v-icon>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  created() {
    this.setActiveMenu(this.$route.path);
  },
  watch: {
    $route(to) {
      this.setActiveMenu(to.path);
    }
  },
  data() {
    return {
      viewMenus: [
        { title: "dashboard", icon: "widgets", disabled: false },
        { title: "coverletters", icon: "folder", disabled: true }
      ],
      functionMenus: [
        { title: "logout", icon: "power_settings_new", callback: this.logout }
      ]
    };
  },
  methods: {
    ...mapMutations(["LOG_OUT"]),
    onChangeView(e) {
      const menuName = e.target.title;
      this.$router.push(`/${menuName}`);
    },
    setActiveMenu(changedMenuName) {
      const after = changedMenuName.replace("/", "");

      this.viewMenus.forEach(menu => {
        if (menu.title == after) menu.disabled = false;
        else menu.disabled = true;
      });
    },
    logout() {
      if (!confirm("로그아웃 하시겠습니까?")) return;

      this.LOG_OUT();
      this.$router.push("/login");
    }
  }
};
</script>

<style>
nav {
  background-color: #423630;
  display: flex;
  justify-content: center;
  width: 65px;
  padding-top: 50px;
}

ul {
  padding: 0px;
  flex: 1;
  align-items: center;
}

li {
  list-style: none;
  text-align: center;
  padding: 5px;
  margin-bottom: 15px;
}

li:hover {
  cursor: pointer;
}
</style>
