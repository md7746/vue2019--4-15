import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import { store } from './store/store'
import App from './App.vue'

import Home from './view/home.vue'
import Menu from './view/menu.vue'
import Admin from './view/admin.vue'
import Login from './view/login.vue'
import Register from './view/register.vue'

Vue.use(VueRouter)
let routes = [
  {
    path: '/', components: {
      default: Home,
      'Login': Login,
      'Register': Register
    }
  },
  { path: '/menu', component: Menu },
  {
    path: '/admin',
    component: Admin,
    meta: { requiresAuth: true }
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

let router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

Axios.defaults.baseURL = "http://localhost:5000/users";
Vue.prototype.axios = Axios;

Axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  });


Axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
    }
    return Promise.reject(error.response)
  }
)

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token')
  if (to.meta.requiresAuth) {
    // Axios.defaults.headers.common['Authorization'] =  res.data.token;
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }

})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
