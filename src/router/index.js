import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import Login from '../pages/Login/Login.vue'
// import Welcome from '../pages/Welcome/Welcome.vue'
// import Article from '../pages/Article/Article.vue'
// import ArticleEdit from '../pages/Article/ArticleEdit/ArticleEdit.vue'
// import Publish from '../pages/Publish/Publish.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import ProfileEdit from '../pages/Profile/ProfileEdit/ProfileEdit.vue'
// import About from '../pages/About/About.vue'
// 引入用户相关的工具函数
import { GET_TOKEN } from '@/utils/user.js'
// 引入消息提示组件
import { Message } from 'element-ui';

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/welcome'
        },
        {
            name: 'Login',
            path: '/login',
            component: () => import('../pages/Login/Login.vue'),
            meta: {
                title: '登录',
                isShowNav: false, // 登录页不显示侧边栏、顶部导航
                // isAuth: true
            }
        },
        {
            name: 'Welcome',
            path: '/welcome',
            component: () => import('../pages/Welcome/Welcome.vue'),
            meta: {
                title: '首页',
                isShowNav: true
            }
        },
        {
            name: 'Article',
            path: '/article',
            component: () => import('../pages/Article/Article.vue'),
            meta: {
                title: '文章管理',
                isShowNav: true,
                isAuth: true
            },
            children: [
                {
                    name: 'ArticleEdit',
                    path: 'edit/:id',
                    component: () => import('../pages/Article/ArticleEdit/ArticleEdit.vue'),
                    meta: {
                        title: '编辑文章',
                        isShowNav: true,
                        isAuth: true
                    },
                    props($route) {
                        return {
                            id: $route.params.id
                        }
                    }
                },
                {
                    name: 'ArticleDetail',
                    path: 'detail/:id',
                    component: () => import('../pages/Article/ArticleDetail/ArticleDetail.vue'),
                    meta: {
                        title: '文章详情',
                        isShowNav: true,
                        isAuth: true
                    },
                    props($route) {
                        return {
                            id: $route.params.id
                        }
                    }
                }
            ]
        },
        {
            name: 'Publish',
            path: '/publish',
            component: () => import('../pages/Publish/Publish.vue'),
            meta: {
                title: '发布文章',
                isShowNav: true,
                isAuth: true
            }
        },
        {
            name: 'Profile',
            path: '/profile',
            component: () => import('../pages/Profile/Profile.vue'),
            meta: {
                title: '个人中心',
                isShowNav: true,
                isAuth: true
            },
            children: [
                {
                    name: 'ProfileEdit',
                    path: 'edit',
                    component: () => import('../pages/Profile/ProfileEdit/ProfileEdit.vue'),
                    meta: {
                        title: '编辑个人中心',
                        isShowNav: true,
                        isAuth: true
                    }
                }
            ]
        },
        {
            name: 'About',
            path: '/about',
            component: () => import('../pages/About/About.vue'),
            meta: {
                title: '关于我们',
                isShowNav: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    // console.log('@to', to);
    // console.log('@from', from);
    if (to.meta.isAuth) {
        const token = GET_TOKEN()
        if (token) {
            next()
        } else {
            Message.warning({
                message: '请先登录',
            });
            setTimeout(() => {
                next({ name: 'Login' })
            }, 500);
        }
    } else {
        next()
    }
})

router.afterEach((to, from) => {
    document.title = to.meta.title
})

export default router
