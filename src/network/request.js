import axios from 'axios';

//1 创建axios实例
const instance = axios.create({
    baseURL: 'http://timemeetyou.com:8889/api/private/v1/',
    timeout: 5000
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//2 axios的拦截器(拦截请求&&拦截响应)
//2.1 请求拦截
instance.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);

    //应用场景
    //1 比如config中的一些信息不符合服务器的要求
    //2 比如每次发送网络请求时,都希望在界面中显示一个请求的图标
    //3 某些网络请求(如登录token),必须携带一些特殊信息
    return config//必须return ,不然接口就被拦截了
}, err => {
    console.log(err)
})

//2.2 响应拦截
instance.interceptors.response.use(res => {
    return res.data//必须return ,不然接口就被拦截了
}, err => {
    console.log(err)
})


// 3 发送真正的网络请求(axios本身返回就是promise请求)等同于如下request2
export default instance;
