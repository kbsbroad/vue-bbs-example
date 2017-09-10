<template>
  <v-layout row justify-center>
    <v-flex xs12 sm10>
      <v-card class="card--flex-toolbar">
        <v-toolbar card class="white" prominent>
          <v-toolbar-title class="title">{{ subject }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn primary fab small dark v-if="editable" @click="goToEditForm">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <div v-html="htmlContent"></div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-layout row justify-center>
            <v-btn primary dark @click="goToList">목록으로</v-btn>
            <v-spacer></v-spacer>
            <v-btn flat v-if="editable" class="red--text">삭제하기</v-btn>
            <v-btn secondary dark v-if="editable" @click="goToEditForm">수정하기</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { FETCH_POST } from '@/store/types'

export default {
  app: 'post-view',
  data() {
    return {
      id: this.$route.params.id,
      subject: '',
      content: '',
      creator: null
    }
  },
  created() {
    this.fetchPosts()
  },
  methods: {
    fetchPosts() {
      this.$store.dispatch(FETCH_POST, this.id)
        .then(post => {
          this.subject = post.subject
          this.content = post.content
          this.creator = post.creator
        })
    },
    goToEditForm() {
      this.$router.push(`/post/${this.id}/edit`)
    },
    goToList() {
      this.$router.push(`/posts`)
    }
  },
  computed: {
    htmlContent() {
      return this.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
    },
    editable() {
      const loginUser = this.$store.state.user.loginUser
      return this.creator && this.creator.username === loginUser
    }
  }
}
</script>
