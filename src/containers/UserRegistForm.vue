<template>
  <v-layout row justify-center>
    <v-flex xs12 sm10>
      <v-form v-model="valid" ref="form">
        <v-card>
          <v-card-title>
            <span class="headline">{{getPageTitle}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    ref="username"
                    label="아이디"
                    v-model="username"
                    :rules="[
                      rules.required,
                      rules.accountRule
                    ]"
                    :disabled="!!reqUsername"
                    required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs6>
                  <v-text-field
                    type="password"
                    ref="password"
                    label="비밀번호"
                    v-model="password"
                    :rules="[
                      rules.passwordRule,
                      rules.confirmPassword
                    ]"
                    :required="!reqUsername"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    type="password"
                    ref="passwordConfirm"
                    label="비밀번호 확인"
                    v-model="passwordConfirm"
                    :rules="[rules.confirmPassword]"
                    :required="!reqUsername"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field ref="name" label="이름" v-model="name" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field ref="email" label="이메일" v-model="email" :rules="[rules.required, rules.email]" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field ref="phone" label="PHONE" v-model="phone"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-layout row justify-center>
              <v-btn primary dark @click="submit">{{ submitText }}</v-btn>
              <v-btn flat class="orange--text" @click="reset">초기화</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { ADD_USER, UPDATE_USER, FETCH_USER } from '@/store/types'
import { checkAccountRule } from '@/utils/string'

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
      phone: '',
      rules: {
        required: (value) => !!value || 'Required.',
        accountRule: (value) => checkAccountRule(value),
        passwordRule: (value) => {
          // 수정 모드에서는 password 란이 채워졌을때만 검사
          if (this.reqUsername && !this.password) {
            return true
          }

          return checkAccountRule(value)
        },
        confirmPassword: () => {
          if (!this.passwordConfirm) {
            return true
          }

          if (
            this.passwordConfirm.length > 0 &&
            this.passwordConfirm === this.password
          ) {
            return true
          }
          return '비밀번호가 다릅니다.'
        },
        email: (value) => {
          const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //eslint-disable-line
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const action = this.reqUsername ? UPDATE_USER : ADD_USER
        this.$store.dispatch(action, {
          username: this.username,
          password: this.password,
          name: this.name,
          email: this.email,
          phone: this.phone
        })
        .then(() => {
          this.$router.push('/')
        })
      }
    },
    reset() {
      Object.keys(this.formValues).forEach(f => {
        if (this.reqUsername && f === 'username') {
          return
        }
        this.$refs[f].reset()
      })
    },
    fetchUser() {
      if (this.reqUsername) {
        this.$store.dispatch(FETCH_USER, this.reqUsername)
          .then(user => {
            this.username = user.username
            this.name = user.name
            this.email = user.email
            this.phone = user.phone
          })
      }
    }
  },
  computed: {
    reqUsername() {
      return this.$route.params.id
    },
    submitText() {
      return this.reqUsername ? '수정하기' : '등록하기'
    },
    formValues() {
      return {
        username: this.username,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        name: this.name,
        email: this.email,
        phone: this.phone
      }
    },
    getPageTitle() {
      return `프로필 ${this.reqUsername ? '수정' : '등록'}`
    }
  }
}
</script>
