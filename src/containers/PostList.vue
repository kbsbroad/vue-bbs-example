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
      :pagination.sync="pagination"
    >
      <template slot="headers" scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-icon>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template slot="items" scope="props">
        <tr :active="props.selected" @click="goToPostView(props.item._id)">
          <td class="text-xs-center">{{ props.item._id }}</td>
          <td>{{ props.item.subject }}</td>
          <td>{{ props.item.creator.username }}</td>
          <td>{{ props.item.createdAt }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { FETCH_POSTS } from '@/store/types'

export default {
  name: 'post-list',
  data() {
    return {
      pagination: {
        page: 1,
        sortBy: 'createdAt',
        descending: true,
        rowsPerPage: 10,
        totalItems: 0
      },
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
      this.$store.dispatch(FETCH_POSTS, {
        page: this.pagination.page,
        sort: this.pagination.column,
        size: this.pagination.rowsPerPage,
        direction: this.pagination.descending ? -1 : 1
      })
    },
    toggleAll() {
      if (this.selected.length) this.selected = []
      else this.selected = this.items.slice()
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    goToPostForm() {
      this.$router.push('/post/create')
    },
    goToPostView(id) {
      this.$router.push(`/post/${id}`)
    }
  },
  computed: {
    posts() {
      return this.$store.state.post.posts
    },
    editable() {
      return !!this.$store.state.user.loginUser
    }
  }
}
</script>
