<template>
  <v-layout row justify-center>
    <v-flex xs12 sm10>
      <v-form v-model="valid" ref="form">
        <v-card>
          <v-card-title>
            <span class="headline">사용자 등록</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field label="회원아이디" v-model="username" :rules="[rules.required]" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6>
                  <v-text-field label="비밀번호" v-model="password" :rules="[rules.required, rules.confirmPassword]" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field label="비밀번호 확인" v-model="passwordConfirm" :rules="[rules.required, rules.confirmPassword]" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field label="이름" v-model="name" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field label="이메일" v-model="email" :rules="[rules.required, rules.email]" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-layout row justify-center>
              <v-btn flat class="orange--text" @click="submit">가입신청</v-btn>
              <v-btn flat class="orange--text" @click="reset">초기화</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { ADD_USER } from '@/store/types'

export default {
  name: 'login',
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      passwordConfirm: '',
      name: '',
      email: '',
      rules: {
        required: (value) => !!value || 'Required.',
        confirmPassword: () => this.passwordConfirm === this.password || '비밀번호가 다릅니다.',
        email: (value) => {
          const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //eslint-disable-line
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch(ADD_USER, {
          username: this.username,
          password: this.password,
          name: this.name,
          email: this.email
        })
        .then(() => {
          this.$router.push('/')
        })
      }
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
