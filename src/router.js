import Vue from 'vue'
import Router from 'vue-router'
import layout from './layouts/layout'
import pageTable from './pages/table'
import pageTree from './pages/tree'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        { path: 'table', component: pageTable },
        { path: 'tree', component: pageTree },
      ]
    },
  ]
})

export default router
