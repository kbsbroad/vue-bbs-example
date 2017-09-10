<template>
  <div id="app">
    <v-app toolbar>
      <page-header title="Vue Simple BBS"></page-header>
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'

export default {
  name: 'app',
  components: {
    'page-header': PageHeader
  }
}
</script>
