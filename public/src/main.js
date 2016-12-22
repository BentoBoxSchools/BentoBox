// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'

import App from './App'
import CreateSchool from './CreateSchool'

// styles
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: App },
  { path: '/create', component: CreateSchool }
]

/* eslint-disable no-new */
const router = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable no-new */
new Vue({router}).$mount('#app')
