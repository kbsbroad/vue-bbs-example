<template>
  <v-toolbar fixed class="indigo darken-4" dark>
    <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>Toolbar</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'page-header',
  methods: {
    toggleDrawer() {
      this.$store.commit('toggleDrawer', Boolean(!this.$store.state.drawer));
    },
  },
};
</script>
