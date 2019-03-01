<template>
  <div class="exam container_both">
    <!--头部-->
    <header-fix :title="examTitle" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <!--<router-link slot="right" to="/examSearch"><i class="webapp webapp-search"></i></router-link>-->
    </header-fix>
    <div class="exam_header">
      <i class="webapp webapp-time" style="color: #00aeff"></i>
      <span>倒计时：{{timeLimit | formatTime}}</span>
      <!-- <span v-else>倒计时：不限时</span> -->
    </div>
    <div class="exam_content" v-for="(list,index) in exam" :key="index">
      <transition name="slide-left">
        <div v-if="itemNum == index + 1">
          <p class="exam_name">
            <span class="red" v-if="list.ThemeType==0">【判断题】</span>
            <span class="red" v-else-if="list.ThemeType==1">【单选题】</span>
            <span class="red" v-else-if="list.ThemeType==2">【多选题】</span>
            <span class="red" v-else-if="list.ThemeType==4">【简答题】</span>
            <span class="red" v-else>【其它】</span>
            <span class="topic_name">{{index + 1 + '.' + list.ThemeTitle}}</span>
            <span class="red">({{Math.round(Number(list.ThemeScore))}}分)</span>
          </p>
          <div class="exam_list">
            <div v-if="list.ThemeType == 0">
              <mb-radio :options="judgeItem" v-model="choosedItem[index]['Answer']"></mb-radio>
            </div>
            <div v-else-if="list.ThemeType == 1">
              <mb-radio :options="list.ItemString" v-model="choosedItem[index]['Answer']"></mb-radio>
            </div>
            <div v-else-if="list.ThemeType == 2">
              <mb-checklist :options="list.ItemString" v-model="choosedItem[index]['Answer']"></mb-checklist>
            </div>
            <div v-else-if="list.ThemeType == 4">
              <textarea
                class="answerInput"
                v-model="choosedItem[index]['Content']"
                rows="15"
                placeholder="在此处输入答案内容"
              ></textarea>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="exam_footer">
      <!-- <mt-button class="prev" type="primary" plain @click.native='preItem'>上一题</mt-button> -->
      <span class="itemNum">
        <span>试题</span>
        （{{itemNum}}/{{allItem}}）
      </span>
      <mt-button v-if="itemNum<allItem" type="primary" class="next" @click.native="nextItem">下一题</mt-button>
      <mt-button v-else type="primary" class="next" @click.native="submitExam">提交</mt-button>
    </div>
    <mt-popup
      class="rule_popup"
      v-model="popupVisible"
      popup-transition="popup-fade"
      closeOnClickModal="false"
    >
      <div class="rule_modal">
        <h4>测试须知</h4>
        <p>您好！</p>
        <p>欢迎您参加太仓市领导干部政治理论应知应会知识测试！</p>
        <p class="title">一、测试试题</p>
        <p>1.测试试题由单选题、多选题、判断题三种题型组成。</p>
        <p>2.每套试卷由系统随机选题后自动生成，共设置10题，每题10分，满分100分，合格分60分。</p>
        <p>3. 内容主要为习近平新时代中国特色社会主义思想和党的十九大精神、治国理政重要论述、党建工作基本知识、省情市情等领导干部应知应会的知识要点。</p>
        <p class="title">二、测试规则</p>
        <p>1.使用账号名登录 “干部在线学习中心”手机端即能参加在线测试，每人每月必须参加一次在线测试并达到合格分。</p>
        <p>2.试卷生成后，点击“开始答题”即开始计时计分，每题答题时间为两分钟，时间到则自动进入下一题。</p>
        <p>3.答题完毕后，即刻生成测试成绩。</p>
        <p>4.单次测试成绩未达60分的，需再次进入测试页面重新答题，系统将记录单次最高得分。
          <!--当月未参加测试的，将无法点击在线课程的学习。-->
        </p>
        <!-- <p>5.未尽事宜如需咨询，可联系服务热线0571-28990788-8006。</p> -->
        <br>
        <!--<p class="group">苏州市干部教育工作领导小组办公室</p>-->
        <div class="btn-group">
          <mt-button type="primary" size="small" @click="agreeToExam">开始答题</mt-button>
        </div>
        <mt-button class="go-back" type="default" size="small" @click="disagree">返回</mt-button>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { Button, MessageBox, Popup, Toast } from "mint-ui";
import Vue from "vue";
import { mapState } from "vuex";
import { GetExamAPI2, UpdateUserExamAPI2 } from "../service/getData";
import { goBack } from "../service/mixins";

