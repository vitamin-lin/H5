const Util = {
  getParams: function() {
    /* 获取全部url参数 */
    var url = window.location.href
    var urls = url.indexOf('#') > -1 ? url.split('#')[0] : url
    if (urls.indexOf('?') < 0) {return {}}
    var regQ = RegExp(/\?/g)
    var regD = RegExp(/=/g)
    var lengths = urls.match(regQ).length

    var params = {}
    for (var i = 1; i <= lengths; i++) {
      var splitResult = urls.split('?')[i]
      var splitDLength = splitResult.match(regD).length

      if (splitDLength > 1) {
        var splitDArr = splitResult.split('&')
        for (var j = 0; j < splitDArr.length; j++) {
          params[splitDArr[j].split('=')[0]] = splitDArr[j].split('=')[1]
        }
      } else {
        params[splitResult.split('=')[0]] = splitResult.split('=')[1]
      }
    }
    return params
  },

  getParamSize: function() {
    /* 获取参数个数 */
    getSize = function () {
      var urls = window.location.href.split('?')[1]
      return urls.split('&').length
    }
    return window.location.href.indexOf('?') > 0 ? getSize() : 0
  },
  
  getWindowHeight: function() {
    /* 获取浏览器可视区域高度 */
    if (typeof (window.innerHeight) == 'number') {
      return window.innerHeight
    }

    if (document.documentElement && document.documentElement.clientHeight) {
      return document.documentElement.clientHeight
    }

    if(document.body && document.body.clientHeight) {
      return document.body.clientHeight
    }
  },

  getPhoneInfo: function() {
    /* 手机系统 是否app内 是否微信内 */
    var ua = navigator.userAgent.toLowerCase()
    var phoneType = /ylappios/.test(ua) || /iphone|ipad|ipod/i.test(ua) ? 'ios' : 'and'
    var isApp = /ylapp/.test(ua) ? true : false
    var isWx = /MicroMessenger/i.test(ua) ? true : false
    return {type: phoneType, isApp: isApp, isWx: isWx}
  },

  setCookie: function(cookieName, cookieValue, expiredays, domain) {
    /* 
      存储cookie setCookie(key,value,过期天数,域名)
      关闭浏览器删除 => setCookie('userId', 1234, 0) 
    */
    if (0 === cookieValue) {
      cookieValue = 0
    } else if (!cookieValue) {
      cookieValue = ''
    }
    cookieValue = encodeURIComponent(cookieValue)
    var cookieStr = cookieName + '=' + cookieValue

    if (expiredays && !isNaN(expiredays)) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      cookieStr += '; expires=' + exdate.toUTCString()
    }

    if (domain) {
      cookieStr += '; path=' + '/'
      cookieStr += '; domain=' + domain
    }

    document.cookie = cookieStr
    return cookieValue
  },

  getCookie: function(cookieName) {
    /* 获取cookie */
    var strCookie = document.cookie
    var arrCookie = strCookie.split('; ')
    var cookieValue = null
    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split('=')
      if (cookieName == arr[0]) {
        cookieValue = (arr[1])
        break
      }
    }
    if (!cookieValue) {
      cookieValue = ''
    }
    cookieValue = decodeURIComponent(cookieValue)
    return cookieValue
  },

  delCookie: function(key) {
    /* 删除cookie delCookie("user") */
    this.setCookie(key, 1, -1)
  }
}

export default Util