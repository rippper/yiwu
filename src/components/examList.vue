/**
* 考试列表
*/
<template>
  <div class="exam_list">
    <div class="exam_item" v-for="item in examData"
         :key="item.ExamID"
         @click="checkAttempt(item)"
    >
      <div>
        <div class="exam_img">
          <img src="../assets/exam_ico.png" alt="">
        </div>
        <div class="exam_desc">
          <div class="exam_name">{{item.ExamTitle}}</div>
          <!-- <div class="exam_date">考试截止时间：{{item.END_DATE | dateFilter('yyyy.MM.dd')}}</div> -->
          <!-- <div class="exam_num">
            <span class="exam_tip_num">及格线：{{Number(item.pass_score)}}分</span>
            <span class="highlight pull-right">{{item.Credit_hour}}学时</span>
          </div> -->
          <div class="bottom">
            <!-- <span class="exam_time">考试时间：{{item.Time_Limit}}分钟</span> -->
            <!-- <span class="pull-right" v-if="item.lattemptnumber=='0'">未考</span>
            <span class="pull-right"
                  v-if="Number(item.lattemptnumber)>0 && Number(item.highscore)>=Number(item.pass_score)">最好成绩：<span
              class="green">{{item.highscore}}</span></span>
            <span class="below pull-right"
                  v-else-if="Number(item.lattemptnumber)>0 && Number(item.highscore)<Number(item.pass_score)">不合格</span> -->
          </div>
        </div>
      </div>
      <mt-button size="small" @click.stop="linkToHistory(item.ExamID)">历史测试记录</mt-button>
      <!-- <mt-button size="small" v-if="item.Reward == 0" @click.stop="getReward(item)">已申请奖励</mt-button>
      <mt-button size="small" v-else-if="item.Reward == 1" @click.stop="showReward(item)">奖励已发</mt-button>
      <mt-button type="primary"
                 size="small"
                 v-else-if="item.Reward == 2"
                 @click.stop="getReward(item)">申请奖励</mt-button> -->
    </div>
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { MessageBox, Toast } from 'mint-ui'
  import { UpdateExamReward, CanExam } from "../service/getData";

  export default {
    data () {
      return {
        message: ''
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    props: {
      examData: Array,
      noDataBg: {
        type: Boolean,
        default: false
      },
      noData: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      async checkAttempt (item) {
        let id = item.ExamID
        //let data = await GetIsAllowExam({UserID: this.userInfo.UserID, examId: id})
        // let total = Number(item.ATTEMPT_LIMIT)
        // let current = Number(item.lattemptnumber)
        // let endTime = item.END_DATE
        // let dateEnd = +new Date(endTime)
        // let dateNow = +new Date()
        let msg = await CanExam({
          method: 'CanExam',
          ExamID: id,
          userid: this.userInfo.UserID
        })
        console.log(msg)
        if (msg.result === 'false') {
          MessageBox('提示', '课程未完成，请先完成课程。')
        } else {
          MessageBox.confirm(`是否进入测试`).then(action => {
            this.$router.push({path: '/exam', query: {id}})
          })
        }

          // if (dateNow < dateEnd) {
          //   if (current < total) {
          //     let count = total - current
          //     MessageBox.confirm(`当前考试剩余${count}次考试机会，是否继续考试`).then(action => {
          //       this.$router.push({path: '/exam', query: {id, Reward: item.Reward}})
          //     })
          //   } else {
          //     this.message = '考试次数已用完'
          //     Toast({message: this.message, position: 'bottom'})
          //   }
          // } else {
          //   this.message = '考试截止时间已过'
          //   Toast({message: this.message, position: 'bottom'})
          // }
      },
      async getReward (item) {
        let phoneNum = item.userMobileNum
        let rewardInfo = item.RewardInfo
        MessageBox.prompt(`<p>奖励：${rewardInfo}</p><p>请确认是否为该手机充值，如果不是，请修改手机号。</p>`,"提示",
          {inputValue: phoneNum, showInput: true, inputPlaceholder: "请输入手机号"})
          .then(async ({value, action}) => {
            phoneNum = value
            if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phoneNum)) {
              Toast({message: "手机号格式错误！", position: 'bottom'})
              return;
            }
            let data = await UpdateExamReward({
              UserID: this.userInfo.UserID,
              examId: item.ExamID,
              mobileNum: phoneNum
            })
            MessageBox({ title: "提示", message: data.result }).then(() => {
              this.$emit("refreshExamList")
            })
          })
      },
      showReward (item) {
        let phoneNum = item.userMobileNum
        let rewardInfo = item.RewardInfo
        MessageBox.alert(`<p>手机号：${phoneNum}</p><p>奖励：${rewardInfo}</p>`, "奖励信息")
      },
      linkToHistory (examId) {
        this.$router.push({path: '/raceHistory',query: {examId}})
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .exam_list {
    .exam_item {
      position: relative;
      background-color: $fill-base;
      padding: toRem(20px) toRem(30px) toRem(70px);
      border-bottom: 1px solid $border-color-base;
      @extend %clearFix;
      .mint-button{
        position: absolute;
        right: toRem(30px);
        bottom: toRem(20px);
      }
    }
    .exam_img {
      @extend %pull-left;
      width: toRem(90px);
      img {
        @include square(56px);
      }
    }
    .exam_desc {
      @extend %pull-left;
      width: toRem(590px);
    }
    .exam_name {
      @include ellipsis_two(2);
      font-size: 14px;
      font-weight: 500;
      color: $color-text-base;
    }
    .exam_date {
      color: $color-text-secondary;
      line-height: toRem(64px);
    }
    .exam_num {
      color: $color-text-secondary;
      line-height: toRem(44px);
    }
    .bottom {
      color: $color-text-thirdly;
      line-height: toRem(44px);
      font-size: 12px;
      margin-top: toRem(40px);
      .below {
        color: $brand-error;
      }
      .green {
        color: $brand-success;
      }
    }
  }
</style>
