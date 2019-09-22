<template>
  <v-menu offset-y class="my_clazz" max-width="300px" :close-on-content-click="false" z-index="999">
    <template v-slot:activator="{ on }">
      <!-- icon대체 -->
      <h1 v-on="on">하이</h1>
    </template>

   
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ]
  }),
  methods: {
    hi() {
      console.log("하이");
    },
  }
};
</script>

<style>


</style>