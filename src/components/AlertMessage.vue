<template>
  <v-snackbar
    :timeout="timeout"
    :success="type === 'success'"
    :info="type === 'info'"
    :warning="type === 'warning'"
    :error="type === 'error'"
    :primary="type === 'primary'"
    :secondary="type === 'secondary'"
    :multi-line="type === 'multi-line'"
    :vertical="type === 'vertical'"
    v-model="show_"
  >
    {{ message }}
    <v-btn dark flat @click.native="show_ = false">닫기</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'alert-message',
  props: {
    type: {
      type: String,
      default: 'info',
      validator(value) {
        const allowList = [
          'success',
          'info',
          'warning',
          'error',
          'primary',
          'secondary',
          'multi-line',
          'vertical'
        ]
        return allowList.indexOf(value) > -1
      }
    },
    message: {
      type: String,
      required: true
    },
    timeout: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      show_: false
    }
  },
  methods: {
    show() {
      this.show_ = true
    }
  }
}
</script>
