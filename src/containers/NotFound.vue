<template>
  <v-layout row justify-center>
    <v-flex xs12 sm8>
      <v-card>
        <v-card-title>
          <span class="headline">404 Not Found</span>
        </v-card-title>
        <v-card-text>
          <p>요청하신 페이지나 자료가 존재하지 않습니다.</p>
          <p>확인 후 다시 시도하시거나 관리자에게 문의하시기 바랍니다.</p>
        </v-card-text>
        <v-card-actions>
          <v-layout row justify-center>
            <v-btn flat class="orange--text" @click="goToMain">메인페이지로 이동</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'not-found',
  methods: {
    goToMain() {
      this.$router.push('/')
    }
  }
}
</script>
