<template>
  <v-toolbar fixed class="purple darken-2" dark>
    <v-toolbar-title><router-link to="/" class="pageTitle">{{ title }}</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn class="btn-greeting" flat v-if="loginUser" @click="goToProfile">
        Hi, {{loginUser}}
      </v-btn>
      <v-btn class="btn-logout" flat v-if="loginUser" @click="logout">Log Out</v-btn>
      <v-btn class="btn-login" flat v-if="!loginUser" @click="goToLoginForm">Log In</v-btn>
      <v-btn class="btn-register" flat v-if="!loginUser" @click="goToUserRegistForm">Register</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { LOGOUT } from '@/store/types'
export default {
  name: 'page-header',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT)
    },
    goToLoginForm() {
      this.$router.push('/login')
    },
    goToUserRegistForm() {
      this.$router.push('/user/regist')
    },
    goToHome() {
      this.$router.push('/')
    },
    goToProfile() {
      this.$router.push(`/user/${this.loginUser}/profile`)
    }
  },
  computed: {
    loginUser() {
      return this.$store.state.user.loginUser
    }
  }
}
</script>

<style>
.pageTitle {
  color: white;
  text-decoration: none;
}
</style>
