<template>
  <div id="app" v-bind:class="{ ifApi: isApi }">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
    }
  },
  computed: {
    isApi: function () {
      if (this.$route.name === 'Apikey') {
        return true
      }
      return false
    }
  },
  methods: {
  },
  created: function () {
  }
}
</script>

<style>
.ifApi {
    display: table;
    position: absolute;
    height: 100%;
    width: 100%;
}
.apikey {
     display: table-cell;
    vertical-align: middle;
}
.centerize {
  margin-left: auto;
    margin-right: auto; 
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.hide {
  display: none;
}
</style>
