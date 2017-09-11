<template>
  <v-layout row justify-center>
    <v-flex xs12 sm4>
      <v-form v-model="valid" ref="form">
        <v-card>
          <v-card-title>
            <span class="headline">로그인</span>
          </v-card-title>
          <v-card-text>
            <v-text-field label="아이디" v-model="username" :rules="rules" :counter="16" required></v-text-field>
            <v-text-field label="비밀번호" v-model="password" type="password" :rules="rules" :counter="16" required></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-layout row justify-center>
              <v-btn flat class="orange--text" @click="submit">로그인</v-btn>
              <v-btn flat class="orange--text" @click="reset">초기화</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
    <alert-message
      ref="errorMsg"
      type="error"
      message="로그인 정보가 틀리거나, 존재하지 않는 사용자입니다."
    ></alert-message>
  </v-layout>
</template>

<script>
import { LOGIN } from '@/store/types'
import AlertMessage from '@/components/AlertMessage'
import { checkAccountRule } from '@/utils/string'

export default {
  name: 'login',
  components: {
    'alert-message': AlertMessage
  },
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      rules: [
        v => !!v || 'This feild is required',
        v => checkAccountRule(v)
      ]
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch(LOGIN, {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {
          // console.warn(err.stack || err)
          this.$refs.errorMsg.show()
        })
      }
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
