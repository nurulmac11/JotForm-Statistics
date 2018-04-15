<template>
  <div class="hello">
    <HeaderMe />
    <div v-bind:class="{ hider: !isLoading }">
    <center><ring-loader ></ring-loader></center>
    </div>
      <div v-bind:class="{ hider: isLoading }">
        <h5>{{ formName }}</h5>
        <div v-if="Object.keys(sublist).length > 0">
          <div><small class="form-text text-muted" style="text-align:left;margin-left:10px;">{{ ifEmpty }}</small></i></div>
          <b-card no-body>
            <b-tabs ref="tabs" card v-model="tabIndex">
              <div v-for="(ans, index, key) in ansCollect">
                <b-tab  :title="key + 1 + '.' + checkEx(ans.data[0].text)" >
                <DataTable :countResponse="checkAnswers(ans.data)" :questionNo="index" :qtext="checkEx(ans.data[0].text)" />
                </b-tab>
              </div>
            </b-tabs>
          </b-card>
        </div>
        <p v-if="Object.keys(sublist).length == 0"> There is no submission for this form. </p>
      </div> <!-- charts -->
  </div>
</template>

<script>
import HeaderMe from './Head'
import DataTable from './Table'
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import { QTabs, QTabPane, QTab } from 'quasar'

export default {
  name: 'hello',
  data: function () {
    return {
      'qNo': 1
    }
  },
  created: function () {
  },
  computed: {
    tabIndex: {
      get: function () {
        return this.$store.state.lastActiveTab
      },
      set: function (newValue) {
        this.$store.state.lastActiveTab = newValue
      }
    },
    credentials: function () {
      return this.$store.state.account
    },
    isLoading: function () {
      return this.$store.state.isLoading
    },
    ifEmpty: function () {
      return this.$store.state.ifEmpty
    },
    form_list: function () {
      return this.$store.state.forms
    },
    sublist: function () {
      return this.$store.state.submissions
    },
    ansCollect: function () {
      return this.$store.state.answers
    },
    formIds: function () {
      return this.$store.state.formIds.data
    },
    formId: function () {
      return this.$store.state.formId
    },
    formName: function () {
      return this.$store.state.formName
    }
  },
  methods: {
    checkAnswers: function (ans) {
      let i = 0
      for (let key in ans) {
        if (ans[key].answer && ans[key].answer !== undefined && ans[key].answer !== ' ') {
          i = i + 1
        }
      }
      return i
    },
    checkEx: function (anst) {
      if (anst === undefined || anst === '') {
        return 'Widget'
      }
      else {
        return anst
      }
    },
    getAcc: function () {
      this.$store.commit('getUser')
    },
    getForms: function () {
      this.$store.commit('getForms')
    },
    getSubs: function () {
      this.$store.commit('getSubmissions')
    },
    getIDs: function () {
      this.$store.commit('getFormIDs')
    }
  },
  mounted () {
    this.$store.state.isLoading = true
    function isEmpty (obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false
        }
      }
      return true
    }
    if (isEmpty(this.sublist) || (this.sublist[0].form_id !== this.formId)) {
      this.getSubs()
    }
    else {
      this.$store.state.isLoading = false
    }
  },
  components: {
    HeaderMe,
    DataTable,
    RingLoader,
    QTabs,
    QTab,
    QTabPane
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.nav-link {
  text-overflow: ellipsis;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
}
.hider {
  position: absolute; 
  overflow: hidden; 
  clip: rect(0 0 0 0); 
  height: 1px; width: 1px; 
  margin: -1px; padding: 0; border: 0; 
  display: none !important;
  position: absolute;
  visibility:hidden;
  display:none;
}
.loader {
  background: white;
}
body { 
  white-space: normal; 
}
</style>
