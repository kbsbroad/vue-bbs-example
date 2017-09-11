<template>
  <div id="post-list">
    <v-layout row justify-space-between>
      <h5>Sample Board</h5>
      <v-spacer></v-spacer>
      <v-btn primary @click="goToPostForm" v-if="editable"><strong>새글 쓰기</strong></v-btn>
    </v-layout>

    <v-data-table
      class="elevation-1"
      v-model="selected"
      select-all
      selected-key="name"
      :headers="headers"
      :items="posts"
      hide-actions
      :pagination.sync="pagination"
    >
      <template slot="headers" scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.text" class="column">
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template slot="items" scope="props">
        <tr :active="props.selected">
          <td class="text-xs-center post-seq">{{ props.item.seq }}</td>
          <td><a href="#" @click.prevent="goToPostView(props.item._id)">{{ props.item.subject }}</a></td>
          <td class="text-xs-center post-user"><a href="#" @click.prevent="goToProfile(props.item.creator.username)">{{ props.item.creator.username }}</a></td>
          <td class="text-xs-center post-date">{{ formatDate(props.item.createdAt) }}</td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>

<script>
import { FETCH_POSTS } from '@/store/types'
import { formatDate } from '@/utils/date'

export default {
  name: 'post-list',
  data() {
    return {
      pagination: {
        page: this.$route.params.page ? Number(this.$route.params.page) : 1,
        sortBy: 'seq',
        descending: true,
        rowsPerPage: 10,
        totalItems: 0
      },
      posts: [],
      selected: [],
      headers: [
        { text: 'NO.', value: 'no' },
        { text: '제목', value: 'subject' },
        { text: '작성자', value: 'creator' },
        { text: '작성일', value: 'createdAt' }
      ]
    }
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    fetchPosts() {
      return this.$store.dispatch(FETCH_POSTS, {
        page: this.pagination.page,
        sort: this.pagination.column,
        size: this.pagination.rowsPerPage,
        direction: this.pagination.descending ? -1 : 1
      })
      .then(result => {
        this.posts = result.data
        this.pagination.totalItems = result.metadata.total
        return result
      })
      .catch(err => {
        if (err.message === 'Not Found') {
          this.$router.push({ name: 'not-found' })
        } else {
          this.$router.push('/')
        }
      })
    },
    goToPostForm() {
      this.$router.push('/post/create')
    },
    goToPostView(id) {
      this.$router.push(`/post/${id}`)
    },
    goToProfile(username) {
      this.$router.push(`/user/${username}/profile`)
    },
    formatDate(datestr) {
      return formatDate(datestr)
    }
  },
  computed: {
    editable() {
      return !!this.$store.state.user.loginUser
    },
    pages() {
      return this.pagination.rowsPerPage ? Math.ceil(this.posts.length / this.pagination.rowsPerPage) : 0
    }
  }
}
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.post-seq {
  width: 100px;
}
.post-user {
  width: 120px;
}
.post-date {
  width: 140px;
}
</style>
