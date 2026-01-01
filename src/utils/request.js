// axios 公共配置
// 基地址

axios.defaults.baseURL = 'http://geek.itheima.net'

// 请求拦截器
axios.interceptors.request.use((config) => {
    // 请求前，判断有无 token 
    const token = localStorage.getItem('token')
    // 请求携带 token 
    token && (config.headers.Authorization = `Bearer ${token}`)
    // 返回配置项，为 axios 所有
    return config
}, (error) => {
    return Promise.reject(error)
})


// 响应拦截器
axios.interceptors.response.use((response) => {
    const res = response.data
    return res
}, (error) => {
    if (error?.response?.status === 401) {
        myAlert(false, '身份验证失败')
        localStorage.removeItem('token')
        setTimeout(() => {
            location.href = '../login/index.html'
        }, 1000)
    }
    return Promise.reject(error)
})