Vue.component(Button.name, Button);
Vue.component(Popup.name, Popup);
export default {
  mixins: [goBack],
  data() {
    return {
      popupVisible: true,
      clickCloseModal: false,
      exam: [],
      examTitle: "", //标题
      examId: "",
      timeLimit: 120, //每题倒计时时间30s
      reward: "",
      itemData: null, //当前显示题目data
      judgeItem: [
        {
          ThemeItemFlag: "A",
          ThemeItemTitle: "正确"
        },
        {
          ThemeItemFlag: "B",
          ThemeItemTitle: "错误"
        }
      ], //单选item
      itemNum: 1, //第几题
      allItem: 0,
      choosedItem: [],
      startDate: "" //考试开始时间
    };
  },
  created() {
    this.examId = this.$route.query.id;
    this.reward = this.$route.query.Reward;
    this.rewardInfo = this.$route.query.rewardInfo;
  },
  mounted() {
    this.getExam();
  },
  props: [],
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    agreeToExam() {
      this.startDate = new Date();
      this.popupVisible = false;
      this.countDown();
    },
    disagree() {
      this.$router.go(-1);
    },
    async getExam() {
      let data = await GetExamAPI2({ examId: this.examId });
      this.exam = [];
      if (typeof data === "string") {
        Toast({ message: "服务器异常，请刷新页面", position: "bottom" });
        return;
      }
      if (Array.isArray(data.ThemeString)) {
        this.exam = data.ThemeString;
      }
      this.examTitle = data.ExamTitle;
      //this.timeLimit = data.Time_Limit * 60
      this.allItem = data.totalCount;
      this.itemData = data.ThemeString[0];
      //初始化choosedItem
      this.initChoosedItem(this.exam);
    },
    //初始化choosedItem
    initChoosedItem(arr) {
      if (arr instanceof Array && arr.length > 0) {
        arr.forEach((item, index) => {
          let themeID = item.ThemeID;
          let examType = item.ThemeType;
          if (examType == 2) {
            //多选model类型为数组
            this.choosedItem.push({
              Answer: [],
              examType,
              ExamId: this.examId,
              QuestionId: themeID,
              Content: ""
            });
          } else {
            //单选、判断 问答题
            this.choosedItem.push({
              Answer: "",
              examType,
              ExamId: this.examId,
              QuestionId: themeID,
              Content: ""
            });
          }
        });
      }
    },
    //点击下一题
    nextItem() {
      if (this.itemData.ThemeType == 0 || this.itemData.ThemeType == 1) {
        let Answer = this.choosedItem[this.itemNum - 1].Answer;
        if (typeof Answer === "string" && Answer) {
          this.itemNum++;
          return;
        }
      } else if (this.itemData.ThemeType == 2) {
        let Answer = this.choosedItem[this.itemNum - 1].Answer;
        if (Answer instanceof Array && Answer.length > 0) {
          this.itemNum++;
          return;
        }
      } else if (this.itemData.ThemeType == 4) {
        let Content = this.choosedItem[this.itemNum - 1].Content;
        if (typeof Content === "string" && Content) {
          this.itemNum++;
          return;
        }
      }
      Toast({ message: "请选择选项", position: "bottom", duration: 1500 });
    },
    //时间到跳下一题
    goToNextItem() {
      if (this.itemData.ThemeType == 0 || this.itemData.ThemeType == 1) {
        this.choosedItem[this.itemNum - 1].Answer = "N";
        this.itemNum++;
      } else if (this.itemData.ThemeType == 2) {
        this.choosedItem[this.itemNum - 1].Answer = ["N"];
        this.itemNum++;
      } else if (this.itemData.ThemeType == 4) {
        this.choosedItem[this.itemNum - 1].Content = "N";
        this.itemNum++;
      }
    },
    //点击上一题
    // preItem () {
    //   if (this.itemNum > 1) {
    //     this.itemNum--
    //   } else {
    //     this.itemNum = 1
    //   }
    // },
    async upDateExam() {
      let t = this;
      let params = t.changeSendData(t.choosedItem);
      let strData = params.reduce((str, item, index) => {
        if (Array.isArray(item.Answer)) {
          item.Answer = item.Answer.sort().join("");
        }
        str += `${index > 0 ? "♂" : ""}${item.QuestionId}△${item.Answer}`;
        return str;
      }, "");
      let data = await UpdateUserExamAPI2({
        Date: new Date(),
        examId: t.examId,
        UserID: this.userInfo.UserID,
        Data: strData
      });

      // let endDate = new Date()
      // let usedTime = endDate - t.startDate
      // let queryData = {...data, TotalCount: this.allItem, ...{usedTime}, ...{examId: t.examId}}
      if (data) {
        t.$router.push({
          path: "/examResult",
          query: { examPaperId: data.examPaperID, examId: t.examId }
        });
      }
      /*} else if (data.Type != 401) {
          MessageBox('警告', data.Message)
        }*/
    },
    //提交考试
    submitExam() {
      MessageBox.alert("确定提交试卷?").then(() => {
        this.upDateExam();
      });
    },
    /*提交数据*/
    changeSendData(data) {
      if (data instanceof Array && data.length > 0) {
        let orgData = data;
        orgData.forEach((item, index) => {
          if (item.examType == 3) {
            delete item["examType"];
            item.Answer = item.Answer.sort().join("");
          } else {
            delete item["examType"];
          }
        });
        return orgData;
      }
    },
    countDown() {
      let time = parseInt(this.timeLimit);
      this.limitTimer = setInterval(() => {
        time -= 1;
        this.timeLimit = time;
        if (time <= 0) {
          //clearInterval(this.limitTimer)
          if (this.itemNum < this.allItem) {
            clearInterval(this.limitTimer);
            this.timeLimit = 120;
            this.countDown();
            this.goToNextItem();
          } else {
            clearInterval(this.limitTimer);
            Toast({
              message: "3秒后自动提交",
              position: "bottom",
              duration: 1500
            });
            setTimeout(() => {
              this.upDateExam();
            }, 3000);
          }
          // MessageBox.alert('考试时间已到').then(action => {
          //   this.upDateExam()
          // })
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.limitTimer);
  },
  watch: {
    itemNum: function(val) {
      this.itemData = this.exam[val - 1];
      clearInterval(this.limitTimer);
      this.timeLimit = 120;
      this.countDown();
    }
  },
  beforeRouteLeave(to, from, next) {
    MessageBox.close();
    next();
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../style/mixin";

.exam {
  background: url(../assets/exam-bg.png) no-repeat center;
  background-size: 100% 99vh;
  font-size: 15px;

  .exam_header {
    padding: 0 toRem(30px);
    border-bottom: 1px solid $border-color-base;
    text-align: center;
    line-height: toRem(62px);

    img {
      width: toRem(29px);
    }
  }

  .exam_content {
    position: absolute;
    left: 0;
    right: 0;
    padding: 0 toRem(40px) toRem(105px) toRem(40px);

    .exam_name {
      padding: toRem(30px) 0 toRem(100px) 0;

      .red {
        color: $brand-primary;
      }
    }

    .topic_name {
      line-height: toRem(50px);
    }

    .exam_list {
      .answerInput {
        width: 100%;
        padding: toRem(10px);
        resize: none;
        border: 1px solid $border-color-base;
        @include borderRadius(10px);
        font-size: 14px;
      }
    }
  }

  .exam_footer {
    position: fixed;
    width: 100%;
    bottom: toRem(20px);
    text-align: center;
    left: 0;
    /*line-height: 73px;*/
    .mint-button {
      @include wh(150px, 73px);
      padding: 0;
    }

    .prev {
      margin-left: toRem(30px);
    }

    .itemNum {
      display: inline-block;
      width: toRem(350px);
      line-height: toRem(73px);
      margin-left: 2rem;

      span {
        color: $color-text-secondary;
        font-size: 14px;
      }
    }

    .next {
      margin-right: toRem(30px);
    }
  }

  .rule_popup {
    @include borderRadius(10px);
    box-shadow: 0 0 toRem(30px) 4px #545454;

    .rule_modal {
      position: relative;
      width: 9.8rem;
      height: 99vh;
      padding: toRem(20px);
      background: url(../assets/rule-bg.png) no-repeat center;
      background-size: 9.8rem 99vh;
      // padding-bottom: toRem(120px);
      overflow-y: scroll;

      h4 {
        text-align: center;
        color: #e93627;
        font-weight: 600;
      }

      .title {
        color: #e93627;
      }

      h2 {
        font-size: toRem(40px);
        text-align: center;
        line-height: toRem(60px);
      }

      p {
        line-height: toRem(36px);
        font-size: 0.36rem;
      }

      .group,
      .date {
        text-align: right;
      }

      .date {
        margin-right: 2rem;
      }

      .btn-group {
        margin-top: 0.8rem;
        // background: #FFF;
        // padding-bottom: toRem(20px);
        width: 100%;
        @include flex(space-around);

        .mint-button--primary {
          background: #e71c05;
          padding: 0 0.6rem;
        }
      }

      .go-back {
        position: absolute;
        bottom: toRem(20px);
        right: toRem(20px);
      }

      // .btn-group{
      //   position: fixed;
      //   background: #FFF;
      //   padding-bottom: toRem(20px);
      //   bottom: 0;
      //   left: 0;
      //   width: 100%;
      //   @include flex(space-around);
      // }
    }
  }
}
</style>
