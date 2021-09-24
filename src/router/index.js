import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'

import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'

import Todos from "../views/Todos.vue"

import firebase from 'firebase'


const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/todo",
    name: "Todos",
    component: Todos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/signin',
          query: {
            redirect: to.fullPath
          }
        })
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})
export default router