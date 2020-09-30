/**
* Mp4播放页
*/
<template>
  <div class="play_Mp4 container_top">
    <!--头部-->
    <header-fix :title="courseInfo.Course_Name" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="player">
      <video
        v-if="playType == 'mp4'"
        id="myPlayer"
        preload="auto"
        :src="courseInfo.ONLINE_URL"
        controls
        style="object-fit:fill;"
        webkit-playsinline="true"
        playsinline="true"
        x5-playsinline="true"
        x-webkit-airplay="true"
      ></video>
      <!-- <audio v-if="playType == 'mp3'" id="myPlayer" :src="courseInfo.ONLINE_URL" controls></audio> -->
      <!--<video v-else id="myVideo" preload="meta" :src="courseDetails.OnlineUrl" controls></video>-->
    </div>
    <!-- <div class="toggle_play">
      <mt-button :type="playType == 'mp4'?'primary':'default'" size="small" @click="togglePlayer('mp4')">播放MP4</mt-button>
      <mt-button :type="playType == 'mp3'?'primary':'default'" size="small" @click="togglePlayer('mp3')">播放MP3</mt-button>
    </div> -->
    <div class="error_alert" v-show="progressStack.length > 0">
      <span>提交进度失败，请手动提交</span>
      <mt-button class="upload_btn" type="default" size="small" @click.native="uploadProgress">提交进度</mt-button>
    </div>
    <div class="course_detail">
      <mt-navbar v-model="selected">
        <mt-tab-item id="introduce">介绍</mt-tab-item>
        <!--<mt-tab-item id="relatedCourse">相关课程</mt-tab-item>-->
        <!--<mt-tab-item id="notes">学习笔记</mt-tab-item>-->
        <mt-tab-item id="evaluate">评价</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="introduce">
          <course-introduce :course-details="courseInfo"></course-introduce>
          <div class="course_examBtn">
            <div class="course_exambtn" @click="linkToExam">
              去考试
            </div>
          </div>
        </mt-tab-container-item>
        <!--<mt-tab-container-item id="relatedCourse">
          <section v-if="selected === 'relatedCourse'" v-infinite-scroll="getRelatedCourse"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-distance="10">
            <course-list :course-data="courseData" :no-data-bg="noDataBg" :no-data="noData"></course-list>
          </section>
        </mt-tab-container-item>
        <mt-tab-container-item id="notes">
          <course-notes :notes-data="notesData"></course-notes>
          <div class="add_notes_btn">
            <mt-button size="large" type="primary" @click.native="toggleNotes">
              <i class="webapp webapp-edit"></i>
              添加笔记
            </mt-button>
          </div>
        </mt-tab-container-item>-->
        <mt-tab-container-item id="evaluate">
          <course-comment :course-id="courseRealId" :comment-credit="courseDetails.CommentCredit" ref="courseComment" :course-details="courseInfo"></course-comment>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!--添加笔记-->
    <transition name="slide-left">
      <add-notes
        class="notes_container container_top"
        v-if="showAddNotes"
        :notes-data.sync="addNotesData"
      >
        <!--头部-->
        <header-fix slot="header" title="添加笔记" fixed>
          <span slot="left" @click="toggleNotes">取消</span>
          <span slot="right" @click="saveNotes">保存</span>
        </header-fix>
      </add-notes>
    </transition>
    <!--<div v-if="isOpen" class="open_app">
      <span>打开APP，可享课程下载服务</span><a id="btnOpenApp" class="openApp" href="javascript:void(0);">打开</a>
      <a class="close_tip" @click="isOpen = !isOpen">
        <i class="webapp webapp-close"></i>
      </a>
    </div>-->
    <!-- <bottom-bar></bottom-bar> -->
  </div>
