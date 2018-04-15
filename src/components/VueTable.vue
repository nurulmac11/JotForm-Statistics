<template>
  <div class="vuetable">
  <vue-good-table
          :columns="columns"
          :rows="data"
          :paginate="true"
          :onClick="onClickFn"
          :globalSearch="true"
          styleClass="table table-bordered condensed"
          :defaultSortBy="{field: 'dupl', type: 'desc'}"
          :lineNumbers="true">
  </vue-good-table>
  </div>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import VueGoodTable from 'vue-good-table'

Vue.use(VueGoodTable)
export default {
  name: 'DataTableVue',
  props: [
    'data',
    'json',
    'label',
    'qtext'
  ],
  computed: {
    currentSub: function () {
      return this.$store.state.currentSub
    }
  },
  data: function () {
    return {
      'test': 'abc',
      columns: [
        {
          label: this.qtext,
          field: 'answer',
          filterable: true,
          html: true,
          thClass: 'colStyle'
        },
        {
          label: 'Count',
          field: 'dupl',
          filterable: false,
          type: 'number',
          width: '20px',
          thClass: 'countStyle'
        }
      ],
      onClickFn: function (row, index) {
        var counter = 0
        let subs = this.$store.state.submissions // submissions state
        let results = [] // related submissions array
        for (var key in row.submissionID) { // iterate in clicked row's submissions
          var result = subs.filter(function (obj) {
            return obj.id === row.submissionID[key] // find related submissions
          })
          results.push(result[0].answers) // collect correct submissions
          counter = counter + 1
        }
        this.$store.commit('changeCurSub', results) // change current submissions
        this.$router.push({ path: 'singlesub', // push to the single submission component
          query: { count: counter } })
      }
    }
  },
  components: {
    Router
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.global-search {
  margin-top: -23px;
}
.global-search-icon {
  margin-top: 15px;
}
.currentSub {
  margin-left: 5px;
  margin-right: 5px;
}
.answers {
  /*margin-top: -35px; */
  text-align: left;
}
.vuetable tr {
  height: 50px;
}
.countStyle:before {
    content: "\f24d";
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-decoration: inherit;
/*--adjust as necessary--*/
    color: #000;
    font-size: 18px;
    padding-right: 0.5em;
    top: 10px;
    left: 0;
}
.colStyle:before {
    content: "\f05a";
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-decoration: inherit;
/*--adjust as necessary--*/
    color: #000;
    font-size: 18px;
    padding-right: 0.5em;
    top: 10px;
    left: 0;
}
</style>
