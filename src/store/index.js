import Vue from 'vue';
import Vuex from 'vuex';
import {getStore} from '../plugins/utils';
import actions from './action';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  userInfo: getStore('userInfo') || {}, /*用户信息*/
  userAgent: {}, /*浏览器设备信息*/
  wxIndexUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx63218cd64084079f&redirect_uri=http%3A%2F%2Fwww.szgx.suzhou.gov.cn%2Fwechat%2F%23%2Fhome&response_type=code&scope=snsapi_base#wechat_redirect',
  wxLoginUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx63218cd64084079f&redirect_uri=http%3A%2F%2Fwww.szgx.suzhou.gov.cn%2Fwechat%2F%23%2Flogin&response_type=code&scope=snsapi_base#wechat_redirect',
  netWorkType: '', /*网络类型*/
  courseInfo: getStore('courseInfo'), // 要播放的课程信息
  alertTimes: 0
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
