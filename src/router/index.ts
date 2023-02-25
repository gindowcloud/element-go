import { createRouter, createWebHistory } from 'vue-router'
import layout from '../layouts/layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_MOD),
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        { path: '/', component: () => import('../views/index.vue') }        
      ]
    }, {
      path: '/components',
      component: layout,
      children: [
        { path: 'page-header', component: () => import('../views/pageHeader.vue') },
        { path: 'form-search', component: () => import('../views/formSearch.vue') },
        { path: 'table', component: () => import('../views/table.vue') },
        { path: 'loading', component: () => import('../views/loading.vue') },
        { path: 'pagination', component: () => import('../views/pagination.vue') },
      ]
    }
  ]
})

export default router
