import Vue from 'vue'
import Router from 'vue-router'
import layout from './layouts/layout'
import exTable from './pages/exTable'
import exTree from './pages/exTree'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        { path: 'exTable', component: exTable },
        { path: 'exTree', component: exTree },
      ]
    },
  ]
})

export default router
