<template>
  <div class="headermenu"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Jotform-logo-transparent-800x400.png" width="200px">
        <q-btn icon="edit" :disable="ifnotforms" v-on:click="goSelect" color="amber" class="full-width"  :class="ifnotlogin">Forms</q-btn>
        <q-btn icon="" v-on:click="goBack" color="amber" class="full-width"  :class="ifnotsing">
          <i class="fa fa-backward" style="margin-right: 10px" aria-hidden="true"></i>Back To {{ formName }}</q-btn>

  </div>
</template>


<script>
import {QBtn} from 'quasar'
import Router from 'vue-router'
export default {
  name: 'Header',
  data: function () {
    return {
    }
  },
  methods: {
    goSelect () {
      this.$router.push('forms')
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  computed: {
    ifnotforms: function () {
      if (this.$route.name === 'SelectForm') {
        return true
      }
      return false
    },
    formName: function () {
      return this.$store.state.formName
    },
    ifnotsing: function () {
      if (this.$route.name === 'singlesub') {
        return true
      }
      return 'hider'
    },
    ifnotlogin: function () {
      if (this.$route.name === 'Hello') {
        return true
      }
      return 'hider'
    }
  },
  components: {
    QBtn,
    Router
  }
}
</script>

<style scoped>
.headermenu {
  padding-left: 20px !important;
  padding-right: 20px !important;
  margin-bottom: 10px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.hider {
  display: none;
}
</style>