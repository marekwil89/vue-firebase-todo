import Vue from 'vue'
import Router from 'vue-router'
import TodosList from '@/components/TodosList'
import RegisterForm from '@/components/RegisterForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodosList',
      component: TodosList
    },
    {
      path: '/register',
      name: 'RegisterForm',
      component: RegisterForm
    }
  ]
})
