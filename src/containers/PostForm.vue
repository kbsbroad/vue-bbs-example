<template>
  <v-layout row justify-center>
    <v-flex xs12 sm10>
      <v-form v-model="valid" ref="form">
        <v-card>
          <v-card-title>
            <span class="headline">{{ pageTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-text-field label="제목" v-model="subject" :rules="subjectRules" :counter="100" required></v-text-field>
            <v-text-field label="내용" v-model="content" textarea :counter="1000"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-layout row justify-center>
              <v-btn primary dark @click="submit">submit</v-btn>
              <v-btn @click="clear">clear</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { ADD_POST, UPDATE_POST, FETCH_POST } from '@/store/types'

export default {
  name: 'post-form',
  data() {
    return {
      valid: false,
      subject: '',
      content: '',
      subjectRules: [
        v => !!v || '제목은 필수입니다.',
        v => (v && v.length <= 100) || '제목은 100자 이하로 가능합니다.'
      ],
      contentRules: [
        v => (v && v.length <= 1000) || '내용은 1000자 이하로 가능합니다.'
      ]
    }
  },
  mounted() {
    this.fetchPost()
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const action = this.postId ? UPDATE_POST : ADD_POST
        const payload = {
          subject: this.subject,
          content: this.content
        }

        let nextUrl = '/'

        if (this.postId) {
          payload._id = this.postId
          nextUrl = `/post/${this.postId}`
        }

        this.$store.dispatch(action, payload)
        .then(() => {
          this.$router.push(nextUrl)
        })
      }
    },
    clear() {
      this.$refs.form.reset()
    },
    fetchPost() {
      if (this.postId) {
        this.$store.dispatch(FETCH_POST, this.postId)
          .then(post => {
            this.subject = post.subject
            this.content = post.content
          })
      }
    }
  },
  computed: {
    postId() {
      return this.$route.params.id
    },
    pageTitle() {
      return this.$route.params.id ? '글 수정하기' : '새글 쓰기'
    }
  }
}
</script>
