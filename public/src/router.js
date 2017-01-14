import VueRouter from 'vue-router'

import App from './App'
import CreateSchool from './CreateSchool'
import SchoolListContainer from './SchoolListContainer'
import SchoolDetail from './SchoolDetail'

const routes = [
  { path: '/', component: App },
  { path: '/schools', component: SchoolListContainer },
  { path: '/create', component: CreateSchool },
  { path: '/school/:id', component: SchoolDetail }
]

/* eslint-disable no-new */
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

