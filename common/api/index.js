
// 分享到小程序
export function shareToWecaht (data) {
    uni.showLoading({
        title: '分享请求中…'
    })
    setTimeout(() => {
        uni.hideLoading()
    }, 3000)
    uni.share({
        provider: 'weixin',
        type: 5,
        imageUrl: data.imageUrl,
        title: data.title,
        scene: 'WXSceneSession',
        miniProgram: data.miniProgram,
        success: (res) => {
            console.log(res)
            uni.hideLoading()
            data.success && data.success()
        },
        fail: (err) => {
        uni.hideLoading()
        let msg = '分享出现问题，请稍后再试'
        if (err.errMsg.indexOf('-2')) {
            msg = '您取消了分享'
        } else if (err.errMsg.indexOf('-5')) {
            msg = '您的微信不支持'
        } else if (err.errMsg.indexOf('-98')) {
            msg = '您的手机未安装微信'
        }
        uni.showToast({
            icon: 'none',
            title: msg
        })
        data.fail && data.fail()
        }
    })
}
/**
	 * requestPayment 支付方法
	 * @param type   支付方式：1微信 2 支付宝
	 * @param info  后台返回的订单字符串
	 * @param success 成功回调
	 * @param fail   失败回调
	 * @param complete   接口调用结束回调
	 */
export function requestPayment(type,info,success,fail,complete){
	let provider = ''
	if(type == 1){
        provider = 'wxpay'
	}else{
        provider = 'alipay'
	}
	// #ifdef MP-WEIXIN
	info = JSON.parse(info)
	// #endif
	uni.requestPayment({
		// #ifdef APP-PLUS
        provider: provider,
        orderInfo: info, //微信、支付宝订单数据
		// #endif
		// #ifdef MP-WEIXIN
        provider: 'wxpay',
        timeStamp: info.timeStamp,
        nonceStr: info.nonceStr,
        package: info.package,
        signType: info.signType,
        paySign: info.paySign,
		// #endif
		success: function (res) {
			uni.showToast({
				title: '支付成功'
			})
			success && success()
		},
		fail: function (err) {
            if (err.errMsg === 'requestPayment:fail cancel' || err.errMsg === 'requestPayment:fail canceled') {
				uni.showToast({title: '您已取消支付', icon: 'none'})
            } else {
				uni.showToast({title: '调起支付失败，请重试或联系客服', icon: 'none'})
			}
			fail && fail()
		},
		complete:function(){
			complete && complete()
		}
	})
}

/**
	 * openUrl 通用打开页面
	 * @param url   跳转地址
	 * @param type  跳转类型
	 * @param num  控制APP右上角直接回到首页按钮
	 */
export function openUrl (url, type = 1 , num) {
    if (!url) return
    if (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
        // #ifndef H5
        let link = '/pages/my/webview?url='
        if(num==1){
            link = '/pages/my/webview?num=1&url='
        }
        uni.navigateTo({
            url: link + encodeURIComponent(url)
        })
        // #endif
        // #ifdef H5
        window.open(url)
        // #endif
        return
    }
    if (type === 1 || type === 4) {
        let tabPage = ['pages/home/index', 'pages/product/index', 'pages/train/index', 'pages/my/index']
        for (let tabPageUrl of tabPage) {
            if (url.indexOf(tabPageUrl) >= 0) {
                type = 2
                break
            }
        }
    }
    if (type === 1) {
        uni.navigateTo({ url })
    } else if (type === 2) {
        uni.switchTab({ url })
    } else if (type === 3) {
        uni.reLaunch({ url })
    } else if (type === 4) {
        uni.redirectTo({ url })
    } else if (type === 99) {
        uni.showToast({title: url, icon: 'none'})
    }
}

/**
	 * showToast 提示信息
	 * @param title   提示文字
	 * @param icon  图标
	 * @param duration  时间毫秒
	 */
export function showToast (title, icon='none', duration=2500) {
    uni.showToast({
        title,
        icon,
        duration
    })
}

/**
	 * callPhone 拨打电话
	 * @param phoneNumber  电话号码
	 */
export function callPhone (phoneNumber) {
    uni.makePhoneCall({
        phoneNumber
    })
}

/**
	 * showModel 模态框
	 * @param title  标题
	 * @param content  内容
	 * @param cb  回调函数，按了确认之后做什么
	 */
export function showModel (title, content, cb) {
    uni.showModal({
        title,
        content,
        confirmColor:'#FF5000',
        success: res => {
            if (res.confirm) {
                cb && cb()
            } else if (res.cancel) {
                console.log('用户点击取消');
            }
        }
    })
}

