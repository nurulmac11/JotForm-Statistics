<template>
  <div class="currentSub">
    <HeaderMe />
    <div class="singleSub">
<b-tabs pills v-if="counter > 1">
  <b-tab :title="index + 1 + ''" :key="singlesub.id" v-for="(singlesub, index, key) in currentSub">
     <p v-for="(ans, index, key) in singlesub" v-html="'<br><b>' + ans.text + '</b> <br/>' + 
        ifObj(ans)" class="answers">
        </p>
  </b-tab>
</b-tabs>

<div style="margin-left: 20px; margin-right:20px;" v-if="counter === 1">
  <p v-for="(ans, index, key) in currentSub[0]" v-html="'<b>' + ans.text + '</b> <br/>' + 
        ifObj(ans)" class="answers">
  </p>
  </div>
</div>
  </div>
</template>

<script>
import HeaderMe from './Head'

export default {
  name: 'singlesub',
  data: function () {
    return {
      slide: 0,
      sliding: null
    }
  },
  created: function () {
    window.scrollTo(0, 0)
  },
  computed: {
    currentSub: function () {
      return this.$store.state.currentSub
    },
    counter: function () {
      return this.$route.query.count
    }
  },
  methods: {
    ifObj: function (varobj) {
      if (typeof varobj.answer === 'object') {
        return varobj.prettyFormat
      }
      else {
        return varobj.answer
      }
    }
  },
  mounted () {
  },
  components: {
    HeaderMe
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.singleSub {
  text-align: left;
  margin-bottom: 50px;
}
.currentSub .nav-link {
  width: auto !important;
}
.currentSub .tabs {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
