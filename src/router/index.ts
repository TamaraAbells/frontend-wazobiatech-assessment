import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from "../redux/store/index.js"

Vue.use(VueRouter)

interface RouteMeta {
  requiresAuth: boolean
}

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {requiresAuth: true},
  },
  {
    path: '/email/verify/:verifyToken',
    name: 'VerifyEmail',
    component: () => import('../views/VerifyEmail.vue'),
    meta: {requiresAuth: true},
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && to.name !== 'Register' && !store.getState().authToken){
//     next({ name: 'Login' })
//   } else next()
// })

export default router
