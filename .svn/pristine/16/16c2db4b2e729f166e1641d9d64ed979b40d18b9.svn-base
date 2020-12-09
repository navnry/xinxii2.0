/**
 * 工具
 */
import floatCal from './FloatCalc'
import AppApi from './AppApi'

var Lang = {
  getStorage: function (key) {
    var ls = window.localStorage
    if (ls) {
      var v = ls.getItem(key)
      if (!v) {
        return null
      }
      if (v.indexOf('obj-') === 0) {
        v = v.slice(4)
        return JSON.parse(v)
      } else if (v.indexOf('str-') === 0) {
        return v.slice(4)
      }
    }
  },
  setStorage: function (key, value) {
    if (arguments.length === 2) {
      var v = value
      if (typeof v === 'object') {
        v = JSON.stringify(v)
        v = 'obj-' + v
      } else {
        v = 'str-' + v
      }
      var ls = window.localStorage
      if (ls) {
        ls.setItem(key, v)
      }
    }
  },
  updateStorage: function (key, value) {
    var that = this
    var o = that.getStorage(key) || {}
    o = Object.assign(o, value)
    that.setStorage(key, o)
  },
  removeStorage: function (key) {
    localStorage.removeItem(key)
  },
  cleanStorage: function () {
    localStorage.clear()
  },
  // 根据参数键获取参数值
  getParameter: function (str, url) {
    let LocString = url || window.document.location.search
    let rs = new RegExp('(^|)' + str + '=([^&]*)(&|$)', 'g').exec(LocString)
    if (rs) return decodeURIComponent(rs[2])
    return ''
  },
  // 打印日志
  printLog: function (type) {
    var nowDate = new Date().toLocaleString()
    var pageName = function () {
      var strUrl = location.href
      var arrUrl = strUrl.split('/')
      var strPage = arrUrl[arrUrl.length - 1]
      return strPage
    }
    var newArguments = Array.prototype.slice.call(arguments, 2)
    newArguments.unshift('[' + nowDate + ']-[' + pageName() + ']-[' +
      arguments[1] + ']:')
    switch (type) {
      case 'err':
        console.error.apply(console, newArguments)
        break
      case 'warn':
        console.warn.apply(console, newArguments)
        break
      default:
        console.log.apply(console, newArguments)
        break
    }
  },
  // HTML转义
  HTMLEncode: function (html) {
    var temp = document.createElement('div');
    (temp.textContent != null)
      ? (temp.textContent = html)
      : (temp.innerText = html)
    var output = temp.innerHTML
    temp = null
    return output
  },
  // HTML反转义
  HTMLDecode: function (text) {
    var temp = document.createElement('div')
    temp.innerHTML = text
    var output = temp.innerText || temp.textContent
    temp = null
    return output
  },
  /**
   * 过滤emoji
   * @param o
   * @returns {*}
   */
  filterEmoji: function (o) {
    var that = this
    if (!o) {
      return o
    }

    function filter (str) {
      return str.replace(
        /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\ude80-\udeff]/g,
        '')
    }

    if (typeof o === 'string') {
      return filter(o)
    } else if (o instanceof Object) {
      for (var p in o) {
        o[p] = that.filterEmoji(o[p])
      }
      return o
    } else if (o instanceof Array) {
      for (var i = 0; i < o.length; i++) {
        o[i] = that.filterEmoji(o[i])
      }
      return o
    } else {
      return o
    }
  },
  changeTitle: function (title) {
    const { envName } = ENV
    AppApi.sendAppEvent('changeTplTitle', {
      title: `${envName}${title}`
    })
    document.title = `${envName}${title}`
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    // 替换成站标favicon路径或者任意存在的较小的图片即可
    iframe.setAttribute('src',
      `${global.location.origin}/tea/static/img/favicon.ico`)
    const iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
  },
  /**
   * 获取浏览器类型
   * @returns {{trident: boolean, presto: boolean, webKit: boolean, gecko: boolean, mobile: boolean, ios: boolean, android: boolean, iPhone: boolean, iPad: boolean, webApp: boolean, weixin: boolean, qq: boolean, qqBrowser: boolean}}
   */
  browserOpt: function () {
    var u = navigator.userAgent
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应用程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
      qq: !!u.match(/\sQQ/i), // 是否QQ
      qqBrowser: (u.indexOf('MQQBrowser') > -1) &&
      (u.indexOf('MicroMessenger') === -1)// 是否QQ浏览器
    }
  },
  /**
   * 序列化为对象 class_id=3&id=2&  返回对象
   * @param query
   * @returns {{}}
   */
  parseQuery: function (query) {
    var reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g
    var obj = {}
    while (reg.exec(query)) {
      obj[RegExp.$1] = RegExp.$2
    }
    return obj
  },
  /**
   * 向url添加参数
   * @param url
   * @param params
   * @returns {*}
   */
  parseUrl: function (url, params) {
    var paramsStr = ''
    if (url.indexOf('?') !== -1) {
      var searchStr = url.substring(url.indexOf('?') + 1, url.length)
      url = url.substring(0, url.indexOf('?'))
      var o = this.parseQuery(searchStr)
      params = Object.assign(o, params)
    }
    for (var i in params) {
      if (params[i]) {
        paramsStr += i + '=' + params[i] + '&'
      }
    }
    if (paramsStr.lastIndexOf('&') === paramsStr.length - 1) {
      paramsStr = paramsStr.substring(0, paramsStr.length - 1)
    }
    if (paramsStr) {
      url += '?' + paramsStr
    }
    return url
  },
  /**
   * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔 wait毫秒调用一次该函数
   * @param func 执行函数
   * @param wait 时间间隔
   * @param options 如果你想禁用第一次首先执行的话，传递{leading: false}，
   *                如果你想禁用最后一次执行的话，传递{trailing: false}
   * @returns {Function}
   */
  throttle (func, wait, options) {
    var context, args, result
    var timeout = null
    var previous = 0
    if (!options) options = {}
    var later = function () {
      previous = options.leading === false ? 0 : new Date().getTime()
      timeout = null
      result = func.apply(context, args)
      if (!timeout) context = args = null
    }
    return function () {
      var now = new Date().getTime()
      if (!previous && options.leading === false) previous = now
      var remaining = wait - (now - previous)
      context = this
      args = arguments
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        previous = now
        result = func.apply(context, args)
        if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      }
      return result
    }
  },
  browserVersion: function () {
    var u = navigator.userAgent
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应用程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
      qq: !!u.match(/\sQQ/i), // 是否QQ
      qqBrowser: (u.indexOf('MQQBrowser') > -1) &&
      (u.indexOf('MicroMessenger') === -1)// 是否QQ浏览器
    }
  },
  // ------------日期-----------
  /**
   * 日期格式化
   格式 YYYY/yyyy/YY/yy 表示年份
   MM/M 月份
   W/w 星期
   dd/DD/d/D 日期
   hh/HH/h/H 时间
   mm/m 分钟
   ss/SS/s/S 秒
   */
  formatDate (format) {
    var o = {
      'M+': this.getMonth() + 1, // month
      'd+': this.getDate(), // day
      'h+': this.getHours(), // hour
      'm+': this.getMinutes(), // minute
      's+': this.getSeconds(), // second
      'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
      'S': this.getMilliseconds() // millisecond
    }

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1,
        (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(
            ('' + o[k]).length))
      }
    }
    return format
  },
  addDate (d, day) {
    let a = d.valueOf()
    a = a + day * 24 * 60 * 60 * 1000
    a = new Date(a)
    return a
  },
  /**
   * 字符串转时间
   * @param dateStr
   * @returns {*}
   */
  strToDate (dateStr) {
    if (!dateStr) {
      return ''
    }
    return new Date(Date.parse(dateStr.replace(/-/g, '/')))
  },
  /**
   * 毫秒数转时分秒
   * @param ms
   * @returns {string}
   */
  leftTimer (ms) {
    var days = parseInt(ms / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
    var hours = parseInt(ms / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时
    var minutes = parseInt(ms / 1000 / 60 % 60, 10)// 计算剩余的分钟
    var seconds = parseInt(ms / 1000 % 60, 10)// 计算剩余的秒数
    days = days > 0 && days < 10 ? '0' + days : days
    hours = hours > 0 && hours < 10 ? '0' + hours : hours
    minutes = minutes > 0 && minutes < 10 ? '0' + minutes : minutes
    seconds = seconds > 0 && seconds < 10 ? '0' + seconds : seconds
    let str = ''
    if (parseInt(days) > 0) {
      str += days + '天'
    }
    if (parseInt(hours) > 0) {
      str += hours + '小时'
    }
    if (parseInt(minutes) > 0) {
      str += minutes + '分'
    }
    if (parseInt(seconds) >= 0) {
      str += seconds + '秒'
    }
    return str
  },
  // --------------数字加减乘除--------------
  // 加法
  addNum (arg1, arg2) {
    return floatCal.add(arg1, arg2)
  },
  // 减法
  subNum (arg1, arg2) {
    return floatCal.sub(arg1, arg2)
  },
  // 乘法
  mulNum (arg1, arg2) {
    return floatCal.mul(arg1, arg2)
  },
  // 除法
  divNum (arg1, arg2) {
    return floatCal.div(arg1, arg2)
  },
  loadJS (url, data) {
    return new Promise(function (resolve, reject) {
      const s = document.createElement('script')
      s.setAttribute('src', url)
      if (data) {
        s.setAttribute('data', data)
      }
      document.head.appendChild(s)
      s.onload = resolve
      s.onerror = reject
    })
  },
  generateNonceStr (length = 32, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-') {
    const maxPos = chars.length
    let str, i
    str = ''
    for (i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return str
  },
  dateDiff (hisTime, nowTime) {
    hisTime = hisTime.getTime()
    let now = nowTime || new Date().getTime()
    let diffValue = now - hisTime
    let result = ''
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let month = day * 30
    let year = month * 12
    let _year = diffValue / year
    let _month = diffValue / month
    let _week = diffValue / (7 * day)
    let _day = diffValue / day
    let _hour = diffValue / hour
    let _min = diffValue / minute

    if (_year >= 1) result = parseInt(_year) + '年前'
    else if (_month >= 1) result = parseInt(_month) + '个月前'
    else if (_week >= 1) result = parseInt(_week) + '周前'
    else if (_day >= 1) result = parseInt(_day) + '天前'
    else if (_hour >= 1) result = parseInt(_hour) + '个小时前'
    else if (_min >= 1) result = parseInt(_min) + '分钟前'
    else result = '刚刚'
    return result
  },
  hideString (str) {
    if (!str) return ''
    if (str.length === 1) return `${str}**`
    if (str.length === 2) return str.replace(/^(.)(.)$/, '$1**$2')
    return str.replace(/^(.).+(.)$/, '$1**$2')
  },
  copyToClipboard (text) {
    const browser = this.browserVersion()
    if (browser.ios) {
      return this.iosCopyToClipboard(text)
    }
    if (text.indexOf('-') !== -1) {
      let arr = text.split('-')
      text = arr[0] + arr[1]
    }
    let textArea = document.createElement('textarea')
    textArea.style.position = 'fixed'
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.width = '2em'
    textArea.style.height = '2em'
    textArea.style.padding = '0'
    textArea.style.border = 'none'
    textArea.style.outline = 'none'
    textArea.style.boxShadow = 'none'
    textArea.style.background = 'transparent'
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()

    try {
      let successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    } catch (err) {
      document.body.removeChild(textArea)
      return false
    }
  },
  iosCopyToClipboard (text) {
    let textArea = document.createElement('div')
    textArea.style.WebkitUserSelect = 'text'
    textArea.id = 'iosTextArea'
    textArea.innerText = text
    document.body.appendChild(textArea)
    let copyDOM = document.querySelector('#iosTextArea')
    try {
      let range = document.createRange()
      range.selectNode(copyDOM)
      window.getSelection().addRange(range)
      let successful = document.execCommand('copy')
      window.getSelection().removeAllRanges()
      document.body.removeChild(copyDOM)
      return successful
    } catch (err) {
      window.getSelection().removeAllRanges()
      document.body.removeChild(copyDOM)
      return false
    }
  },
  imageMogr (val, w, h, defaultImage = '') {
    return val ? `${val}?imageMogr2/auto-orient/crop/${w}x${h}` : defaultImage
  },
  toPrice (val) {
    if (!val) {
      return '0.00'
    } else if (typeof val === 'string') {
      const res = /^\d+(\.\d+)?$/i.test(val) ? parseFloat(val).toFixed(2) : '0.00'
      // console.log(val, res)
      return res.toString()
    } else if (typeof val === 'number') {
      return val.toFixed(2).toString()
    }
    return '0.00'
  },
  toPercent (val) {
    if (!val || (typeof val !== 'string' && typeof val !== 'number')) {
      return '+0%'
    }
    let n = val
    if (typeof n === 'string') {
      n = /^-?\d+(\.\d+)?$/i.test(n) ? parseFloat(n) : 0
    }
    return n >= 0 ? `+${n}%` : `${n}%`
  }
}
export default Lang
