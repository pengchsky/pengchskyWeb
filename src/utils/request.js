
import axios from 'axios';
import {getParam, parseQuery, setSessionStorageItem, getSessionStorageItem, appDealResponse, getHeaders} from './index';

// const BASE_URL = 'http://testapi.pp.suishoubo666.com/';
// const BASE_URL = '';
export  const SYSTEM_SUCCESS_CODE = 'S_OK';

axios.defaults.timeout = 5000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; //配置请求头
// axios.defaults.baseURL ="http://www.realgamecloud.com/";//"http://t.xiehou360.com/DollPubAppServer/";// httpUtils.getBaseUrl();httpUtils.getBaseUrl(); //配置接口地址
// export default axios;

axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    if (config.method === 'post') {
        config.data = JSON.stringify(config.data);
    }
    // console.log('config===========',config);
    return config;
}, (error) => {
    console.info("错误的传参", 'fail');
    return Promise.reject(error);
});

axios.interceptors.response.use(function (res) {
    const data = res.data;
    const { code } = data;
    if(code !== SYSTEM_SUCCESS_CODE){
        const status = appDealResponse(code,data.message)
        if(['F_BALANCE'].includes(code) && status)res.data.code = null
    }
    return res;
  }, function (error) {
    appDealResponse(error.code,error.message)
    return Promise.reject(error);
});

function getParamForStorage(name) {
    let param = getParam(name);
    const query = window.location.search;
    const queryParam = query.slice(1);
    const queryObject = parseQuery(queryParam);

    // 同时有这两个参数时才保存和更新
  if (queryObject.uid && queryObject.token) {
    setSessionStorageItem(name, param);
    return param;
  }

  // 如果这两个参数不全时，其他都置为空
  if (!queryObject.uid || !queryObject.token) {
    param = undefined;
  }

  if (!param) {
    return getSessionStorageItem(name) || undefined;
  }


  return param;
}


 function request(url, params) {
    const comParam = {
        uid: getParamForStorage('uid'),
        token: getParamForStorage('token'),
        app: getParam('app'),
        version: getParam('version'),
    }

    const nParams = {
        ...params,
        ...comParam,
    }
    const config = getHeaders();
    return new Promise((resolve, reject) => {
        axios.post(`${import.meta.env.VITE_BASE_URL}${url}`, nParams, config)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
};

export default {request};
