<template>
  <div class="apikey">
      <div class="centerize">
        <HeaderMe />
        <div class="apiform">
          <p>{{ logStatus }}</p>
        <input type="text" style="" placeholder="Enter your apikey" v-model="apikey" class="form-control" autofocus />
         <b-button style="margin-top:5px; color: white !important;" v-on:click="changeApiKey()" variant="warning">Login</b-button>
     </div>
   </div>
  </div>
</template>

<script>
import HeaderMe from './Head'
import Router from 'vue-router'

export default {
  name: 'apikey',
  data: function () {
    return {
      'apikey': ''
    }
  },
  computed: {
    currApi: function () {
      return this.$store.state.apiKey
    },
    logStatus: function () {
      return this.$store.state.loginStatus
    }
  },
  methods: {
    changeApiKey: function () {
      this.$store.commit('changeApiKey', [this.apikey, this.$router])
    },
    checkLocalApi: function () {
      this.$store.state.loginStatus = ''
      var storage = window.localStorage
      var value = storage.getItem('apikey')
      if (value !== 'null' && value !== null && value !== '') {
        this.$store.commit('changeApiKey', [value, this.$router])
      }
    }
  },
  mounted () {
    this.checkLocalApi()
  },
  components: {
    HeaderMe,
    Router
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.apiform {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
