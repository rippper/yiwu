/**
* 考试结果
*/
<template>
  <div class="exam_result container_top">
    <!--头部-->
    <header-fix title="测试结果" fixed></header-fix>
    <div class="result_top">
      <p class="get_score" v-if="result.thisScore">您的成绩是<span>{{result.thisScore}}</span>分，感谢您的参与！</p>
      <p class="get_score" v-else>获取后台数据失败，请前往考试历史记录页面查看成绩！</p>
    </div>
    <div class="result_footer">
      <div class="reward" v-if="!result.thisScore && result.thisScore != 0">
        <mt-button type="primary" @click.native="back">结束测试</mt-button>
      </div>
      <div class="reward" v-if="result.Reward == 1">
        <!--<p>谢谢您的参与！</p>-->
        <!--<p>您获得的{{result.RewardInfo}}已发送至{{result.userMobileNum}}，请注意查收</p>
        <mt-button type="primary" @click="back">确认</mt-button>-->
        <mt-button type="primary" @click.native="back">结束测试</mt-button>
      </div>
      <div class="reward" v-if="result.Reward == 2 && result.userMobileNum">
        <!--<p>&lt;!&ndash;恭喜您！您的成绩是100分，您本月的测试已合格，&ndash;&gt;谢谢您的参与！</p>-->
        <!--<p>
          为了让您更好的开展网上在线学习，我们将赠送您{{result.RewardInfo}}，赠送的流量将在次月的前五个工作日内充值到你号码为{{result.userMobileNum}}的手机上，有效期一个月。如需修改手机号，请在下方空格内输入
        </p>
        <p><input type="text" v-model="mobileNum" placeholder="请输入新的手机号"></p>
        <mt-button type="primary" @click="updateExamReward(result.Reward)">确认</mt-button>-->
        <mt-button type="primary" @click.native="back">结束测试</mt-button>
      </div>
      <div class="reward" v-if="result.Reward == 0 && result.userMobileNum">
        <!--<p>谢谢您的参与！</p>-->
        <!--<p>恭喜您！您的成绩是100分，您本月的测试已合格，感谢您的参与！</p>-->
        <!--<p>
          为了让您更好的开展网上在线学习，我们将赠送您{{result.RewardInfo}}，赠送的流量将在次月的前五个工作日内充值到你号码为{{result.userMobileNum}}的手机上，有效期一个月。如需修改手机号，请在下方空格内输入
        </p>
        <p><input type="text" v-model="mobileNum" placeholder="请输入新的手机号"></p>
        <mt-button type="primary" @click="updateExamReward(result.Reward)">确认</mt-button>-->
        <mt-button type="primary" @click.native="back">结束测试</mt-button>
      </div>
      <div class="reward" v-if="result.Reward == 2 && !result.userMobileNum">
        <!--<p>谢谢您的参与！</p>-->
        <!--<p>为了让您更好的开展网上在线学习，我们将赠送您{{result.RewardInfo}}!</p>
        <p>请输入手机号<input type="text" v-model="mobileNum" placeholder="请输入手机号" name="input3"></p>
        <mt-button type="primary" @click="updateExamReward2">确认</mt-button>-->
        <mt-button type="primary" @click.native="back">结束测试</mt-button>
      </div>
      <div class="reward has_review_btn" v-if="parseInt(result.highscore) < 60">
        <span class="thanks">您本月的测试未合格，请点击“重新答题”再次进入测试界面，也可下次从“个人空间”内“在线测试”一栏进入答题。</span>
        <mt-button class="primary" type="primary" @click.native="back">结束测试</mt-button>
        <mt-button class="primary" type="primary" @click.native="goReview">查看错题</mt-button>
        <mt-button class="primary" type="primary" @click.native="goExam">重新答题</mt-button>
      </div>
      <div class="reward has_review_btn"
           v-if="parseInt(result.highscore) >= 60 && parseInt(result.highscore) < 100">
        <span class="thanks">您本月的测试已完成！如需重测，可点击“重新答题”再次进入测试界面。</span>
        <mt-button class="primary" type="primary" @click.native="back">结束测试</mt-button>
        <mt-button class="primary" type="primary" @click.native="goReview">查看错题</mt-button>
        <mt-button class="primary" type="primary" @click.native="goExam">重新答题</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {Button, Toast} from 'mint-ui';
  import Vue from 'vue';
  import {mapState} from 'vuex';
  import {GetUserRaceInfo, UpdateExamReward, UpdateRewardPhone} from '../service/getData';

  Vue.component(Button.name, Button);
  export default {
    data() {
      return {
        examId: 0,
        examPaperId: 0,
        mobileNum: '',
        result: {},
        reg: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      };
    },
    computed: {
      ...mapState(['userInfo'])
    },
    created() {
      this.examId = this.$route.query.examId;
      this.examPaperId = this.$route.query.examPaperId;
    },
    mounted() {
      this.getUserRaceInfo();
    },
    methods: {
      async getUserRaceInfo() {
        let data = await GetUserRaceInfo({
          UserID: this.userInfo.UserID,
          examId: this.examId,
          examPaperId: this.examPaperId
        });
        console.log(data)
        this.result = data.ExamInfoList[0];
      },
      back() {
        this.$router.push({path: '/raceHistory', query: {examId: this.result.ExamID}});
      },
      goReview() {
        this.$router.push({path: '/examReview', query: {examId: this.result.ExamID, examPaperId: this.examPaperId}});
      },
      goExam() {
        this.$router.push({path: '/exam', query: {id: this.result.ExamID}});
      },
      oneMore() {
        this.$router.push({path: 'exam', query: {id: this.result.examId}});
      },
      updateExamReward(reward) {
        if (this.result.userMobileNum && !this.mobileNum) {
          if (reward == 2) {
            this.submitData(this.result.userMobileNum);
          } else {
            this.reviseData(this.result.userMobileNum);
          }
        } else if (this.result.userMobileNum && this.mobileNum) {
          if (this.reg.test(this.mobileNum)) {
            if (reward == 2) {
              this.submitData(this.mobileNum);
            } else {
              this.reviseData(this.mobileNum);
            }
          } else {
            Toast({message: '手机号格式错误', position: 'bottom'});
          }
        }
      },
      updateExamReward2() {
        if (this.mobileNum) {
          if (this.reg.test(this.mobileNum)) {
            this.submitData(this.mobileNum);
          } else {
            Toast({message: '手机号格式错误', position: 'bottom'});
          }
        } else {
          Toast({message: '手机号不能为空', position: 'bottom'});
        }
      },
      async submitData(mobileNum) {
        let data = await UpdateExamReward({
          UserID: this.userInfo.UserID,
          examId: this.examId,
          mobileNum,
          examPaperID: this.examPaperId
        });
        Toast({message: data.result, position: 'bottom'});
        this.back();
      },
      async reviseData(mobileNum) {
        let data = await UpdateRewardPhone({
          UserID: this.userInfo.UserID,
          examId: this.examId,
          mobileNum,
          examPaperID: this.examPaperId
        });
        Toast({message: data.result, position: 'bottom'});
        this.back();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .exam_result {
    background: url(../assets/exam-result.png) no-repeat center 1.22667rem;
    background-size: 10rem 100vh;

    .result_top {
      // background-color: $fill-base;
      margin-top: 8.6rem;
      height: toRem(64px);
      text-align: center;

      .result_icon {
        padding: toRem(120px) 0 toRem(50px) 0;
        font-size: 16px;

        span {
          margin-left: toRem(20px);
        }
      }

      .get_score {
        @include ht-lineHt(60px);
        font-size: 16px;
        font-weight: 600;

        span {
          color: #E93627;
        }
      }
    }

    .result_body {
      background-color: $fill-base;
      font-size: 15px;
      margin-top: toRem(20px);
      padding: 0 toRem(30px);

      p {
        @include ht-lineHt(82px);
        border-top: 1px solid $border-color-light;
      }

      .pull-right {
        color: $color-text-secondary;
      }
    }

    .result_footer {
      margin-top: toRem(82px);
      @extend %clearFix;
      text-align: center;

      .reward {
        .mint-button--primary {
          color: #fff;
          background-color: #E93627;
          padding: 0 1rem;
          margin-top: 1rem;
          margin-left: 0.6rem;
          margin-right: 0.6rem;
        }

        &.has_review_btn {
          .mint-button--primary {
            padding: 0 0.5rem;
            margin-left: 0.3rem;
            margin-right: 0.3rem;
          }
        }

        .thanks {
          font-size: 16px;
          color: #3a7fb6;
          font-weight: 800;
          text-indent: 32px;
          text-align: left;
          padding: 0 0.2rem;
          display: block;
        }

        p {
          margin: 0 0.4rem;
          line-height: 0.8rem;
          text-align: left;
          font-size: 0.44rem;
          color: #3a7fb6;
          font-weight: 600;
          font-size: 16px;
          text-indent: 32px;

          input {
            margin-left: 0.2rem;
            width: 4.8rem;
            text-indent: 0.2rem;
            border: 1px solid #ddd;
            border-radius: 6px;
          }
        }
      }

      .back {
        //@extend %pull-left;
        @include wh(300px, 80px);
        @include borderRadius(20px);
        /*margin-left: toRem(40px);*/
      }

      .oneMore {
        @extend %pull-right;
        @include wh(300px, 80px);
        @include borderRadius(20px);
        margin-right: toRem(40px);
      }
    }

    .webapp-smile {
      color: $brand-success;
    }

    .webapp-cry {
      color: $brand-error;
    }
  }
</style>
