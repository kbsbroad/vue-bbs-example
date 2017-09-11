<template>
  <v-layout row justify-center>
    <v-flex xs12 sm10>
      <v-card class="card--flex-toolbar">
        <v-toolbar card class="white" prominent>
          <v-toolbar-title class="title">
            <v-icon large class="purple--text text--darken-2">face</v-icon>
            {{ name }}
            <v-chip small label outline class="red red--text" v-if="isMe">me</v-chip>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="goToMain">
            <v-icon>list</v-icon>
          </v-btn>
          <v-btn fab small dark v-if="editable" class="purple" @click="goToEditForm">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon class="purple--text">account_box</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>LOGIN ID</v-list-tile-sub-title>
                <v-list-tile-title>{{ username }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="email">
              <v-list-tile-action>
                <v-icon class="purple--text">email</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>EMAIL</v-list-tile-sub-title>
                <v-list-tile-title>{{ email }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="isLoggedIn && phone">
              <v-list-tile-action>
                <v-icon class="purple--text">phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>PHONE</v-list-tile-sub-title>
                <v-list-tile-title>{{ phone }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
    <alert-message
      ref="errorMsg"
      type="error"
      :timeout="5000"
      message="존재하지 않는 사용자입니다. 5초 후에 메인페이지로 이동합니다."
    ></alert-message>
  </v-layout>
</template>

<script>
import { FETCH_USER } from '@/store/types'
import AlertMessage from '@/components/AlertMessage'

export default {
  name: 'user-profile',
  components: {
    'alert-message': AlertMessage
  },
  data() {
    return {
      username: '',
      name: '',
      email: '',
      phone: ''
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      this.$store.dispatch(FETCH_USER, this.$route.params.id)
        .then(user => {
          this.name = user.name
          this.username = user.username
          this.email = user.email
          this.phone = user.phone
        })
        .catch(() => {
          this.$refs.errorMsg.show()
          setTimeout(() => {
            this.$router.push('/')
          }, 5000)
        })
    },
    goToEditForm() {
      this.$router.push(`/user/${this.reqUsername}/edit`)
    },
    goToMain() {
      this.$router.push('/')
    }
  },
  computed: {
    reqUsername() {
      return this.$route.params.id
    },
    editable() {
      return this.username === this.$store.state.user.loginUser
    },
    isMe() {
      return this.editable
    },
    isLoggedIn() {
      return !!this.$store.state.user.loginUser
    }
  },
  watch: {
    reqUsername() {
      this.fetchUser()
    }
  }
}
</script>
