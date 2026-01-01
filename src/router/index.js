import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Welcome from '../pages/Welcome/Welcome.vue'
import Content from '../pages/Content/Content.vue'
import Publish from '../pages/Publish/Publish.vue'
import Login from '../pages/Login/Login.vue'
import About from '../pages/About/About.vue'

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/welcome'
        },
        {
            name: 'Welcome',
            path: '/welcome',
            component: Welcome,
            meta: {
                title: '欢迎页',
                isShowNav: true
            }
        },
        {
            name: 'Content',
            path: '/content',
            component: Content,
            meta: {
                title: '内容管理',
                isShowNav: true
            }
        },
        {
            name: 'Publish',
            path: '/publish',
            component: Publish,
            meta: {
                title: '发布文章',
                isShowNav: true
            }
        },
        {
            name: 'About',
            path: '/about',
            component: About,
            meta: {
                title: '关于',
                isShowNav: true
            }
        },
        {
            name: 'Login',
            path: '/login',
            component: Login,
            meta: {
                title: '登录',
                isShowNav: false // 登录页不显示侧边栏、顶部导航
            }
        }
    ]
})

export default router
