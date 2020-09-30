/**
 * 工具集
 */

/**
 * @desc 存储localStorage
 * @date 2018-02-10 16:10:45
 * @param {string} localStorage属性名
 * @param {*} localStorage属性值
 */
export const setStore = (name, content, exp) => {
  if (!name) return;
  let time = exp ? new Date().getTime() + exp * 1000 : '';
  let obj = time ? {data: content, exptime: time} : content;
  content = JSON.stringify(obj);
  window.localStorage.setItem(name, content);
};

/**
 * @desc 获取localStorage
 * @date 2018-02-10 16:12:17
 * @param {string} localStorage属性名
 * @return {*} localStorage属性值
 */
export const getStore = name => {
  if (!name) return;
  let time = new Date().getTime();
  let value = window.localStorage.getItem(name);
  try {
    value = JSON.parse(value);
    if (value && value.exptime) {
      if (value.exptime < time) {
        window.localStorage.removeItem(name);
        return;
      }
      return value.data;
    }
  } catch (e) {
    return value;
  }
  return value;
};

/**
 * @desc 删除localStorage
 * @date 2018-02-10 16:13:39
 * @param {string} localStorage属性名
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
};

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
  let windowHeight = window.screen.height;
  let height;
  let setTop;
  let paddingBottom;
  let marginBottom;
  let requestFram;
  let oldScrollTop;
  
  document.body.addEventListener('scroll', () => {
    loadMore();
  }, false);
  //运动开始时获取元素 高度 和 offseTop, pading, margin
  element.addEventListener('touchstart', () => {
    height = element.offsetHeight;
    setTop = element.offsetTop;
    paddingBottom = getStyle(element, 'paddingBottom');
    marginBottom = getStyle(element, 'marginBottom');
  }, {passive: true});
  
  //运动过程中保持监听 scrollTop 的值判断是否到达底部
  element.addEventListener('touchmove', () => {
    loadMore();
  }, {passive: true});
  
  //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
  element.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop;
    moveEnd();
  }, {passive: true});
  
  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop != oldScrollTop) {
        oldScrollTop = document.body.scrollTop;
        loadMore();
        moveEnd();
      } else {
        cancelAnimationFrame(requestFram);
        //为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
        height = element.offsetHeight;
        loadMore();
      }
    });
  };
  
  const loadMore = () => {
    if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
      callback();
    }
  };
};

/**
 * @desc 日期格式化
 * @date 2018-02-10 16:15:03
 * @param {*} 要格式化的日期
 * @param {string} formate 'yyyy/MM/dd hh:mm:ss'
 * @return {string} x string return.
 */
export function formatDate(date, fmt) {
  if (!date) return '';
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  let padLeftZero = function(str) {
    return ('00' + str).substr(str.length);
  };
  
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

/**
 * @desc 播放全屏
 * @date 2018-02-10 16:24:07
 */
export const requestFullScreen = () => {
  var de = document.documentElement;
  if (de.requestFullscreen) {
    de.requestFullscreen();
  } else if (de.mozRequestFullScreen) {
    de.mozRequestFullScreen();
  } else if (de.webkitRequestFullScreen) {
    de.webkitRequestFullScreen();
  }
};

/**
 * @desc 退出全屏
 * @date 2018-02-10 16:24:20
 */
export const exitFullscreen = () => {
  var de = document;
  if (de.exitFullscreen) {
    de.exitFullscreen();
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen();
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen();
  }
};

/**
 * 秒转化为时分秒
 */
/**
 * @desc 秒转化为时分秒
 * @date 2018-02-10 16:24:47
 * @param {number|string} x The number to raise.
 * @return {string} x string return.
 */
export const formatTime = (msd) => {
  var time = parseFloat(msd) / 1000;
  let changedTime = '';
  if (time) {
    if (time > 60 && time < 60 * 60) {
      changedTime = parseInt(time / 60.0) + '分钟' +
        parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) + '秒';
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      changedTime = parseInt(time / 3600.0) + '小时' + parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60) + '分钟' +
        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + '秒';
    } else {
      changedTime = parseInt(time) + '秒';
    }
  }
  return changedTime;
};

