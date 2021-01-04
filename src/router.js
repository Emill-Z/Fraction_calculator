import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/fraction-calculator'
  },
  {
    path: '/fraction-calculator',
    name: 'FractionCalculator',
    component: () => import('./views/calculator/FractionCalculator.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