</template>
<script>
import flvjs from "flvjs";
import {
  Indicator,
  MessageBox,
  Navbar,
  TabContainer,
  TabContainerItem,
  TabItem,
  Toast
} from "mint-ui";
import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import wx from "weixin-js-sdk";
import { getMac, getStore, setStore, timeFormat } from "../plugins/utils";
import {
  AddExperience,
  Auth,
  CheckLoginStatus,
  GetExperience,
  GetIsAllowLearn,
  GetIsDenyUser,
  getSyncUserStudyData,
  RelatedCourse,
  singleUploadTimeNode
} from "../service/getData";
import { goBack } from "../service/mixins";
// import { bottomBar } from '../components'

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
export default {
  mixins: [goBack],
  data() {
    return {
      isWeChat: false, //是否是微信
      isOpen: true,
      selected: "introduce",
      courseId: "", //课程id
      courseDetails: {
        //课程详情信息
        CourseName: "视频播放",
        OnlineUrl: "",
        CommentCredit: ""
      },
      readyState: 0, //视频是否准备就绪
      duration: 0, //视频时长
      browseScore: 0, //百分比进度
      myPlayer: null, //media对象
      flvPlayer: null, //flv.js player
      lastLocation: 0, //记录上次播放的位置
      progressTime: 0, //记录视频完成进度位置
      updateTimer: 0, //提交进度定时器
      /*相关课程*/
      courseData: [],
      loading: false,
      immediate: false,
      page: 1,
      noData: false,
      noDataBg: false,
      url: window.location.href,
      /*笔记*/
      notesData: [],
      showAddNotes: false, //是否显示添加笔记
      addNotesData: {
        title: "",
        content: ""
      },
      playType: "mp4",
      mediaType: "",
      checkTimer: "",
      listenTimer: "",
      progressStack: [],
      userInfo: "",
      courseRealId: '',
      examId: ''
    };
  },
  created() {
    if (getStore("userAgent").weixin) {
      this.isWeChat = true;
    } else if (getStore("userAgent").mobile) {
      this.isWeChat = false;
    }
    this.userInfo = getStore("userInfo");
    this.courseId = this.$route.query.id;
    console.log(this.courseInfo)
    this.netWorkType();
  },
  mounted() {
    /*初始化 打开APP*/
    this.isDenyUser();
    /* 获取media对象 */
    this.myPlayer = document.getElementById("myPlayer");
    try {
      this.mediaType = /\.(.*)$/.exec(this.courseInfo.ONLINE_URL)[1];
    } catch (error) {}
    /*获取课程详情*/
    this.GetIsAllowLearn();
  },
  computed: {
    ...mapState(["courseInfo"])
  },
  watch: {
    playType: function(val, oldVal) {
      // console.log(val, oldVal)
      var reg = new RegExp(oldVal, "ig");
      this.courseInfo.ONLINE_URL.replace(reg, val);
      // console.log(this.courseInfo.ONLINE_URL)
    }
  },
  methods: {
    ...mapMutations(["GET_NETWORKTYPE"]),
    ...mapActions(["saveCourseInfo"]),
    linkToExam () {
      if (parseInt(this.courseInfo.currentProgress) < 100) {
        Toast({
          message: '请先看完课程内容',
          position: 'bottom',
          duration: 5000
        })
      } else if (parseInt(this.courseInfo.currentProgress) == 100) {
        this.$router.push({ path: '/exam', query: { id: this.examId, type: 'course' } })
      }
    },
    togglePlayer(val) {
      this.playType = val;
    },
    // 判断能否看课程
    async GetIsAllowLearn() {
      let data = await GetIsAllowLearn({ UserID: this.userInfo.UserID });
      if (data.result === "false") {
        MessageBox.alert(`${data.resultMessage}`).then(action => {
          // this.goBack(
        });
      }
      this.getCourseDetail(this.playFunc);
      this.checkTimer = setInterval(() => {
        // this.checkLogin();
      }, 30000);
    },
    /*微信签名*/
    async getWechatWxAuthModel() {
      let data = await Auth({ Url: this.url });
      if (data.Type == 1) {
        wx.config({
          debug: false,
          appId: data.Data.appId, // 必填，公众号的唯一标识
          timestamp: data.Data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.Data.noncestr, // 必填，生成签名的随机串
          signature: data.Data.signature, // 必填，签名
          jsApiList: ["checkJsApi", "getNetworkType"] // 必填，需要使用的JS接口列表
        });
      }
    },
    /*获取网络环境*/
    netWorkType() {
      let t = this;
      wx.ready(function() {
        wx.getNetworkType({
          success: function(res) {
            var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
            t.GET_NETWORKTYPE(networkType);
            if (networkType !== "wifi") {
              Toast({
                message: "您正在使用2G/3G/4G网络，建议在WIFI环境观看",
                position: "middle"
              });
            }
          }
        });
      });
    },
    //相关课程
    async getRelatedCourse() {
      this.noData = false;
      this.noDataBg = false;
      this.loading = true;
      Indicator.open();
      let data = await RelatedCourse({
        CourseId: this.courseId,
        Page: this.page
      });
      console.log(data)
      Indicator.close();
      if (data.Type == 1) {
        let list = data.Data.List;
        if (list.length == 0 && this.page > 1) {
          this.noData = true;
          return;
        }
        if (list.length == 0 && this.page == 1) {
          this.noDataBg = true;
          return;
        }
        this.courseData = this.courseData.concat(list);
        this.loading = false;
        this.page += 1;
      }
    },
    //课程详情
    async getCourseDetail(cb) {
      console.log(this.userInfo.UserID);
      let data = await getSyncUserStudyData({
        UserID: this.userInfo.UserID,
        CourseNumber: this.courseInfo.Course_Number
      });
      this.examId = data.UserStudyInfoList[0].ExamId
      this.courseRealId = data.UserStudyInfoList[0].CourseId;
      this.lastLocation = data.UserStudyInfoList[0].LastLocation;
      console.log(this.lastLocation)
      this.browseScore = data.UserStudyInfoList[0].CurrentProgress;
      if (this.courseInfo.ONLINE_URL == "") {
        Toast({ message: "没有视频资源", position: "bottom" });
        return;
      }
      if (/\.flv$/.test(this.courseInfo.ONLINE_URL)) {
        /* flv格式视频处理 */
        if (flvjs.isSupported()) {
          this.flvPlayer = flvjs.createPlayer(
            {
              type: "flv",
              url: this.courseInfo.ONLINE_URL
            },
            { lazyLoad: false }
          );
          // eslint-disable-next-line
          this.flvPlayer.attachMediaElement(myPlayer);
          this.flvPlayer.load();
        }
      }
      cb && cb();
    },
    //提交进度
    async updateProgress() {
      let TimeNode = timeFormat(this.myPlayer.currentTime);
      let params = {
        UserID: this.userInfo.UserID,
        CourseNumber: this.courseInfo.Course_Number,
        TimeNode
      };
      let store = getStore("singleProgress") || {};
      try {
        if (!params.TimeNode) { // 检测本次视频不放进度如果没有 取消提交
          return false
        }
        let data = await singleUploadTimeNode(params);
        // let res = data.split(",");
        if (data.result) {
        } else {
          this.myPlayer.pause();
          this.progressStack.push(params);
          // console.log(params);
          // console.log(this.progressStack);
          store[this.courseId] = this.progressStack;
          setStore("singleProgress", store);
          MessageBox.confirm("进度提交失败，是否再次提交？").then(
            () => {
              this.uploadProgress();
            },
            () => {
              this.myPlayer.play();
              // this.$router.push({ path: '/courseCenter' })
            }
          );
        }
      } catch (e) {
        this.myPlayer.pause();
        this.progressStack.push(params);
        store[this.courseId] = this.progressStack;
        setStore("singleProgress", store);
        MessageBox.confirm("进度提交失败，是否再次提交？").then(
          () => {
            this.uploadProgress();
          },
          () => {
            this.myPlayer.play();
            // this.$router.push({ path: '/courseCenter' })
          }
        );
      }
    },
    // 手动提交进度
    async uploadProgress() {
      let store = getStore("singleProgress") || {};
      if (this.progressStack && this.progressStack.length >= 0) {
        for (let i = 0; i < this.progressStack.length; i++) {
          try {
            let params = this.progressStack[i];
            // console.log(params)
            if (!params.TimeNode) {
              this.progressStack.splice(i, 1);
              console.log(this.progressStack)
              continue;
            }
            let res = await singleUploadTimeNode(params);
            if (res == "ok") {
              this.progressStack.splice(i, 1);
            } else {
              this.myPlayer.pause();
              MessageBox.confirm("进度提交失败，是否再次提交？").then(
                () => {
                  this.uploadProgress();
                },
                () => {
                  this.myPlayer.play();
                  // this.$router.push({ path: '/courseCenter' })
                }
              );
            }
            if (i == this.progressStack.length - 1) {
              setStore('singleProgress', this.progressStack)
            }
          } catch (e) {
            this.myPlayer.pause();
            MessageBox.confirm("进度提交失败，是否再次提交？").then(
              () => {
                this.uploadProgress();
              },
              () => {
                this.myPlayer.play();
                // this.$router.push({ path: '/courseCenter' })
              }
            );
          }
        }
        store[this.courseId] = this.progressStack;
      }
    },
    /*播放方法*/
    playFunc() {
      if (this.mediaType == "flv") {
        this.flvPlayer.play().then(() => {
          this.listenPlay();
        });
      } else {
        this.myPlayer.load();
        this.listenPlay();
      }
    },
    /* 监听播放 */
    listenPlay() {
      let media = this.mediaType == "flv" ? this.flvPlayer : this.myPlayer;
      this.listenTimer = setInterval(() => {
        let readyState = this.myPlayer.readyState;
        this.readyState = readyState;
        if (readyState == 4) {
          /*准备好可以播放时清除定时器*/
          clearInterval(this.listenTimer);
          this.duration = media.duration.toFixed(2); //当前时间
          this.progressTime =
            media.duration * (parseFloat(this.browseScore) / 100);
          if (parseFloat(this.browseScore) < 100) {
            media.currentTime = this.lastLocation;
          }
          /*监听视频播放位置*/
          this.myPlayer.addEventListener("timeupdate", () => {
            let currentTime = media.currentTime;
            let currentProgress =
              ((media.currentTime / media.duration) * 100).toFixed(2) + "%";
            let courseInfo = { ...this.courseInfo, currentProgress };
            this.saveCourseInfo(courseInfo);
            if (currentTime > 0) {
              /*该视频未播放完成*/
              if (parseFloat(this.browseScore) < 100) {
                if (
                  currentTime > this.progressTime - 2 &&
                  currentTime < this.progressTime + 1
                ) {
                  //视频播放位置接近时候，视频完成进度位置前进
                  this.progressTime = currentTime;
                } else if (currentTime > this.progressTime + 2) {
                  //视频未播放区域 禁止拖拽
                  media.currentTime = this.progressTime;
                  Toast({ message: "未播放区域禁止拖拽", position: "bottom" });
                }
              } else {
                /*该视频播放完成*/
              }
            }
          });
          /*监听视频播放结束*/
          this.myPlayer.addEventListener("ended", () => {
            /*判断是否是拖拽到结束*/
            if (this.progressTime > this.duration - 2) {
              this.updateProgress();
              clearInterval(this.updateTimer);
            } else {
              media.play();
            }
          });
          this.updateTimer = setInterval(() => {
            this.updateProgress();
          }, 60000);
        }
      }, 100);
    },
    /*添加笔记提交*/
    async updateNotes(params) {
      let data = await AddExperience(params);
      if (data.Type === 1) {
        this.getExperience();
        this.addNotesData.content = "";
        this.addNotesData.title = "";
        Toast({ message: data.Message, position: "middle" });
      } else if (data.Type !== 401) {
        Toast({ message: data.Message, position: "middle" });
      }
    },
    /*显示、隐藏添加笔记*/
    toggleNotes() {
      this.showAddNotes = !this.showAddNotes;
    },
    /*获取课程笔记*/
    async getExperience() {
      let data = await GetExperience({ CourseId: this.courseId });
      if (data.Type == 1) {
        this.notesData = data.Data;
      }
    },
    /*保存笔记*/
    saveNotes() {
      let params = {
        CourseId: this.courseId,
        ExperienceContent: this.addNotesData.content.trim(),
        ExperienceTitle: this.addNotesData.title.trim()
      };
      if (!params.ExperienceTitle) {
        Toast({ message: "请输入标题", position: "middle" });
        return;
      }
      if (!params.ExperienceContent) {
        Toast({ message: "请输入内容", position: "middle" });
        return;
      }
      this.toggleNotes();
      this.updateNotes(params);
    },
    /*每30秒调用一次*/
    async checkLogin() {
      let Mac = getMac();
      try {
        let res = await CheckLoginStatus({ UserID: this.userInfo.UserID, Mac });
        if (res != 1) {
          clearInterval(this.checkTimer);
          this.updateProgress();
          clearInterval(this.updateTimer);
          this.$router.push({ path: "/login" });
        }
      } catch (e) {
        clearInterval(this.checkTimer);
        this.updateProgress();
        clearInterval(this.updateTimer);
        this.$router.push({ path: "/login" });
      }
    },
    async isDenyUser() {
      let res = await GetIsDenyUser({ UserID: this.userInfo.UserID });
      if (res.result == 1) {
        MessageBox.alert(res.message);
      }
    }
  },
  beforeDestroy() {
    this.updateProgress();
    clearInterval(this.updateTimer);
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.checkTimer);
    clearInterval(this.updateTimer);
    clearInterval(this.listenTimer);
    MessageBox.close();
    next();
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../style/mixin";

.play_Mp4 {
  .open_app {
    position: fixed;
    left: 0;
    bottom: 0;
    text-indent: 1rem;
    font-size: 14px;
    @include ht-lineHt(105px);
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    color: $color-text-reverse;

    .openApp {
      color: #fff;
      padding: toRem(15px) toRem(30px);
      background: $brand-primary;
      margin-left: 1rem;
      border-radius: toRem(12px);
    }

    .close_tip {
      font-size: 20px;
      position: absolute;
      right: toRem(10px);
      bottom: 0;
      top: toRem(10px);
      height: toRem(40px);
      line-height: toRem(40px);
    }
  }

  .player {
    /*padding-top: 0.2rem;*/
    width: 10rem;
    height: 5.8rem;
    margin: 0 auto;
    position: relative;
    background: #000;

    video {
      height: 100%;
      width: 100%;
      margin: 0 auto;
    }

    audio {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }

  .toggle_play {
    padding: toRem(20px);
    @include flex(space-around);

    .mint-button {
      width: 40%;
    }
  }

  .error_alert {
    background-color: #e93627;
    padding: toRem(10px);
    color: #fff;
    @include flex();
    align-items: center;

    & > span {
      margin-left: toRem(30px);
      font-size: 14px;
    }

    .upload_btn {
      margin-right: toRem(30px);
    }
  }

  .add_notes_btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    .mint-button--large {
      border-radius: 0;
    }
  }

  .notes_container {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
  }

  .course_notes {
    padding-bottom: toRem(100px);
  }
  .course_examBtn {
    height: toRem(100px);
    padding: 0 toRem(30px);
    display: flex;
    align-items: center;
    background: #fff;
    .course_exambtn{
      width: toRem(350px);
      height: toRem(70px);
      line-height: toRem(70px);
      border-radius: toRem(5px);
      text-align: center;
      background: $brand-primary;
      font-size: toRem(28px);
      color: #fff;
    }
  }
  .mint-navbar {
    border-bottom: 1px solid $border-color-base;

    .mint-tab-item {
      &.is-selected {
        border-bottom: none;
      }
    }
  }
}
</style>
