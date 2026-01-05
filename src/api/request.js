// axios 公共配置
import axios from 'axios'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN, GET_REFRESH_TOKEN } from '../utils/user'
import { Loading } from 'element-ui';

// 基地址
let request = axios.create({
    // 基地址
    baseURL: '/v1_0',
    timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
    Loading.service({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    // 请求前，判断有无 token 
    const token = GET_TOKEN()
    // 请求携带 token
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    // 返回配置项，为 axios 所有
    return config
}, (error) => {
    return Promise.reject(error)
})


// 响应拦截器
request.interceptors.response.use((response) => {
    Loading.service().close();
    return response.data
}, (error) => {
    // if (error?.response?.status === 401) {
    //     myAlert(false, '身份验证失败')
    //     REMOVE_TOKEN()
    //     setTimeout(() => {
    //         location.href = '/login'
    //     }, 1000)
    // }
    // 401 token   "token超时或者未传token"
    //     1. 201 OK
    // 2. 400 请求参数错误
    // 3.  401 token过期或未传~~~~
    // 4. 507 服务器数据库异常

    return Promise.reject(error)
})


export default request
