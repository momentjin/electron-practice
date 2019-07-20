<template>
  <nav class="nav">
    <ul>
      <li v-for="menu in menus" :key="menu.index" :title="menu.title" @click.stop="onChangeView">
        <v-icon medium :disabled="menu.disabled" dark :title="menu.title">{{menu.icon}}</v-icon>
      </li>
    </ul>
  </nav>
</template>

<script>
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
      menus: [
        { title: "dashboard", icon: "widgets", disabled: false },
        { title: "coverletters", icon: "folder", disabled: true }
      ]
    };
  },
  methods: {
    onChangeView(e) {
      const menuName = e.target.title;
      this.$router.push(`/${menuName}`);
    },
    setActiveMenu(changedMenuName) {
      const after = changedMenuName.replace("/", "");

      this.menus.forEach(menu => {
        if (menu.title == after) menu.disabled = false;
        else menu.disabled = true;
      });
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
