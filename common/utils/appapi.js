/**
 * app使用
 */
import Lang from './lang'
import Tips from './tips'
import ConstVal from './constval'

export default class AppApi {
  // 发送事件给app
  static sendAppEvent (name, params) {
    window.api && window.api.sendEvent({
      name: name,
      extra: params
    })
  }

  /**
   * 从哪个App来
   * @param formArray
   * @returns {boolean}
   */
  static comeFrom (formArray) {
    if (!formArray) {
      formArray = ['app', 'org_app', 'partner_app']
    }
    let auth = Lang.getStorage(ConstVal.STORE_AUTH_NAME)
    var cFrom = auth && auth.c_from
    if (!cFrom) {
      return false
    }
    for (var i = 0; i < formArray.length; i++) {
      if (cFrom === formArray[i]) {
        return true
      }
    }
    return false
  }
  /**
   * 是否为app环境
   * @param formArray
   * @returns {boolean}
   */
  static isApp () {
    return AppApi.comeFrom()
  }
// 打开新窗口
  static openWindow (opts) {
    var defOpts = {
      name: '',
      url: '',
      params: {},
      bgColor: 'rgba(0,0,0,0)',
      animateSubType: 'from_right',
      animateType: 'push',
      animateDuration: 300,
      bounces: false,
      reload: false,
      scaleEnabled: true,
      slidBackEnabled: true
    }
    $.extend(defOpts, opts)
    window.api && window.api.openWin({
      name: defOpts.name,
      url: defOpts.url,
      pageParam: defOpts.params,
      bgColor: defOpts.bgColor,
      bounces: defOpts.bounces,
      scrollToTop: true,
      animation: {
        type: defOpts.animateType,
        subType: defOpts.animateSubType,
        duration: defOpts.animateDuration
      },
      delay: window.api.systemType === 'ios' ? 0 : 300,
      reload: defOpts.reload,
      allowEdit: true,
      vScrollBarEnabled: false,
      hScrollBarEnabled: false,
      scaleEnabled: defOpts.scaleEnabled,
      slidBackEnabled: defOpts.slidBackEnabled
    })
  }

  /**
   * 分享数据初始化
   * @param title
   * @param desc
   * @param link
   * @param imgUrl
   */
  static initShare ({title, desc, link, imgUrl}) {
    setTimeout(function () {
      AppApi.sendAppEvent('changeTplShare', {
        title: title || '该喝黑茶了',
        desc: desc || '该喝黑茶了，溯源，保真，升值',
        link: link || location.href,
        imgUrl: imgUrl || '//dev.ahhc.wang/logo.png'
      })
    }, 1000)
  }

  /**
   * 打开app的图片浏览器
   * @param el
   */
  static openImageNew (el) {
    var productPhotos = []
    var index = 0
    var name = $(el).attr('name')
    $('[name=\'' + name + '\']').each(function (i, val) {
      var src = $(val).attr('src')
      src = $(val).attr('srci') || src
      if (src) {
        productPhotos[i] = src
        if (el === val) {
          index = i
        }
      } else {
        Tips.toast('图片加载失败')
      }
    })
    var params = {
      photos: productPhotos,
      index: index,
      btns: []
    }
    AppApi.openWindow({
      name: 'photo_browser_top_win',
      url: 'widget://html/photo_browser_win.html',
      params: params
    })
  }
}
