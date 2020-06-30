import Vue from 'vue'
import Router from 'vue-router'
import layout from './layouts/layout'
import pageIndex from './pages/index'
import pageTable from './pages/table'
import pageView from './pages/view'
import pageTree from './pages/tree'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [    
    { path: '/', component: layout, children: [
      { path: 'table', component: pageTable },
      { path: 'view', component: pageView },
      { path: 'tree', component: pageTree },
    ]},
    { path: '*', component: layout, children: [
      { path: '/', component: pageIndex }
    ]}
  ]
})

export default router
