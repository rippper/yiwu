<template>
  <div class="userLogin">
    <!--头部-->
    <!--<header-fix title="登陆" fixed></header-fix>-->
    <!--<div class="login_banner">
      <img src="../assets/login_ico.png">
      <p></p>
    </div>-->
    <img class="bg_img" src="../assets/yw_loginbg.png" alt="">
    <div class="user_login">
      <form>
        <div class="form-group">
          <i class="webapp webapp-account"></i>
          <input v-model="Account" class="form-control" type="text" placeholder="输入用户名" @focus="focus" @blur="blur">
          <span class="acError" v-if="acError">用户名不能包含汉字</span>
        </div>
        <div class="form-group">
          <i class="webapp webapp-lock"></i>
          <input v-model="Password" class="form-control" type="password" placeholder="输入密码" @focus="focus" @blur="blur"
                 @keyup.enter="clickLogin">
          <span class="pwError" v-if="pwError">密码长度6~16位</span>
        </div>
      </form>
      <mt-button class="login_btn" size="large" type="primary" @click.native="clickLogin">登录</mt-button>
      <!--<div class="checkbox">
        <label>
          <span class="mint-checkbox">
            <input v-model="Remember" type="checkbox" class="mint-checkbox-input">
            <span class="mint-checkbox-core"></span>
          </span>
          <span class="mint-checkbox-label">记住密码</span>&nbsp;
        </label>
        <a class="forget" @click="showForgetMessage">忘记密码？</a>
      </div>-->
      <!--<div class="register_btn">
        <mt-button size="normal" type="primary" @click.native="toRegister" plain>
          注册账号
        </mt-button>
      </div>-->
    </div>
  </div>
