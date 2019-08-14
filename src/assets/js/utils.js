let utils = {
  delCookie: (name) => {
    if (window.localStorage && window.localStorage.removeItem) {
      window.localStorage.removeItem(name)
    }
    let old = utils.getCookie(name);
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    old && (document.cookie = name + '=' + old + ';expires=' + exp.toGMTString() + ';path=/;')
  },
  getCookie: (name) => {
    if (typeof window === 'undefined') return ''
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null
  },
  getReqCookie(context, name) {
    var Cookies = {}
    let cookie = context && context.req && context.req.headers && context.req.headers.cookie || ''
    cookie !== null && cookie.split(';').forEach(function (Cookie) {
      var parts = Cookie.split('=');
      Cookies[parts[0].trim()] = (parts[1] || '').trim();
    });
    return Cookies[name] || ''
  },
  setCookie: (name, value, days, domain) => {
    if (typeof window === 'undefined') return
    // if (window.localStorage && window.localStorage.setItem) {
    //   window.localStorage.setItem(name, value)
    // } else {

    var cookie = name + '=' + escape(value) + ';path=/;'
    if (days!=null) {
      var Days, exp = new Date()
      if (typeof (days) === 'object') {
        Days = days
      } else {
        days = (days === undefined) ? 30 : days //  此 cookie 将被保存 30 天
        Days = exp.getTime() + days * 24 * 60 * 60 * 1000
      }
      exp.setTime(Days)
      cookie += 'expires=' + exp.toGMTString() + ';'
    }
    document.cookie = cookie
    // }
  },
  install: (Vue, option) => {
    Vue.prototype.$utils = utils
  }
}

export default utils