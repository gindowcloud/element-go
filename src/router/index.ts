import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_MOD),
  routes: [
    { path: '/', component: () => import('../views/index.vue') }
  ]
})

export default router