export function jgPush (regId, appShow, appSource) {
    console.log(regId);
    console.log(appShow);
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
        console.log(JSON.stringify(result));
        console.log(appShow);
        let str = JSON.parse(result.notificationExtras)
        if(appShow){
            // Voice('来新消息了，快点点击查看')
            uni.showModal({
                title: result.notificationTitle,
                content: result.notificationContent,
                success:  res => {
                    if (res.confirm) {
                        console.log(appSource);
                        if(appSource == 'ios'){ // 移除通知栏的通知
                            jyJPush.ios_removeNotification()
                        }else if(appSource == 'android'){
                            jyJPush.android_clearAllNotifications()
                        }
                        if(str.type==1){ // 内部
                        // "subType","二级分类:4-系统通知，24-营销活动,25-产品动态,26-订单消息"
                            if(str.subType == 4){
                                openUrl('/pages/message/systemnotice?num=1')
                            }else if(str.subType == 24){
                                openUrl('/pages/message/marketing?num=1')
                            }else if(str.subType == 25){
                                openUrl('/pages/message/productstatus?num=1')
                            }else if(str.subType == 26){
                                openUrl('/pages/order/orderdetail?id='+str.id)
                            }
                        }else if(str.type==2){ // 外部
                            openUrl(str.url)
                        }
                    }
                }
            })
        }
    })
    
    jyJPush.addJYJPushReceiveOpenNotificationListener(result=> {
        //  监听成功后，若点击推送消息，会触发result；数据格式保持极光返回的安卓/iOS数据一致
        console.log(appShow);
        console.log(result.notificationExtras);
        // if(!appShow){
            
            let str = JSON.parse(result.notificationExtras)
            if(str.type==1){ // 内部
            // "subType","二级分类:4-系统通知，24-营销活动,25-产品动态,26-订单消息"
                if(str.subType == 4){
                    openUrl('/pages/message/systemnotice?num=1')
                }else if(str.subType == 24){
                    openUrl('/pages/message/marketing?num=1')
                }else if(str.subType == 25){
                    openUrl('/pages/message/productstatus?num=1')
                }else if(str.subType == 26){
                    openUrl('/pages/order/orderdetail?id='+str.id)
                }
            }else if(str.type==2){ // 外部
                openUrl(str.url)
            }
        // }
    })
    
    jyJPush.getLastPushInfo(result => { // APP进程被杀死后，消息还存在通知栏的时候，点击消息会出触发这个方法
        console.log(JSON.stringify(result));
        let str = JSON.parse(result.notificationExtras)
        if(str.type==1){ // 内部
        // "subType","二级分类:4-系统通知，24-营销活动,25-产品动态,26-订单消息"
            if(str.subType == 4){
                openUrl('/pages/message/systemnotice?num=1')
            }else if(str.subType == 24){
                openUrl('/pages/message/marketing?num=1')
            }else if(str.subType == 25){
                openUrl('/pages/message/productstatus?num=1')
            }else if(str.subType == 26){
                openUrl('/pages/order/orderdetail?id='+str.id)
            }
        }else if(str.type==2){ // 外部
            openUrl(str.url)
        }
    })
}


// 更新用户信息
export function updateUserinfo (vue, cb) {
    vue.$api.post('member/login/getLoginMember.do', {}, {showLoading: false}).then((res) => {
        if (res.success) {
            console.log(res.data);
            vue.$store.commit('LOGIN', {userinfo: res.data})
            cb && cb(res.data)
        }
    })
}


// 下载图片
export function downloadImage (url, showTip) {
    uni.downloadFile({
        url,
        success: (res) =>{
            if (res.statusCode === 200){
                uni.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: (res) => {
                        if(showTip){
                            showToast('保存成功！')
                        }
                        console.log(res);
                    },
                    fail: (err) => {
                        console.log(err);
                    }
                })
            }
        }
    })
}


/**
	 * copy    复制
	 * @param str  复制内容
	 * @param showTip  是否显示提示
	 */
export function copy (str, showTip) {
    console.log(str);
    console.log(showTip);
    uni.setClipboardData({
        data: str,
        success: () => {
            if(showTip){
                showToast('复制成功')
            }
        }
    })
}

/**
	 * bigImg    放大图片
	 * @param urls  图片地址 
	 * @param index  第几张图片 
	 */
export function bigImg(urls,index = 0) {
    uni.previewImage({
        urls,
        current: index,
        longPressActions: {
            itemList: [ '保存图片'],
            success: function(data) {
                console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
            },
            fail: function(err) {
                console.log(err.errMsg);
            }
        }
    })
}




// 获取配置信息
export function getConigInfo (vue, cb) {
  vue.$api.post('system/config/findByCode.do', {code: 'findByCode'}).then( res => {
  	if(res.success){
  		vue.$store.commit('SET_CONFIGINFO', res.data)
      cb && cb(res.data)
  	}
  })
}


/** 根据身份证获取信息
	 * IdCard    获取信息
	 * @param UUserCard  省份证号码 
	 * @param num   1 出生日期  2 获取性别   3 获取年龄 
	 */
export function IdCard(UUserCard, num) {
    if (num == 1) {
        //获取出生日期
		let birth
        birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
        return birth;
    }
    if (num == 2) {
        //获取性别
        if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
            //男
            return "男";
        } else {
            //女
            return "女";
        }
    }
    if (num == 3) {
        //获取年龄
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
        if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
            age++;
        }
        return age;
    }
}

