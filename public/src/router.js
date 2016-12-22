import VueRouter from 'vue-router'

import App from './App'
import CreateSchool from './CreateSchool'

const routes = [
  { path: '/', component: App },
  { path: '/create', component: CreateSchool }
]

/* eslint-disable no-new */
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