/**
 * @desc 秒转换为hh:mm:ss
 * @date 2018-02-10 16:08:56
 * @param {number|string} 秒
 * @return {string} 返回hh:mm:ss时间
 */
export const timeFormat = (a) => {
  if (a && a > 0) {
    var hh = parseInt(a / 3600);
    if (hh < 10) hh = '0' + hh;
    var mm = parseInt((a - hh * 3600) / 60);
    if (mm < 10) mm = '0' + mm;
    var ss = parseInt((a - hh * 3600) % 60);
    if (ss < 10) ss = '0' + ss;
    var length = hh.toString() + mm.toString() + ss.toString();
  }
  return length;
};

/**
 * @desc 检查是否是移动端（Mobile）、ipad、iphone、微信、QQ等
 * @date 2018-02-10 16:01:21
 * @return {Object}  返回browser对象
 */
export const userAgent = () => {
  let u = navigator.userAgent;
  let browser = {
    trident: u.indexOf('Trident') > -1, //IE内核
    presto: u.indexOf('Presto') > -1, //opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, //是否iPad
    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
    qq: u.match(/\sQQ/i) === ' qq' //是否QQ
  };
  return browser;
};

/**
 * @desc 获取url参数
 * @date 2018-02-10 15:59:54
 * @return {Object} 参数对象
 */
export const getQueryString = () => {
  let search = window.location.href.split('?')[1];
  let reg = /([^&|=]+)=([^&|=]*)/g;
  let queryObj = {};
  search && search.replace(reg, function(p, p1, p2) {
    queryObj[p1] = p2;
    return p;
  });
  return queryObj;
};

/**
 * @desc 数组去重
 * @date 2018-02-10 15:55:00
 * @param {Array}
 * @return {*}
 */
export const unique = (arr) => {
  if (!(arr instanceof Array)) {
    return;
  }
  if (arr instanceof Array && arr.length === 0) {
    return;
  }
  let res = [];
  let json = {};
  for (let i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
  return res;
};

/**
 * @desc 字数限制 ...
 * @date 2018-02-10 15:39:53
 * @param {string} a string text
 * @param {number} a number of limit count
 * @return {string} 处理后的字符
 */
export const wordLimit = (text, num) => {
  let des = text.toString();
  if (des.length > num) {
    des = des.substring(0, num) + '...';
    return des;
  }
  return des;
};

/**
 * @desc 微信授权页面
 * @date 2018-02-10 15:35:52
 * @param {string} example this.$router.resolve({path: '/home'})
 * @return {string} 微信授权页面地址
 */
export const getWXUrl = (url) => {
  let origin = window.location.origin + window.location.pathname;
  // let origin = 'http://test10.jy365.net/shequ'
  url = `${origin}/${url}`;
  let appid = 'wx63218cd64084079f';
  let redirect_uri = url && encodeURIComponent(url);
  let response_type = 'code';
  let scope = 'snsapi_base';
  let wechatUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}#wechat_redirect`;
  return wechatUrl;
};

/**
 *  @desc 反转义HTML文本
 */
export const HTMLDecode = (text) => {
  var temp = document.createElement('div');
  temp.innerHTML = text;
  var output = temp.innerText || temp.textContent;
  temp = null;
  return output;
};
/**
 *  生成32位随机字符串
 */
export const randomStr = () => {
  let guid32 = '';
  for (let i = 0; i < 8; i++) {
    let s4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    guid32 += s4;
  }
  return guid32;
};
/**
 *  获取Mac值
 */
