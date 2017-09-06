<template>
  <div id="app">
    <v-app toolbar>
      <page-header></page-header>
      <side-nav></side-nav>
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import SideNav from '@/components/SideNav';

export default {
  name: 'app',
  components: {
    'side-nav': SideNav,
    'page-header': PageHeader,
  },
};
</script>
