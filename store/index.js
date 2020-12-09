import Vue from 'vue'
import Vuex from 'vuex'
import {appSource,jPush} from '@/common/utils'
// import Voice from '@/common/lib/baiduVoice'
// import {jgPush} from '@/common/api'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        isLogin: false, // 是否登录
        userinfo: {},
        authinfo: {},
        // 注册过程临时产生用户信息
        tempUserinfo: {},
        configinfo: {}, // 系统配置项
        inviteInfo: null,
        loginBackRoute: '',
        statusBarHeight: 20,
        appShow: '', // APP是否在前台
		// idInfoCache: {}, //推广资格认证信息缓存
        msgStatus: 1 // 消息读取状态 1 已读 0 未读
    },
    mutations: {
        LOGIN: (state, data) => {
            state.userinfo = data.userinfo
            // #ifdef APP-PLUS
            // jgPush(state.userinfo.registrationId, state.appShow, appSource())
            let regId = state.userinfo.registrationId
            let appShow = state.appShow
            let appSourceType = appSource()
            const jyJPush = uni.requireNativePlugin('JY-JPush')
            jyJPush.setJYJPushAlias({
                userAlias: regId
                }, result=> {
                //  设置成功或者失败，都会通过这个result回调返回数据；数据格式保持极光返回的安卓/iOS数据一致
                //  注：若没有返回任何数据，考虑是否初始化完成
                // console.log(JSON.stringify(result));
            })
            jyJPush.addJYJPushReceiveNotificationListener(result=> { // APP内推送
                //  监听成功后，若收到推送，会在result返回对应的数据；数据格式保持极光返回的安卓/iOS数据一致
                state.msgStatus = 0
                let str = null
                if(result.aps && appSourceType == 'ios'){
                    result.notificationTitle = '提示'
                    result.notificationContent = result.aps.alert
                    str = result
                }else if(result.notificationExtras){
                    str = JSON.parse(result.notificationExtras)
                }
                console.log(str);
                if(state.appShow){
                    // Voice('来新消息了，快点点击查看')
                    uni.showModal({
                        title: result.notificationTitle,
                        content: result.notificationContent,
                        success:  res => {
                            if (res.confirm) {
                                if(appSourceType == 'ios'){ // 移除通知栏的通知
                                    // jyJPush.ios_removeNotification()
                                }else if(appSourceType == 'android'){
                                    jyJPush.android_clearAllNotifications()
                                }
                                jPush(str)
                                state.msgStatus = 1
                            } else if (res.cancel) {
                                state.msgStatus = 0
                            }
                        }
                    })
                }
            })
            
            jyJPush.addJYJPushReceiveOpenNotificationListener(result=> {
                //  监听成功后，若点击推送消息，会触发result；数据格式保持极光返回的安卓/iOS数据一致
                console.log(appShow);
                console.log(result.notificationExtras);
                state.msgStatus = 1
                let str = null
                if(result.aps && appSourceType == 'ios'){
                    result.notificationTitle = '提示'
                    result.notificationContent = result.aps.alert
                    str = result
                }else if(result.notificationExtras){
                    str = JSON.parse(result.notificationExtras)
                }
                jPush(str)
            })
            
            jyJPush.getLastPushInfo(result => { // APP进程被杀死后，消息还存在通知栏的时候，点击消息会出触发这个方法
                state.msgStatus = 1
                let str = null
                if(result.aps && appSourceType == 'ios'){
                    result.notificationTitle = '提示'
                    result.notificationContent = result.aps.alert
                    str = result
                }else if(result.notificationExtras){
                    str = JSON.parse(result.notificationExtras)
                }
                jPush(str)
            })
            // #endif
            state.isLogin = true
			console.log("data.userinfo")
			console.log(data.userinfo)
            uni.setStorageSync('userinfo', data.userinfo)
        },
        WXLOGIN: (state, data) => {
            state.authinfo = data.authinfo
            state.isLogin = true
            uni.setStorageSync('authinfo', data.authinfo)
        },
        LOGOFF: (state) => {
            state.isLogin = false
            state.userinfo = {}
            state.authinfo = {}
            state.idInfoCache = {}
            uni.removeStorageSync('userinfo')
            uni.removeStorageSync('authinfo')
            // uni.removeStorageSync('idInfoCache')
        },
        SET_STATUS_BAR_HEIGHT(state, data) {
            state.statusBarHeight = data
        },
        SET_TEMP_USERINFO(state, data) {
            state.tempUserinfo = data
        },
        SET_CONFIGINFO: (state, data) => {
            state.configinfo = data
            uni.setStorageSync('configinfo', data)
        },
        SET_INVITE_INFO: (state, data) => {
            state.inviteInfo = data
        },
        LOGIN_BACK_ROUTE: (state, data) => {
            state.loginBackRoute = data
        },
        SET_APP_STATUS: (state, data) =>{
            state.appShow = data
            console.log(state.appShow)
        },
        SET_MSG_STATUS: (state,data) =>{
            state.msgStatus = data
        }
		// SET_IDINFO_CACHE: (state, data) => {
  //           state.idInfoCache = data.idInfoCache
		// 	console.log(data.idInfoCache)
  //           uni.setStorageSync('idInfoCache', data.idInfoCache)
  //       },
    },
    actions: {
        afterLogin: ({state}) => {
            console.log(state.loginBackRoute + '_______loginBackRoute')
            if (state.loginBackRoute) {
                if (['pages/home/index', 'pages/product/index', 'pages/train/index', 'pages/my/index'].indexOf(state.loginBackRoute.split('?')[0]) < 0) {
                    let pages = getCurrentPages()
                    console.log(pages)
                    let hasRoute = false
                    for (let i = pages.length - 1; i >= 0; i--) {
                        if (pages[i].route === state.loginBackRoute) {
                            uni.navigateBack({
                                delta: pages.length - i - 1
                            })
                            hasRoute = true
                            break
                        }
                    }
                    if (!hasRoute) {
                        uni.redirectTo({
                            url: '/' + state.loginBackRoute
                        })
                    }
                } else {
                    uni.switchTab({
                        url: '/' + state.loginBackRoute
                    })
                }
            } else {
                uni.switchTab({
                    url: '/pages/my/index'
                })
            }
        }
    }
})
export default store
