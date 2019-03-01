<template>
  <div class="footerFix">
    <mt-tabbar :value="selected" fixed>
      <mt-tab-item id="home" href="#/home">
        <img class="footer_icon_1" v-if="selected == 'home'" slot="icon" src="../assets/home_ico2.png">
        <img class="footer_icon_1" v-else slot="icon" src="../assets/home_ico1.png">
        <!--<i v-if="selected == 'home'" slot="icon" class="webapp webapp-homefill" style="color: #ec4747"></i>
        <i v-else slot="icon" class="webapp webapp-home" style="color: #8a8a8a"></i>-->
        首页
      </mt-tab-item>
      
      <mt-tab-item id="courseCenter" href="#/courseCenter">
        <img class="footer_icon_3" v-if="selected == 'courseCenter'" slot="icon" src="../assets/course_ico2.png">
        <img class="footer_icon_3" v-else slot="icon" src="../assets/course_ico1.png">
        课程中心
      </mt-tab-item>
      <mt-tab-item id="examGuide" href="#/examGuide">
        <img class="footer_icon_3" v-if="selected == 'examGuide'" slot="icon" src="../assets/exam_ico2.png">
        <img class="footer_icon_3" v-else slot="icon" src="../assets/exam_ico1.png">
        <!-- <i v-if="selected == 'examGuide'" slot="icon" class="webapp webapp-exam-fill" style="color: #ec4747"></i>
        <i v-else slot="icon" class="webapp webapp-examination_paper" style="color: #8a8a8a"></i> -->
         在线测试
      </mt-tab-item>
      <mt-tab-item id="personalCenter" href="#/personalCenter">
        <img class="footer_icon_2" v-if="selected == 'personalCenter'" slot="icon" src="../assets/person_ico2.png">
        <img class="footer_icon_2" v-else slot="icon" src="../assets/person_ico1.png">
        <!--<i v-if="selected == 'personalCenter'" slot="icon" class="webapp webapp-accountfilling" style="color: #ec4747"></i>
        <i v-else slot="icon" class="webapp webapp-account" style="color: #8a8a8a"></i>-->
        我的
      </mt-tab-item>
      <!-- <mt-tab-item id="logOut" @click.native="logOut">
        <img class="footer_icon_4" v-if="selected == 'logOut'" slot="icon" src="../assets/out_ico2.png" alt="退出">
        <img class="footer_icon_4" v-else slot="icon" src="../assets/out_ico1.png" alt="退出">
        退出
      </mt-tab-item> -->
    </mt-tabbar>
  </div>
</template>
<script>
  import {Tabbar, TabItem} from 'mint-ui';
  import Vue from 'vue';
  import {mapActions, mapState} from 'vuex';
  import {getMac} from '../plugins/utils';
  import {UpdateLoginStatus} from '../service/getData';

  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  export default {
    name: 'footerFix',
    props: ['selected'],
    computed: {
      ...mapState(['userInfo']),
    },
    methods: {
      ...mapActions(['saveUserInfo', 'saveAlertTimes']),
      async logOut() {
        let Mac = getMac();
        await UpdateLoginStatus({UserID: this.userInfo.UserID, Mac});
        this.saveUserInfo({});
        this.saveAlertTimes(0);
        this.$router.push({path: '/login'});
      },
    },
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .footerFix {
    .mint-tabbar {
      height: toRem(100px);
      border-top: 1px solid $border-color-base;
    }

    .mint-tab-item-icon {
      .webapp {
        font-size: 24px;
      }
    }

    .mint-tabbar > .mint-tab-item.is-selected {
      background-color: transparent;
      color: $brand-primary;
    }

    .mint-tab-item {
      padding: toRem(14px) 0;
    }

    .mint-tab-item-icon {
      width: toRem(48px);
      height: toRem(48px);
      margin: 0 auto 0;

      & > {
        .footer_icon_1 {
          width: toRem(42px);
          height: toRem(42px);
          margin: 0 auto;
        }

        .footer_icon_2 {
          width: toRem(42px);
          height: toRem(42px);
          margin: 0 auto;
        }

        .footer_icon_3 {
          width: toRem(42px);
          height: toRem(32px);
          margin: 0 auto;
        }

        .footer_icon_4 {
          width: toRem(30px);
          height: toRem(40px);
          margin: 0 auto;
        }
      }
    }

    .mint-tab-item-label {
      font-size: 12px;
    }
  }
</style>
