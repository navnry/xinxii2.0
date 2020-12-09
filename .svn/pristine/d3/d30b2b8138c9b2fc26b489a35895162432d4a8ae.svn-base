import Request from './lib/request.js'
import md5 from 'js-md5'
import { formatTime } from '../../utils'
import constVal from '../../utils/constval.js'
import store from '@/store'
const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
    // 开发环境
    // #ifdef H5
    config.baseUrl = '/api/mobile/'
    // #endif
    // #ifndef H5
    config.baseUrl = constVal.UPLOAD_IMG_URL + 'mobile/'
    // #endif
    
    // 打包
    // config.baseUrl = constVal.UPLOAD_IMG_URL + 'mobile/'
	
    config.header = {
        'Content-Type': 'application/x-www-form-urlencoded; multipart/form-data; charset=utf-8'
    }
    return config
})

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
    config.header = {
        ...config.header
    }
    let userinfo = uni.getStorageSync('userinfo')
    if (userinfo.token) {
        config.header.Authorization = userinfo.token
    }
    // console.log(config);
    // if (config.showLoading !== false) {
    //     config.showLoading = true
    // }
    if (config.showMsg !== false) {
        config.showMsg = true
    }
    if (config.setStorage&&config.setStorage.setStorage !== true){
        config.setStorage.setStorage = false
    }
    // if (config.showLoading) {
    //     uni.showLoading({
    //         title: '加载中'
    //     })
    // }
    if (!config.data) {
        config.data = {}
    }
    // config.data.source = 'app'
    // #ifdef APP-PLUS
    // if (uni.getSystemInfoSync().platform === 'ios') {
    //   config.data.source = 'ios'
    // } else {
    //   config.data.source = 'android'
    // }
    // #endif
    // #ifdef MP-WEIXIN
    // config.data.source = 'mp'
    // #endif
    // config.data.auth_code = md5(config.data.source + formatTime(new Date(), 'yyyy-MM-dd'))
    // console.log(JSON.stringify(config))
    /*
    if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
      cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
    }
    */
    return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
    // console.log(response)
    // if (response.config.showLoading) {
    //     uni.hideLoading()
    // }
    if (response.config.showMsg) {
        if (!response.data.success) {
            uni.showToast({
                title: response.data.description,
                icon: 'none'
            })
        }
    }
    if(response.config.setStorage && response.config.setStorage.setStorage){
        console.log(response.data.data);
        uni.setStorage({
            key: response.config.setStorage.name,
            data: response.data.data,
            success:  () => {
                console.log('success');
            }
        })
    }
    // if (response.data.code === 401) {
    //   store.commit('LOGOFF')
    //   let pages = getCurrentPages()
    //   console.log(pages)
    //   if (pages.length > 0) {
    //     // let param = concatParams(pages[pages.length-1].options)
    //     store.commit('LOGIN_BACK_ROUTE', pages[pages.length-1].route)
    //   }
    //   // #ifdef MP-WEIXIN
    //   uni.redirectTo({
    //     url: '/pages/user/mplogin'
    //   })
    //   // #endif
    //   // #ifndef MP-WEIXIN
    //   uni.redirectTo({
    //     url: '/pages/user/login'
    //   })
    //   // #endif
    //   // uni.switchTab({url: '/pages/my/center'})
    // }
    return response.data
}, (response) => { // 请求错误做点什么
    console.log(response);
    uni.hideLoading()
    if (response.statusCode == 401) {
        store.commit('LOGOFF')
        let pages = getCurrentPages()
        console.log(pages)
        if (pages.length > 0) {
            store.commit('LOGIN_BACK_ROUTE', pages[pages.length - 1].route)
        }
        uni.showToast({
            title: '登录失效，请重新登录',
            icon: 'none'
        })
        return response
    }
    uni.showToast({
        title: '服务器开小差了，请稍后重试',
        icon: 'none'
    })
    return response
})
export {
    http
}
