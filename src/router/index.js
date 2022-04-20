import Vue from 'vue'
import Storage from '@/js/Utils/Storage'
import VueRouter from 'vue-router'
import Cashback from '../js/Cashback'

import AuthLayout from '../layouts/AuthLayout.vue'
import HomeLayout from '../layouts/Home.vue'

import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Error404 from '../views/Error404.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: HomeLayout,
        children: [
            {
                path: '/home',
                component: Home
            },
        ]
    },
    {
        path: '/',
        redirect: '/login',
        component: AuthLayout,
        children: [
            {
                path: '/login',
                component: Login
            }
        ]
    },
    {
        path: '/404',
        component: Error404
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if(Storage.get('user', 'token') && Cashback.isExpiredLogin()) {
        Storage.reset()
        next('/login')
    } else if (to.path != '/login' && !Storage.get('user', 'token')) {
        next('/login')
    } else if (to.path == '/login' && Storage.get('user', 'token')) {
        next('/');
    } else {
        next()
    }
})

export default router
