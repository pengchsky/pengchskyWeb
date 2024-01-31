import { createApp } from 'vue'
import App from './App.vue'
import 'lib-flexible'
import './index.less';
import router from './routers/index'
import request from './utils/request';
import {getUrlQuery} from './utils/index'
const app = createApp(App);

app.use(router);
app.mount('#app');

app.provide('$http', request);

import font from './assets/font/font.less'
// if (import.meta.env.VITE_STAT_ENABLE === '1') {
//     (function() {
//         var el = document.createElement('script');
//         el.type = 'text/javascript';
//         el.async = true;
//         var ref = document.getElementById('app');
//         ref.parentNode.insertBefore(el, ref);
//         el.src = `https://s4.cnzz.com/z_stat.php?id=${import.meta.env.VITE_STAT_ID}&show=pic1`;
//     })();
// }
try{
    const aegis = new Aegis({
        id: import.meta.env.VITE_Aegis, // 应用ID，即上报ID
        uin: getUrlQuery('uid') || '', // 用户唯一 ID（可选）
        // reportApiSpeed: true, // 接口测速
        reportAssetSpeed: true, // 静态资源测速
        spa: true, // spa 应用页面跳转的时候开启 pv 计算
        env: import.meta.env.VITE_Aegis_ENV,
    });
}catch(err){}
