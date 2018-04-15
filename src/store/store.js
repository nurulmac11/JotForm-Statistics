import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const state = {
  account: {},
  forms: {},
  submissions: {},
  formId: '',
  formName: '',
  answers: {},
  apiKey: '',
  authUrl: 'http://api.jotform.com/user?apiKey=',
  formIds: {},
  ifEmpty: '',
  loginStatus: '',
  currentSub: [],
  isLoading: false,
  final: [],
  lastActiveTab: 2
}

const mutations = {
  logout () {
    state.account = {}
    state.forms = {}
    state.submissions = {}
    state.formId = ''
    state.formName = ''
    state.answers = {}
    state.apiKey = ''
    state.formIds = {}
    state.ifEmpty = ''
  },
  changeCurSub (state, param) {
    // state.currentSub = params
    // state.currentSub = []
    state.currentSub = []
    Object.assign(state.currentSub, param)
    // state.currentSub = param
  },
  changeID (state, param) {
    state.formId = param[0]
    state.formName = param[1]
    state.submissions = {}
    state.answers = {}
  },
  changeApiKey (state, param) {
    state.apiKey = param[0]
    state.loginStatus = 'Logging...'
    axios.get(state.authUrl + state.apiKey).then((response) => {
      state.account = response.data.content
      var storage = window.localStorage
      if (response.data.responseCode === 200) {
        state.loginStatus = 'Logged in, redirecting...'
        storage.setItem('apikey', param[0])
        param[1].push('forms')
      }
      else {
        storage.removeItem('apikey')
        state.account = {}
        state.forms = {}
        state.submissions = {}
        state.formId = ''
        state.formName = ''
        state.answers = {}
        state.apiKey = ''
        state.formIds = {}
        state.ifEmpty = ''
        state.loginStatus = 'Wrong API Key'
        param[1].push('/')
        state.loginStatus = 'Wrong API Key'
      }
    }).catch(function (error) {
      var storage = window.localStorage
      console.log(error)
      storage.removeItem('apikey')
      state.account = {}
      state.forms = {}
      state.submissions = {}
      state.formId = ''
      state.formName = ''
      state.answers = {}
      state.apiKey = ''
      state.formIds = {}
      state.ifEmpty = ''
      state.loginStatus = 'Wrong API Key'
      param[1].push('/')
      state.loginStatus = 'Wrong API Key'
    })
  },
  getFormIDs () {
    axios.get('https://api.jotform.com/user/forms?apiKey=' + state.apiKey, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }}).then(response => {
      let idArray = []
      for (let key in response.data.content) {
        idArray.push(response.data.content[key])
      }
      Vue.set(state.formIds, 'data', idArray)
      state.isLoading = false
    }).catch((error) => {
      console.log(error)
    })
  },
  getUser () {
    axios.get(state.authUrl + state.apiKey).then((response) => {
      state.account = response.data.content
      state.isLoading = false
    })
    return state.account
  },
  getForms () {
    axios.get(state.authUrl + state.apiKey).then((response) => {
      state.forms = response
    })
    return state.forms
  },
  getSubmissions () {
    axios.get('https://api.jotform.com/user/submissions?apiKey=' + state.apiKey, {
      params: {
        filter: {'formIDs': [state.formId]}
      }
    }).then((response) => {
      state.submissions = response.data.content
      Object.keys(state.submissions).forEach(function (index) {
        var eachSub = state.submissions[index]
        Object.keys(eachSub.answers).forEach(function (index2) {
          let submissionID = eachSub.id
          var eachAns = eachSub.answers[index2]
          Vue.set(eachAns, 'submissionID', [submissionID])
          if (index2 in state.answers && !(eachAns in state.answers[index2])) { // if question set created push
            state.answers[index2].data.push(eachAns)
          }
          else { // if not create question point
            let klm = {id: index2, data: [eachAns]}
            Vue.set(state.answers, index2, klm)
          }
        })
      })
      // let subCount = Object.keys(state.submissions).length
      state.ifEmpty = '' // There are ' + subCount + ' submissions and ' + Object.keys(state.answers).length + ' questions for this form.
      state.isLoading = false
    })
    return state.submissions
  }
}

const actions = {

}

const getters = {
  account: state => { return state.account },
  forms: state => { return state.forms },
  submissions: state => { return state.submissions },
  apiKey: state => { return state.apiKey },
  answers: state => { return state.answers },
  formIds: state => { return state.formIds },
  formId: state => { return state.formId },
  ifEmpty: state => { return state.ifEmpty },
  currentSub: state => { return state.currentSub },
  isLoading: state => { return state.isLoading },
  final: state => { return state.final },
  lastActiveTab: state => { return state.lastActiveTab },
  loginStatus: state => { return state.loginStatus }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
