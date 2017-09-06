<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h5>새글 쓰기</h5>
    </v-flex>
    <v-flex xs12>
      <v-form v-model="valid" ref="form">
        <v-text-field label="제목" v-model="subject" :rules="subjectRules" :counter="100" required></v-text-field>
        <v-text-field label="내용" v-model="content" textarea :counter="1000"></v-text-field>
        <v-btn @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'post-form',
  data() {
    return {
      valid: false,
      subject: '',
      subjectRules: [
        v => !!v || '제목은 필수입니다.',
        v => (v && v.length <= 100) || '제목은 100자 이하로 가능합니다.',
      ],
      content: '',
      contentRules: [
        v => (v && v.length <= 1000) || '내용은 1000자 이하로 가능합니다.',
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('createPost', {
          subject: this.subject,
          content: this.content,
        });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
