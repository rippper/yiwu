/**
* 修改密码
*/
<template>
  <div class="change_pwd container_top">
    <!--头部-->
    <header-fix title="修改密码" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="change_mobile_list">
      <div class="change_mobile_item">
        <input class="old_pwd" v-model="sendData.oldPwd" type="password" placeholder="输入旧密码"/>
      </div>
      <div class="change_mobile_item newPwd">
        <input class="new_pwd" v-model="sendData.newPwd" type="password" placeholder="输入新密码(6~16个字符)"/>
        <span class="error" :class="!isPassPassword&&'active'">密码格式有误</span>
      </div>
      <div class="change_mobile_item">
        <input class="confirm_pwd" v-model="confirmPwd" type="password" placeholder="确认新密码"/>
      </div>
    </div>
    <div class="submit_edit">
      <mt-button type="primary" size="large" @click.native="updatePwd">提交</mt-button>
    </div>
    <!-- <bottom-bar></bottom-bar> -->
  </div>
</template>
<script>
  import {Button, MessageBox, Toast} from 'mint-ui';
  import Vue from 'vue';
  import {mapActions, mapState} from 'vuex';
  import {getMac} from '../plugins/utils';
  import {changeUserPassword, UpdateLoginStatus} from '../service/getData';
  import {goBack} from '../service/mixins';
  // import { bottomBar } from '../components'

  Vue.component(Button.name, Button);
  export default {
    mixins: [goBack],
    data() {
      return {
        sendData: {
          oldPwd: '',
          newPwd: ''
        },
        confirmPwd: '',
        isPassConfirm: false,
        isPassPassword: true
      };
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapActions(['saveUserInfo']),
      async updatePwd() {
        if (!this.sendData.oldPwd) {
          Toast({message: '输入旧密码', position: 'bottom'});
        } else if (!this.sendData.newPwd) {
          Toast({message: '请输入新密码', position: 'bottom'});
        } else if (!this.isPassPassword) {
          Toast({message: '密码格式有误', position: 'bottom'});
        } else if (this.sendData.oldPwd == this.sendData.newPwd) {
          Toast({message: '新旧密码不能一致', position: 'bottom'});
        } else if (!this.isPassConfirm) {
          Toast({message: '两次输入新密码不一致', position: 'bottom'});
        } else {
          this.sendData.UserID = this.userInfo.UserID;
          let data = await changeUserPassword(this.sendData);
          if (data.Result == '修改成功') {
            Toast({message: '修改成功,请重新登陆', position: 'bottom'});
            let Mac = getMac();
            await UpdateLoginStatus({UserID: this.userInfo.UserID, Mac});
            this.saveUserInfo({});
            this.$router.push('/login');
          } else {
            MessageBox('警告', data.Result);
          }
        }
      }
    },
    watch: {
      confirmPwd: function(val) {
        if (val == this.sendData.newPwd) {
          this.isPassConfirm = true;
        } else {
          this.isPassConfirm = false;
        }
      },
      'sendData.newPwd': {
        handler(newValue, oldValue) {
          let trimPwd = newValue.replace(/\s+/g, '');
          if (trimPwd && trimPwd.length >= 6 && trimPwd.length <= 16) {
            this.isPassPassword = true;
          } else {
            this.isPassPassword = false;
          }
        },
        deep: true
      }
    },
    // components: {
    //   bottomBar
    // },
    beforeRouteLeave(to, from, next) {
      MessageBox.close();
      next();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .change_pwd {
    background-color: $fill-body;

    .change_mobile_item {
      background-color: $fill-base;
      margin-top: toRem(20px);

      input {
        display: inline-block;
        width: 100%;
        padding: toRem(30px);
        line-height: 1.2em;
      }
    }

    .submit_edit {
      margin-top: toRem(50px);
      padding: 0 toRem(30px);
    }

    .newPwd {
      position: relative;

      .error {
        position: absolute;
        right: toRem(-225px);
        top: toRem(28px);
        color: $brand-error;
        transition: all 0.5s;

        &.active {
          right: toRem(50px);
        }
      }
    }
  }
</style>
