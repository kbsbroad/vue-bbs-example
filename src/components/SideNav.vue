<template>
  <v-navigation-drawer absolute persistent light :value="drawer" @input="toggled" overflow>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list class="pt-0" dense>
      <template v-for="item in items">
        <v-subheader v-if="item.header" v-text="item.title" :key="item.title"></v-subheader>
        <v-list-tile v-else :key="item.title">
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'side-nav',
  data() {
    return {
      items: [
        { title: 'BOARDS', header: true },
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
      ]
    }
  },
  computed: {
    drawer() {
      return this.$store.state.drawer
    }
  },
  methods: {
    toggled(state) {
      if(this.$store.state.drawer !== state) {
        this.$store.commit('toggleDrawer', state)
      }
    }
  }
}
</script>
