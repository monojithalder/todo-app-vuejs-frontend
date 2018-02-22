import Vue from 'vue'
import Router from 'vue-router'
import {mainStore} from '../main.js'

import HelloWorld from '@/components/HelloWorld'
import Testing from '@/components/Testing'
import Todo from '@/components/Todo'
import CreateTodo from '@/components/CreateTodo'
import Login from '@/components/Login'
import Logout from '@/components/Logout'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'Testing',
      component: Testing
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Todo,
      beforeEnter(to, from, next) {
        if(mainStore.state.login == true) {
          console.log('next')
          next()

        }
        else {
          console.log('login')
          next('/login')
        }
        console.log(mainStore)
      }
    },
    {
      path: '/create-todo',
      name: 'Create Todo',
      component: CreateTodo
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }

  ]
})