export const getMac = () => {
  let mac = '';
  if (getStore('mac')) {
    mac = getStore('mac');
  } else {
    mac = randomStr();
    setStore('mac', mac, 7 * 24 * 60 * 60);
  }
  return mac;
};
// 义乌心理测试症状自评量表
export const analyResult = (obj) => {
  let data = {};
  // 躯体化
  if (obj.result1 > 36) {
    data.躯体化 = '有明显不适感'
  } else if (obj.result1 >= 24 && obj.result1 <= 36) {
    data.躯体化 = '存在不适感'
  } else if (obj.result1 < 24) {
    data.躯体化 = '不适感不明显'
  }
  // 强迫症状
  if (obj.result2 > 30) {
    data.强迫症状 = '存在症状'
  } else if (obj.result2 <= 30 && obj.result2 >= 20) {
    data.强迫症状 = '症状较明显'
  } else if (obj.result2 <= 20) {
    data.强迫症状 = '症状不明显'
  }
  // 人际关系敏感
  if (obj.result3 > 27) {
    data.人际关系敏感 = '敏感'
  } else if (obj.result3 <= 27 && obj.result3 >= 18) {
    data.人际关系敏感 = '较敏感'
  } else if (obj.result3 <= 18) {
    data.人际关系敏感 = '正常'
  }
  // 抑郁
  if (obj.result4 > 39) {
    data.抑郁 = '程度较强'
  } else if (obj.result4 <= 39 && obj.result4 >= 26) {
    data.抑郁 = '程度一般'
  } else if (obj.result4 <= 26) {
    data.抑郁 = '程度较弱'
  }
  // 焦虑
  if (obj.result5 > 30) {
    data.焦虑 = '较易焦虑'
  } else if (obj.result5 <= 30 && obj.result5 >= 20) {
    data.焦虑 = '普通'
  } else if (obj.result5 <= 20) {
    data.焦虑 = '不易焦虑'
  }
  // 敌对
  if (obj.result6 > 18) {
    data.敌对 = '易表现出敌对思想'
  } else if (obj.result6 <= 18 && obj.result6 >= 12) {
    data.敌对 = '一般'
  } else if (obj.result6 <= 12) {
    data.敌对 = '易表现出友好思想'
  }
  // 恐怖
  if (obj.result7 > 18) {
    data.恐怖 = '症状较明显'
  } else if (obj.result7 <= 18 && obj.result7 >= 12) {
    data.恐怖 = '一般'
  } else if (obj.result7 <= 12) {
    data.恐怖 = '症状不明显'
  }
  // 偏执
  if (obj.result8 > 18) {
    data.偏执 = '症状较明显'
  } else if (obj.result8 <= 18 && obj.result8 >= 12) {
    data.偏执 = '一般'
  } else if (obj.result8 <= 12) {
    data.偏执 = '症状不明显'
  }
  // 精神病性
  if (obj.result9 > 18) {
    data.精神病性 = '症状较明显'
  } else if (obj.result9 <= 18 && obj.result9 >= 12) {
    data.精神病性 = '一般'
  } else if (obj.result9 <= 12) {
    data.精神病性 = '症状不明显'
  }
  // 其他
  data.其他 = Math.round(obj.result10 * 10 / 7) / 10 + '(因子分)'
  return data
}
// 义乌心理测试焦虑自评量表
export const analyAnxiety = (obj) => {
  let data = {}
  if (obj.result < 50) {
    data.症状等级 = '无焦虑'
  } else if (obj.result <= 59 && obj.result >= 50) {
    data.症状等级 = '轻度焦虑'
  } else if (obj.result <= 69 && obj.result >= 60) {
    data.症状等级 = '中度焦虑'
  } else if (obj.result >= 70) {
    data.症状等级 = '重度焦虑'
  }
  return data
}
// 义乌心理测试抑郁自评量表
export const analyDepression = (obj) => {
  let data = {}
  if (obj.result < 53) {
    data.症状等级 = '无抑郁'
  } else if (obj.result <= 62 && obj.result >= 53) {
    data.症状等级 = '轻度抑郁'
  } else if (obj.result <= 72 && obj.result >= 63) {
    data.症状等级 = '中度抑郁'
  } else if (obj.result >= 73) {
    data.症状等级 = '重度抑郁'
  }
  return data
}
// 义乌心理测试匹兹堡睡眠质量指数
export const analySleep = (obj) => {
  let data = {}
  data.PSQI总分 = obj.result
  return data
}
