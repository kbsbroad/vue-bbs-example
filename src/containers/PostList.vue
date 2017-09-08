<template>
  <div id="post-list">
    <v-data-table
      v-model="selected"
      v-bind:headers="headers"
      v-bind:items="items"
      select-all
      v-bind:pagination.sync="pagination"
      selected-key="name"
      class="elevation-1"
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
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td class="text-xs-center">{{ props.posts._id }}</td>
          <td>{{ props.posts.subject }}</td>
          <td>{{ props.posts.creator }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'post-list',
  data() {
    return {
      pagination: {
        sortBy: 'name',
      },
      selected: [],
      headers: [
        {
          text: 'NO.',
          value: 'name',
        },
        {
          text: '제목',
          value: 'subject',
        },
        {
          text: '작성자',
          value: 'creator',
        }
      ]
    }
  },
  methods: {
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
    }
  },
  computed: {
    posts() {
      return this.$store.state.post.posts
    }
  }
}
</script>