</template>
<script>
  import CryptoJS from 'crypto-js';
  import {Button, Indicator, MessageBox, Toast} from 'mint-ui';
  import Vue from 'vue';
  import {mapActions, mapState} from 'vuex';
  import {getMac, getStore, setStore} from '../plugins/utils';
  import {CheckLoginStatus, ValidateUser} from '../service/getData';

  Vue.component(Button.name, Button);

  export default {
    name: 'login',
    data() {
      return {
        Account: '',
        Password: '',
        Remember: true,
        Code: '',
        backUrl: '',
        key: 'jy365jy365jy365y',
        iv: '0392039203920300',
        pwError: false,
        acError: false,
        addressName: this.$route.query.name || '',
        addressQuery: this.$route.query.query ? JSON.parse(this.$route.query.query) : ''
      };
    },
    created() {
      this.Code = this.$route.query.code;
      this.getUserAgent();
    },
    mounted() {
      // console.log(JSON.stringify(this.userInfo))
      if (JSON.stringify(this.userInfo) != '{}') {
        this.getLoginStatus();
      }
      let backUrl = this.$route.query.currentUrl;
      if (backUrl) {
        this.backUrl = backUrl;
      } else {
        this.backUrl = '/home';
      }
      this.Account = this.decrypt(localStorage.getItem('a_app'));
      this.Password = this.decrypt(localStorage.getItem('p_app'));
      this.Remember = getStore('remember');
    },
    computed: {
      ...mapState(['userAgent', 'wxLoginUrl', 'wxIndexUrl', 'userInfo'])
    },
    methods: {
      ...mapActions(['getUserAgent', 'saveUserInfo']),
      focus(e) {
        e.target.parentNode.style.boxShadow = '0 0 0.2rem 0 #3a7fb6';
      },
      blur(e) {
        e.target.parentNode.style.boxShadow = '';
      },
      async getLoginStatus() {
        let Mac = getMac();
        let res = await CheckLoginStatus({UserID: this.userInfo.UserID, Mac});
        if (res == 1) {
          // this.$router.push('/home');
          this.$router.go(-1)
        }
      },
      /*登陆*/
      async clickLogin() {
        if (!this.Account || !this.Password) {
          Toast({message: '用户名或密码不能为空', position: 'bottom'});
          return;
        }
        let Mac = getMac();
        let loginParams = {
          UserID: this.Account,
          Password: this.Password,
          code: this.code || 'noUser',
          Mac
        };
        Indicator.open();
        let res = null;
        /*判断是否在微信环境*/
        /*if (this.userAgent.weixin) {
          res = await ValidateUser(loginParams)
        } else {*/
        console.log(loginParams)
        res = await ValidateUser(loginParams);
        // }
        Indicator.close();
        if (res.Result == 1 || res.Result == 6) {
          this.saveUserInfo(res);
          // console.log(this.userInfo);
          if (this.Remember) {
            this.encrypt('a_app', this.Account);
            this.encrypt('p_app', this.Password);
            setStore('remember', true);
          } else {
            this.encrypt('a_app', '');
            this.encrypt('p_app', '');
            setStore('remember', false);
          }
          /*判断 weixin,mobile*/
          /*if (this.userAgent.weixin) {
            window.location.href = this.wxIndexUrl
          } else {*/
          console.log(this.addressName)
          console.log(this.addressQuery)
          if (this.addressName != '' && this.addressQuery != '') {
            this.$router.push({ path: this.addressName, query: this.addressQuery })
          } else if (this.addressName != '' && this.addressQuery == '') {
            this.$router.push({ path: this.addressName })
          } else {
            this.$router.push({ path: '/home' })
          }
          // this.$router.go(-1)
          // this.$router.replace(this.backUrl);
          // }
        } else if (res.Result == 2) {
          Toast({message: '密码错误！', position: 'bottom'});
        } else if (res.Result == 3) {
          MessageBox('警告', '账号已停用');
        } else if (res.Result == 4) {
          MessageBox('警告', '账户不存在');
        } else if (res.Result == 5) {
          MessageBox('警告', '领航平台未开通');
        } else {
          MessageBox('警告', '登陆异常');
        }
      },
      /*加密*/
      encrypt(name, value) {
        let encryptText = CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(this.key), {
          iv: CryptoJS.enc.Utf8.parse(this.iv),
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });
        localStorage.setItem(name, encryptText);
      },
      /*解密*/
      decrypt(value) {
        let decryptText = CryptoJS.AES.decrypt(value || ' ', CryptoJS.enc.Utf8.parse(this.key), {
          iv: CryptoJS.enc.Utf8.parse(this.iv),
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
        return decryptText;
      },
      toRegister() {
        this.$router.push('/register');
      },
      showForgetMessage() {
        MessageBox.alert('如果忘记密码，请联系本单位联络员或客服0571-28990788', '温馨提示');
      },
      randomStr() {
        let guid32 = '';
        for (let i = 0; i < 8; i++) {
          let s4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
          guid32 += s4;
        }
        return guid32;
      }
    },
    watch: {
      /*Password(val) {
        if (!val) return;
        let flag = false;
        let length = val.length;
        if (length < 6 || length > 16) {
          flag = true;
        }
        this.pwError = flag;
      },*/
      Account(val) {
        if (!val) return;
        let flag = 0;
        let reg = /^[\u4e00-\u9fa5]+$/;
        let arr = val.split('');
        for (var i in arr) {
          if (reg.test(arr[i])) {
            flag = true;
            break;
          }
        }
        this.acError = flag;
      }
    },
    beforeRouteLeave(to, from, next) {
      MessageBox.close();
      next();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../style/mixin';

  .userLogin {
    position: relative;
    width: 100%;
    height: 100%;

    .bg_img {
      position: absolute;
      width: 100%;
      height: auto;
      z-index: 1;
    }

    /*.login_banner {
      width: 100%;
      text-align: center;
      color: $brand-primary;
      font-size: 15px;
      font-weight: bold;
      padding-top: toRem(300px);
      !*img {
        width: toRem(166px);
        padding-top: toRem(120px);
      }*!
      p {
        padding: toRem(20px) 0 toRem(65px) 0;
        font-size: toRem(75px);
        font-family: "幼圆";
      }
    }*/
    .user_login {
      position: absolute;
      z-index: 2;
      left: 50%;
      padding: 0 toRem(30px) 0 toRem(30px);
      transform: translate(-50%, toRem(585px));

      .form-control {
        border: none;
        padding-left: toRem(80px);
      }

      .form-group {
        border: 1px solid $border-color-base;
        @include borderRadius(45px);
        background: #fff;
        position: relative;
        width: toRem(585px);
        height: toRem(85px);
        margin: 0 auto;
        margin-bottom: toRem(30px);

        .webapp {
          color: $brand-primary;
          position: absolute;
          top: toRem(23px);
          left: toRem(20px);
        }
      }

      .pwError, .acError {
        position: absolute;
        right: toRem(10px);
        top: 0;
        color: $brand-error;
        @include ht-lineHt(80px);
      }

      .checkbox {
        color: $brand-primary;
        font-size: 14px;
        margin-top: toRem(10px);

        input[type=checkbox] {
          width: toRem(24px);
          height: toRem(24px);
          margin: 0;
        }

        .mint-checkbox-input:checked + .mint-checkbox-core {
          background-color: $brand-wait;
          border-color: $brand-wait;
        }
      }

      .forget {
        @extend %pull-right;
        display: inline-block;
        @include ht-lineHt(90px);
        color: $brand-primary;
      }

      .register_btn {
        padding-top: toRem(90px);
        text-align: center;

        .mint-button {
          height: toRem(75px);
        }
      }

      .login_btn {
        @include borderRadius(85px);
        margin: 0 auto;
        width: toRem(585px);
      }
    }
  }

</style>
