<template>
    <div class="table" id="table">
        <b-tabs ref="tabs" class="charts" card>
            <b-tab title="Bar" :active="bar" v-if="loadBar">
               <div><small class="form-text text-muted" style="text-align:left;margin-left:10px;"><i class="fa fa-reply-all" aria-hidden="true"></i> {{countResponse}} responses for {{ qtext }}</small></div>
                <div style="margin:0 auto; max-width:400px">
                    <chart :colorset="colorSet" :data="rows" :label="questionNo" :json="jsonForChart"></chart>
                  </div>
            </b-tab>
            <b-tab title="Doughnut" :active="doughnut" v-if="loadDog">
               <div style=""><small class="form-text text-muted" style="text-align:left;margin-left:10px;"><i class="fa fa-reply-all" aria-hidden="true"></i> {{countResponse}} responses for {{ qtext }}</small></div>
                <div style="margin:0 auto; max-width:400px" class="doughnut">
                    <doughnut :colorset="colorSet" :data="rows" :label="questionNo" :json="jsonForChart"></doughnut>
                </div>
            </b-tab>
            <b-tab title="Table" v-if="!loadBar && !loadDog" :active="table">
               <div style="text-align:left; margin-bottom:-42px; margin-top:-15px; margin-left:10px;"><small class="form-text text-muted" style="text-align:left;"><i class="fa fa-reply-all" aria-hidden="true"></i> {{countResponse}} responses<br><i class="fa fa-info-circle" aria-hidden="true"></i> You can click on the rows to view related submission.
              </small></div>
               <Vuetable :qtext="qtext" :data="rows" :label="questionNo" :json="jsonForChart"></Vuetable>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
  import Chart from './Chart'
  import Doughnut from './Doughnut'
  import Vuetable from './VueTable'

  export default {
    name: 'DataTable',
    props: {
      questionNo: String,
      qtext: String,
      countResponse: Number
    },
    data: function () {
      return {
        'table': false,
        'doughnut': false,
        'bar': false
      }
    },
    created: function () {
      if ('type' in this.rows[0] && (this.rows[0].type.includes('dropdown') ||
       this.rows[0].type.includes('radio'))) {
        this.doughnut = true
      }
      else if ('type' in this.rows[0] && (this.rows[0].type.includes('rating') ||
       this.rows[0].type.includes('scale'))) {
        this.bar = true
      }
      else {
        this.table = true
      }
    },
    methods: {
    },
    computed: {
      loadBar: function () {
        if ('type' in this.rows[0] && (this.rows[0].type.includes('rating') ||
          this.rows[0].type.includes('scale'))) {
          return true
        }
        return false
      },
      loadDog: function () {
        if ('type' in this.rows[0] && (this.rows[0].type.includes('dropdown') ||
          this.rows[0].type.includes('radio'))) {
          return true
        }
        return false
      },
      colorSet: function () {
        function shuffle (array) {
          for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1))
            var temp = array[i]
            array[i] = array[j]
            array[j] = temp
          }
          return array
        }
        var CSS_COLOR_NAMES = ['YellowGreen', 'Crimson', 'DeepSkyBlue', 'Fuchsia', 'GoldenRod', 'Gray', 'IndianRed', 'Khaki', 'LightSalmon', 'Olive', 'Orange', 'PaleVioletRed', 'Peru', 'Pink', 'Red', 'Salmon', 'Sienna', 'Silver', 'Tan', 'Tomato', 'Violet', 'Yellow']
        CSS_COLOR_NAMES = shuffle(CSS_COLOR_NAMES)
        let dataCount = this.jsonForChart[1].length
        CSS_COLOR_NAMES = CSS_COLOR_NAMES.slice(0, dataCount + 1)
        return CSS_COLOR_NAMES
      },
      jsonForChart: function () {
        let justAnswers = [[], [], []]
        for (let key in this.rows) {
          if (this.rows[key].answer === undefined || this.rows[key].answer === '' || this.rows[key].answer === ' ') {
            // justAnswers[0].push('No answer')
          }
          else {
            justAnswers[0].push(this.rows[key].answer)
          }
          justAnswers[1].push(this.rows[key].dupl)
          justAnswers[2].push(this.rows[key].text)
        }
        return justAnswers
      },
      rows: function () {
        let answ = this.$store.state.answers
        let finalAns = []
        function checkeq (var1, var2) {
          if (typeof var2.answer === 'object') {
            var ust = String(var2.prettyFormat)
            return ust === var1
          }
          return var1 === var2.answer
        }
        function ifObj (varobj) {
          if (typeof varobj.answer === 'object') {
            return varobj.prettyFormat
          }
          else {
            return varobj.answer
          }
        }
        function IsJsonString (str) {
          try {
            JSON.parse(str)
          }
          catch (e) {
            return false
          }
          return true
        }
        for (let key in answ) {
          for (let key2 in answ[key].data) {
            if (answ[key].id === this.questionNo) {
              let curAns = answ[key].data[key2]
              let dupl = finalAns.filter(finalan => checkeq(finalan.answer, curAns))
              if (dupl.length === 0) { // if unique, insert new
                curAns.dupl = 1
                if (typeof curAns.answer === 'object') {
                  curAns.answer = curAns.prettyFormat
                  finalAns.push(curAns)
                }
                else if (IsJsonString(curAns.answer)) {
                  curAns.answer = JSON.stringify(JSON.parse(curAns.answer), null, 2)
                  finalAns.push(curAns)
                }
                else if (curAns.answer === undefined || curAns.answer === '') {
                  // skip
                }
                else {
                  if (curAns.answer !== undefined) {
                    curAns.answer = curAns.answer.replace(/(https?:\/\/.*?\.(?:png|jpe?g|gif)(.*))(\w|$)/ig, "<br><img style='max-width:100px;' src='$1'>")
                  }
                  finalAns.push(curAns)
                }
              }
              else { // if duplicate increment counter
                for (let dIndex in finalAns) {
                  if (finalAns[dIndex].answer === ifObj(curAns)) {
                    let group = finalAns[dIndex].dupl
                    if (!finalAns[dIndex].submissionID.includes(curAns.submissionID[0])) {
                      finalAns[dIndex].submissionID.push(curAns.submissionID[0])
                    }
                    finalAns[dIndex].dupl = group + 1
                  }
                }
              }
            }
          }
        }
        return finalAns
      }
    },
    components: {
      Chart,
      Doughnut,
      Vuetable
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.card-body {
  padding: 0px !important;
}
.charts .card-header {
  display: none;
}
.nav.nav-tabs {
  width: max-content;
}
.card-header {
  overflow-x: auto;
  overflow-y: hidden;
}


::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
}

::-webkit-scrollbar
{
  width: 10px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
  background-color: #F90; 
  background-image: -webkit-linear-gradient(45deg,
                                            rgba(255, 255, 255, .2) 25%,
                        transparent 25%,
                        transparent 50%,
                        rgba(255, 255, 255, .2) 50%,
                        rgba(255, 255, 255, .2) 75%,
                        transparent 75%,
                        transparent)
}
.hello { 
  white-space:pre-wrap; 
}
</style>
