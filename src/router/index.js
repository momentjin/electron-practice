import Vue from 'vue'
import Router from 'vue-router'
import Coverletter from '../views/Coverletter.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/coverletter',
      name: 'coverletter',
      component: Coverletter
    }
  ]
})
