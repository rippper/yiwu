<template>
  <div class="exam container_both">
    <!--头部-->
    <header-fix :title="examTitle" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <!--<router-link slot="right" to="/examSearch"><i class="webapp webapp-search"></i></router-link>-->
    </header-fix>
    <!-- <div class="exam_header">
      <i class="webapp webapp-time" style="color: #00aeff"></i>
      <span>倒计时：{{timeLimit}}</span>
      <span v-else>倒计时：不限时</span>
    </div> -->
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
            <span class="red" v-if="examType != 'heart'">({{Math.round(Number(list.ThemeScore))}}分)</span>
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
        <div v-show="examId == 2074 || examId == 2452">
          <h4>测试须知</h4>
          <p>您好！</p>
          <p>欢迎您参加焦虑自评量表测试！</p>
          <p>焦虑症是在无明显原因下发生发作性紧张、莫名恐惧与不安，常伴有自主神经系统功能的异常，是一种较常见的情绪障碍。此表是咨询门诊中了解焦虑症状的常用量表，让你了解自己的焦虑程度。</p>
          <p>请根据您最近一周的实际情况，选择对应的选项。</p>
        </div>
        <div v-show="examId == 2076 || examId == 2454">
          <h4>测试须知</h4>
          <p>您好！</p>
          <p>欢迎您参加症状自评量表测试(SCL-90)！</p>
          <p>此表为当前使用最为广泛的精神障碍和心理疾病门诊检查量表，它对有心理症状的人有良好的区分能力，将协助您从十个方面来了解自己的心理健康程度。</p>
          <p>请根据最近一星期的状况进行填写，适用16岁以上的用户。</p>
        </div>
        <div v-show="examId == 2077 || examId == 2455">
          <h4>测试须知</h4>
          <p>您好！</p>
          <p>欢迎您参加匹兹堡睡眠质量指数测试!</p>
          <p>睡眠对人类来说必不可少。不合格的睡眠质量，将影响个体的认知和情绪。该量表适用于睡眠障碍患者、精神障碍患者评价睡眠质量，同时也适用于一般人睡眠质量的评估。</p>
          <p>快来测测你的睡眠质量吧！</p>
        </div>
        <div v-show="examId == 2075 || examId == 2453">
          <h4>测试须知</h4>
          <p>您好！</p>
          <p>欢迎您参加抑郁自评量表测试！</p>
          <p>抑郁自评量表是一种测量抑郁的工具，适用于具有抑郁症状的成年人，可以评定抑郁症状的轻重程度及其在治疗中的变化，特别适用于发现抑郁症病人。</p>
          <p>请选择一处安静的环境，结合您最近两周的情形，选择最符合情况的选项。</p>
        </div>
        <!-- <p>5.未尽事宜如需咨询，可联系服务热线0571-28990788-8006。</p> -->
        <br>
        <div class="btn-group">
          <mt-button type="primary" size="small" @click="agreeToExam" v-text="examType == 'heart' ? '在线测评' : '开始答题'"></mt-button>
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
import { GetExamAPI2, UpdateUserExamAPI2, GetExamTest, UpdateUserExam_YY, UpdateUserExam_Sleep } from "../service/getData";
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
      // startDate: "", //考试开始时间
      examType: this.$route.query.type, // normal: 普通考试; heart: 心理考试;
      typeWay: this.$route.query.typeWay
    };
  },
  created() {
    this.examId = this.$route.query.id;
    this.reward = this.$route.query.Reward;
    this.rewardInfo = this.$route.query.rewardInfo;
  },
  mounted() {
    this.getExam()
    if (this.examType != 'heart') {
      this.agreeToExam()
    }
  },
  props: [],
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    agreeToExam() {
      // this.startDate = new Date();
      this.popupVisible = false;
      // this.countDown();
    },
    disagree() {
      if (this.examType == 'heart') {
        this.$router.push({ path: 'examHeartList' })
      } else if (this.examType == 'normal') {
        this.$router.push({ path: '/examCenter' })
      }
    },
    async getExam() {
      let data = ''
      if (this.examType === 'normal' || this.examType === 'course') {
        data = await GetExamAPI2({ examId: this.examId });
      } else if (this.examType === 'heart') {
        data = await GetExamTest({ examId: this.examId })
      }
      this.exam = [];
      console.log(data)
      if (typeof data === "string") {
        Toast({ message: "服务器异常，请刷新页面", position: "bottom" });
        return;
      }
      if (Array.isArray(data.ThemeString)) {
        this.exam = data.ThemeString;
      }
      if (this.examId == '2077' || this.examId == '2455') {
        let arr = [
          {
            ThemeID: "",
            ThemeTitle: "近1个月，晚上上床睡觉通常 ____点钟。（请填写19-24,1-3阿拉伯整数数字）",
            ThemeType: 4,
            ThemeScore: "0"
          },
          {
            ThemeID: "",
            ThemeTitle: "近1个月，从上床到入睡通常需要____分钟。（请填写阿拉伯整数数字）",
            ThemeType: 4,
            ThemeScore: "0"
          },
          {
            ThemeID: "",
            ThemeTitle: "近1个月，通常早上____点起床。（请填写4-12阿拉伯整数数字）",
            ThemeType: 4,
            ThemeScore: "0"
          },
          {
            ThemeID: "",
            ThemeTitle: "近1个月，每夜通常实际睡眠_____小时。（请填写阿拉伯整数数字）",
            ThemeType: 4,
            ThemeScore: "0"
          }
        ]
        this.exam = [...arr, ...this.exam]
        this.allItem = parseInt(data.totalCount) + 4;
        this.itemData = this.exam[0]
      } else {
        this.allItem = data.totalCount;
        this.itemData = data.ThemeString[0];
      }
      this.examTitle = data.ExamTitle;
      //this.timeLimit = data.Time_Limit * 60
      
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
      if ((this.examId == '2077' || this.examId == '2455') && this.itemNum < 5) {
        let str = /^\d+$/;
        if (!str.test(this.choosedItem[this.itemNum - 1].Content)) {
          Toast({ message: "请根据题意填写正确的格式", position: "bottom", duration: 1500 });
          return
        }
      }
      if ((this.examId == '2077' || this.examId == '2455') && this.itemNum == 1) {
        if (this.choosedItem[this.itemNum - 1].Content > 24 || this.choosedItem[this.itemNum - 1].Content < 1) {
          Toast({ message: "请根据题意填写正确的格式", position: "bottom", duration: 1500 });
          return
        }
        if (this.choosedItem[this.itemNum - 1].Content < 19 && this.choosedItem[this.itemNum - 1].Content > 3) {
          Toast({ message: "请根据题意填写正确的格式", position: "bottom", duration: 1500 });
          return
        }
      } else if ((this.examId == '2077' || this.examId == '2455') && this.itemNum == 3) {
        if (this.choosedItem[this.itemNum - 1].Content > 12 || this.choosedItem[this.itemNum - 1].Content < 4) {
          Toast({ message: "请根据题意填写正确的格式", position: "bottom", duration: 1500 });
          return
        }
      }
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
      Toast({ message: "输入答案或选择选项", position: "bottom", duration: 1500 });
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
      let data = ''
      let strData = ''
      let inputs = [] // 睡眠测试前四题答案
      let params = t.changeSendData(t.choosedItem);
      if (this.examId == '2077' || this.examId == '2455') {
        let fillBlanks = params.slice(0,4)
        let params2 = params.slice(4,18)
        
        fillBlanks.forEach(item => {
            inputs.push(item.Content)
        })
        inputs = inputs.join(",")
        strData = params2.reduce((str, item, index) => {
            if (Array.isArray(item.Answer)) {
              item.Answer = item.Answer.sort().join("");
            }
            str += `${index > 0 ? "♂" : ""}${item.QuestionId}△${item.Answer}`;
            return str;
        }, "");
      } else {
        strData = params.reduce((str, item, index) => {
            if (Array.isArray(item.Answer)) {
              item.Answer = item.Answer.sort().join("");
            }
            str += `${index > 0 ? "♂" : ""}${item.QuestionId}△${item.Answer}`;
            return str;
        }, "");
      }
      
      if (this.examType === 'heart') {
        if (this.examId === '2077' || this.examId == '2455') {
          let msg = {
            Date: new Date(),
            examId: t.examId,
            UserID: this.userInfo.UserID,
            Data1: inputs,
            Data: strData
          }
          console.log(msg)
          data = await UpdateUserExam_Sleep(msg)
        } else {
          data = await UpdateUserExam_YY({
            Date: new Date(),
            examId: t.examId,
            UserID: this.userInfo.UserID,
            Data: strData
          })
        }
      } else {
        data = await UpdateUserExamAPI2({
          Date: new Date(),
          examId: t.examId,
          UserID: this.userInfo.UserID,
          Data: strData
        });
      }

      // let endDate = new Date()
      // let usedTime = endDate - t.startDate
      // let queryData = {...data, TotalCount: this.allItem, ...{usedTime}, ...{examId: t.examId}}
      if (data) {
        if (this.examType == 'normal' || this.examType == 'course') {
          t.$router.push({
            path: "/examResult",
            query: { examPaperId: data.examPaperID, examId: t.examId, typeWay: this.typeWay }
          });
        } else if (this.examType == 'heart') {
          t.$router.push({
            path: '/examHeartResult',
            query: { result: JSON.stringify(data), examId: t.examId, examType: 'heart' }
          })
        }
      }
      /*} else if (data.Type != 401) {
          MessageBox('警告', data.Message)
        }*/
    },
    //提交考试
    submitExam() {
      MessageBox.alert("确定提交?").then(() => {
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
      // clearInterval(this.limitTimer);
      // this.timeLimit = 120;
      // this.countDown();
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
        font-size: toRem(37px);
        color: $brand-primary;
      }
    }

    .topic_name {
      line-height: toRem(50px);
      font-size: toRem(37px);
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
        margin-bottom: 0.8rem;
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
        text-indent: 0.7rem;
      }

      .group,
      .date {
        text-align: right;
      }

      .date {
        margin-right: 2rem;
      }

      .btn-group {
        margin-top: 6rem;
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
