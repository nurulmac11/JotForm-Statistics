import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

export default new Router({
  routes: [
    {
      path: '/forms',
      name: 'SelectForm',
      component: load('SelectForm')
    },
    {
      path: '/',
      name: 'Apikey',
      component: load('Apikey')
    },
    {
      path: '/statistics',
      name: 'Hello',
      component: load('Hello')
    },
    {
      path: '/singlesub',
      name: 'singlesub',
      component: load('SingleSub')
    }
  ]
})
