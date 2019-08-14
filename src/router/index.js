import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载
const index = () => import('@/pages/index')
const detail = () => import('@/pages/detail')
const indicesTable = () => import('@/pages/indicesTable')
const saleTable = () => import('@/pages/saleTable')
const testFresh = () => import('@/pages/testFresh')
const testDetail = () => import('@/pages/testDetail')
// import storeRetail from '@/pages/storeRetail'
// import departmentRetail from '@/pages/departmentRetail'

Vue.use(Router)

var router = new Router({
    mode: 'history',
    // base: process.env.NODE_ENV === 'production' ? '/chart/' : '/',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
            meta: {
                keepAlive: true,
                // isUseCache: false,
            },
        },
        {
            path: '/detail',
            name: 'detail',
            component: detail,
            meta: {
                keepAlive: true,
                // isUseCache: false,
            },
        },
        {
            path: '/indicesTable',
            name: 'indicesTable',
            component: indicesTable,
            meta: {
                keepAlive: true,
                // isUseCache: false,
            },
        },
        {
            path: '/saleTable',
            name: 'saleTable',
            component: saleTable,
            meta: {
                keepAlive: true,
                // isUseCache: false,
            },
        },
        {
            path: '/testFresh',
            name: 'testFresh',
            component: testFresh,
            meta: {
                keepAlive: true,
                isUseCache: false,
                scrollPosition: {},
            },
            // beforeEnter: (to, from, next) => {
            //     if(from.name === 'detail') {
            //         to.meta.keepAlive = true
            //     } else {
            //         to.meta.keepAlive = false
            //     }
            //     next()
            // }
        },
        {
            path: '/testDetail',
            name: 'testDetail',
            component: testDetail,
            meta: {
                keepAlive: false,
                // isUseCache: false,
            },
            // beforeEnter: (to, from, next) => {
            //     if(from.name === 'detail') {
            //         to.meta.keepAlive = true
            //     } else {
            //         to.meta.keepAlive = false
            //     }
            //     next()
            // }
        },
    ],
})

export default router
