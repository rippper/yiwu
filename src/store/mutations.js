import {
  ALERT_TIMES,
  GET_NETWORKTYPE,
  GET_USERAGENT,
  GET_USERINFO,
  SAVE_COURSEINFO,
  SAVE_USERINFO,
} from './mutation-types.js';

export default {
  // 获取用户信息
  [GET_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  // 保存用户信息
  [SAVE_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  // 获取userAgent
  [GET_USERAGENT](state, userAgent) {
    state.userAgent = userAgent;
  },
  // 获取网络类型
  [GET_NETWORKTYPE](state, netWorkType) {
    state.netWorkType = netWorkType;
  },
  // 保存要播放的课程
  [SAVE_COURSEINFO](state, courseInfo) {
    state.courseInfo = courseInfo;
  },
  [ALERT_TIMES](state, payload) {
    state.alertTimes = payload;
  },
};
