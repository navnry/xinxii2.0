import Vue from 'vue'
import App from './App'
import { http } from '@/common/api/request'
import store from './store'
import { concatParams } from '@/common/utils'
import { openUrl, showToast, callPhone, showModel, downloadImage, copy} from '@/common/api'
Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$api = http
Vue.prototype.GLOBAL = {
    mpOriginalId: 'gh_ef63b515b603',  // 小程序原始id
    miniProgramType: 1
}
Vue.prototype.openUrl = (url, type = 1, num) => {
    openUrl(url, type, num)
}
Vue.prototype.backPage = (callback) => {
    let backUrl = '/pages/home/index' // 如果没有上一级页面就返回指定页面
	if (callback) {
        if (typeof callback === 'function') {
            callback()
            return
        } else if (typeof callback === 'string') {
            backUrl = callback
        }
	}
    let pages = getCurrentPages()
    if (pages.length > 1) {
        uni.navigateBack()
    } else {
        openUrl(backUrl, 4)
    }
}
Vue.prototype.openLogin = (type, callback) => {
    let pages = getCurrentPages()
    if (pages.length > 0) {
        let param = concatParams(pages[pages.length-1].options)
        store.commit('LOGIN_BACK_ROUTE', pages[pages.length-1].route + param)
    }
    let loginUrl = '/pages/my/login'
    // #ifdef MP-WEIXIN
    loginUrl = '/pages/my/login'
    // #endif
    if (type === 4) {
        uni.redirectTo({
            url: loginUrl
        })
    } else {
        uni.navigateTo({
            url: loginUrl
        })
    }
}
Vue.prototype.downloadImage = (url, showTip = false) => {
    downloadImage(url, showTip)
}
Vue.prototype.showToast = (title, icon='none', duration=2500) => {
    showToast(title, icon, duration)
}
Vue.prototype.callPhone = (phone) => {
    callPhone(phone)
}
Vue.prototype.showModel = (title='提示', content, cb) => {
    showModel(title, content, cb)
}
Vue.prototype.copy = (str,showTip = true) => {
    copy(str,showTip)
}
Vue.prototype.checkReal = (str) => {
  if (!store.state.isLogin) {
    Vue.prototype.openLogin()
    return
  }
  if (store.state.userinfo.realname_check===1) return
  uni.showModal({
    title: '实名认证',
    content: '您还未实名认证，不能进行其他操作！',
    confirmText: '去实名认证',
    showCancel: false,
    success: (res) => {
      if (res.confirm) {
        openUrl('/pages/user/real')
      }
    }
  })
}
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
