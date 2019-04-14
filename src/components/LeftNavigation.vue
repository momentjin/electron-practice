<template>
  <nav class="nav">
    <ul>
      <li v-for="menu in menus" :key="menu.index" :title="menu.title" @click.stop="onChangeView">
        <v-icon :title="menu.title">{{menu.icon}}</v-icon>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { title: "Coverletter", icon: "folder" }
      ]
    };
  },

  methods: {
    onChangeView(e) {
      const menuName = e.target.title.toLowerCase();
      this.$router.push(`/${menuName}`);
    }
  }
};
</script>

<style>
nav {
  margin: 1px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
}

ul {
  padding: 0px;
  flex: 1;
  align-items: center;
}

li {
  list-style: none;
  text-align: center;
}

</style>
