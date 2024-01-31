
import _ from 'underscore';

const loc = window.location;

/**
 * 格式化url链接查询参数
 * @param {String} query
 * @returns {Object}
 */
export function parseQuery(query) {
  const data = {};
  if (query && _.isString(query)) {
    let pairs = query.split('&'), pair, name, value;
    _.each(pairs, function(n) {
      pair = n.split('=');
      name = pair[0];
      value = pair[1] || '';
      if (name) {
        value = value.indexOf('%') > -1 ? value.replace(/%/g, '%25') : value;
        data[decodeURIComponent(name)] = decodeURIComponent(value)
      }
    })
  }
  return data;
}

/**
 * 获取url链接查询参数
 * @returns {string}
 */
function getQuery() {
  return loc.search.slice(1);
}

/**
 * 获取url链接查询参数名的值
 * @param {String} name
 * @param {String} [query=getQuery()]
 * @returns {String} value of query name;
 */

export function getParam(name, query = getQuery()) {
  if (!name || !_.isString(name)) return false;
  const param = parseQuery(query);
  return param[name];
}

export function getSessionStorageItem(key) {
  return sessionStorage.getItem(key)
}

export function setSessionStorageItem(key, value) {
  sessionStorage.setItem(key, value);
}

export function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}


export function isIOS(){
  var u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

export const getUrlQuery = (name) => {//获取url参数
	var reg = new RegExp("(^|&)" + name + "=([^&#]*)(&|$|#)", "i");
	// var r = window.location.search.substr(1).match(reg);
	const query = window.location.href.split('?')
	var r = (query[1] || '').match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return '';
}

// 打开提示
export const appToast = (text, time = 50) => {
  setTimeout(()=>{
      window.location.href = `popolive://toast?text=${text}`
  },time)
}

export const appCodeToast = (code, text) => {
  window.location.href = `popolive://apitoast?code=${code}&message=${text}`
}

//app处理报错信息
export const appDealResponse = (code,msg) => {
  //版本判断
let version = getUrlQuery('version') || ''
version = +version.replace(/\./g,'')
let app = getUrlQuery('app') || ''
  // if(isNoApp){
  //     toast(msg)
  //     return
  // }
  if((!app || !version) || (app == 'popo')){
      appToast(msg)
      return
  }
  if(code === 'F_AUTH'){
    appToast(msg)
    return
  }
  if(isIOS()){//IOS
    let canVersion = 1304
    if(version >= canVersion){
        appCodeToast(code, msg)
        return true
    }else{
        appToast(msg)
    }
      return
  }else{//安卓
      let canVersion = 1206
    if(version >= canVersion){
          try{
              window.JsAndroid && window.JsAndroid.dealResponse(code,msg)
              return true
          }catch(err){}
      }else{
          appToast(msg)
          return
      }
  }
}

export const isAndroid = () => {
    return navigator.userAgent.includes('Android')
}

/*
* 获取设备信息
* */
export const isDeviceData = () => {
    let webLog = {}
    let userAgent = navigator.userAgent
    // 获取微信版本
    let m1 = userAgent.match(/MicroMessenger.*?(?= )/)
    if (m1 && m1.length > 0) {
        webLog.wechat = m1[0]
    }
    if (isIOS) {
        // 获取设备名
        if (userAgent.includes('iPad')) {
            webLog.device = 'iPad'
        } else {
            webLog.device = 'iPhone'
        }
        // 获取操作系统版本
        m1 = userAgent.match(/iPhone OS .*?(?= )/)
        if (m1 && m1.length > 0) {
            webLog.system = m1[0]
        }
    }
    // 安卓手机
    if (isAndroid) {
        // 获取设备名
        m1 = userAgent.match(/Android.*; ?(.*(?= Build))/)
        if (m1 && m1.length > 1) {
            webLog.device = m1[1]
        }
        // 获取操作系统版本
        m1 = userAgent.match(/Android.*?(?=;)/)
        if (m1 && m1.length > 0) {
            webLog.system = m1[0]
        }
    }
    return webLog;
}
/*
* 统一headers
* */

export const getHeaders = () => {
    const uid = getUrlQuery('uid') ? getUrlQuery('uid') + '' : '';
    let headers = {
        headers:{
            'mx-uid': uid ? encodeURIComponent(uid) : '',
            'mx-token': getUrlQuery('token') || '',
            'mx-appName': getUrlQuery('app') || 'popo',
            'mx-appVersion': getUrlQuery("version") || '1.0.00',
            'mx-deviceType': getUrlQuery("platform") || (isIOS() ? 'ios' : "android"),
            'mx-deviceOS': isDeviceData().system,
            'mx-debug': null
        }
    }
    return headers;
}
