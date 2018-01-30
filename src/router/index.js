import Vue from 'vue'
import Router from 'vue-router'
import TodosList from '@/components/TodosList'
import TodosDetail from '@/components/TodosDetail'
import UserProfile from '@/components/UserProfile'
import RegisterForm from '@/components/RegisterForm'
import LoginForm from '@/components/LoginForm'
import AuthGuard from './authGuard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodosList',
      component: TodosList,
      beforeEnter: AuthGuard 
    },
    {
      path: '/todo/:id',
      name: 'TodosDetail',
      component: TodosDetail,
      beforeEnter: AuthGuard 
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile,
      beforeEnter: AuthGuard 
    },
    {
      path: '/register',
      name: 'RegisterForm',
      component: RegisterForm
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm
    }
  ]
})
