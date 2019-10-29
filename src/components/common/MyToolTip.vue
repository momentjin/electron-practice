<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <slot></slot>
      </span>
    </template>
    <span>{{contents}}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    contents: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
</style>