
function urlParse (e) {
	var url = decodeURIComponent(window.location.search);
	var queryStr = url.substr(url.indexOf('?')+1);
	var exp = new RegExp('(^|&)'+e+'=([^&]*)(&|$)', 'i');
	var stas = queryStr.match(exp);
	return null != stas ? unescape(stas[2]) : null;
}
function getWatermark(){
	setWatermark(urlParse ("id"))

}
function getCookie(name) {
    if (typeof window === 'undefined') return ''
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null
}

function setCookie(name, value, days, domain) {
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
}
var userName = urlParse ("username") || getCookie("username") || ""
if(userName){
	setCookie("username",userName)
	// setWatermark(userName)
}
var oldcharturl = urlParse ("oldcharturl") || getCookie("oldcharturl") || ""
if(oldcharturl){
  setCookie("oldcharturl",oldcharturl)
  // setWatermark(userName)
}
