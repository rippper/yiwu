// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import './assets/iconfont/iconfont.css';
import './components/global';
import {
  setStore,
  userAgent,
  getMac,
} from './plugins/utils';

import routes from './router';
import './service/filter';
import {CheckLoginStatus} from './service/getData';
import store from './store/';
import './style/base.scss';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(MintUI);

//修改title
const changeTitle = (title) => {
  if (title) {
    document.title = title;
    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
      let i = document.createElement('iframe');
      i.src = '//m.baidu.com/favicon.ico';
      i.style.display = 'none';
      i.onload = () => {
        setTimeout(() => {
          i.remove();
        }, 9);
      };
      document.body.appendChild(i);
    }
  }
};
// 检查登录状态
const getLoginStatus = (next) => {
  let Mac = getMac();
  let userInfo = store.state.userInfo;
  CheckLoginStatus({
    UserID: userInfo.UserID,
    Mac
  }).then(res => {
    res = Number(res);
    if (res !== 1) {
      store.dispatch('saveUserInfo', {});
      next({
        path: '/login'
      });
    } else {
      next();
    }
  });
  // next();
};

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  let fromUrl = from.fullPath;
  let href = window.location.href;
  if (!/\/favicon\.ico/.test(href)) {
    setStore('fromUrl', fromUrl);
  }
  let title = to.meta.title;
  changeTitle(title);
  if (to.name !== 'login') {
    if (JSON.stringify(store.state.userInfo) === '{}') {
      next({
        path: '/login'
      });
    } else {
      getLoginStatus(next);
    }
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
  /*存入当前url*/
  let currentUrl = to.fullPath;
  let href = window.location.href;
  if (!/\/favicon\.ico/.test(href)) {
    setStore('currentUrl', currentUrl);
  }
  /*判断mobile weixin*/
  let agent = userAgent();
  setStore('userAgent', agent);
});

new Vue({
    router,
    store
}).$mount('#app');

// if (process.env.NODE_ENV == 'development') {
//   new Vue({
//     router,
//     store
//   }).$mount('#app');
// } else {
//   let agent = userAgent();
//   if (!(agent.mobile || agent.android || agent.iPhone || agent.iPad || agent.weixin || agent.qq)) {
//     new Vue({
//       template: `<h1 style="text-align: center;font-size: 26px;padding-top: 50px;">请在手机浏览器或微信中打开</h1>`
//     }).$mount('#app');
//   } else {
//     new Vue({
//       router,
//       store
//     }).$mount('#app');
//   }
// }
export default router;
