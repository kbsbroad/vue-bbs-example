<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm10>
        <v-card class="card--flex-toolbar">
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ subject }}</v-list-tile-title>
                <v-list-tile-sub-title>
                  <v-icon>account_circle</v-icon>
                  <a href="#" @click.prevent="goToProfile">{{ username }}</a>
                  <span style="margin: 0 10px"> / </span>
                  <v-icon>access_time</v-icon>
                  {{ formatDate(createdAt) }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn primary fab small dark v-if="editable" @click="goToEditForm">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-card-text>
            <div v-html="htmlContent"></div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-layout row justify-center>
              <v-btn primary dark @click="goToList">목록으로</v-btn>
              <v-spacer></v-spacer>
              <v-btn flat v-if="editable" class="red--text" @click="confirmDelete">삭제하기</v-btn>
              <v-btn secondary dark v-if="editable" @click="goToEditForm">수정하기</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent>
        <v-card>
          <v-card-title class="headline">삭제하시겠습니까?</v-card-title>
          <v-card-text>
            글이 삭제되면 복구할 수 없습니다.
            다시 한 번 확인하신 후 삭제 버튼을 눌러주시기 바랍니다.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="red--text darken-1" flat="flat" @click.native="removePost">삭제하기</v-btn>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">취소</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import { FETCH_POST, DELETE_POST } from '@/store/types'
import { formatDate } from '@/utils/date'

export default {
  app: 'post-view',
  data() {
    return {
      id: this.$route.params.id,
      subject: '',
      content: '',
      creator: null,
      createdAt: '',
      dialog: false
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
          this.createdAt = post.createdAt
        })
        .catch(err => {
          console.log(err.message)
          if (err.message === 'Not Found') {
            this.$router.push({ name: 'not-found' })
          } else {
            this.$router.push('/')
          }
        })
    },
    goToEditForm() {
      this.$router.push(`/post/${this.id}/edit`)
    },
    goToList() {
      this.$router.push(`/posts`)
    },
    goToProfile() {
      this.$router.push(`/user/${this.username}/profile`)
    },
    confirmDelete() {
      this.dialog = true
    },
    removePost() {
      this.$store.dispatch(DELETE_POST, this.id)
        .then(result => {
          this.$router.push('/')
        })
    },
    formatDate
  },
  computed: {
    htmlContent() {
      return this.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
    },
    editable() {
      const loginUser = this.$store.state.user.loginUser
      return this.creator && this.creator.username === loginUser
    },
    username() {
      return this.creator ? this.creator.username : ''
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
