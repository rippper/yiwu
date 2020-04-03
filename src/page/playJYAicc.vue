/**
* JYAicc播放页
*/
<template>
  <div class="play_Jyaicc container_top">
    <!--头部-->
    <header-fix :title="courseDetails.CourseName" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="player">
      <video v-show="playType == 'mp4'" id="myPlayermp4"
             preload="meta"
             poster="../assets/mp4-play.png"
             :src="activeNode.Mp4"
             controls
             style="object-fit:fill"
             x5-video-player-type="h5"
             webkit-playsinline="true"
             playsinline="true"
             x-webkit-airplay="true"
             x5-video-player-fullscreen="true"
             x5-video-orientation="portraint"
             autoplay="autoplay">
      </video>
      <audio v-show="playType == 'mp3'" id="myPlayermp3" :src="activeNode.Mp3" controls></audio>
    </div>
    <div class="toggle_play">
      <mt-button :type="playType == 'mp4'?'primary':'default'" size="small" @click="togglePlayer('mp4')">视频播放
      </mt-button>
      <mt-button :type="playType == 'mp3'?'primary':'default'" size="small" @click="togglePlayer('mp3')">音频播放
      </mt-button>
    </div>
    <div class="error_alert" v-show="progressStack.length > 0">
      <span>提交进度失败，请手动提交</span>
      <mt-button class="upload_btn" type="default" size="small" @click.native="uploadProgress">提交进度</mt-button>
    </div>
    <div class="course_detail">
      <mt-navbar v-model="selected">
        <mt-tab-item id="introduce">介绍</mt-tab-item>
        <mt-tab-item id="catalogue">目录</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="introduce">
          <course-introduce :course-details="courseInfo"></course-introduce>
        </mt-tab-container-item>
        <mt-tab-container-item id="catalogue">
          <ul class="course_menu">
            <li v-for="(item,index) in nodeList"
                :key="item.NodeID+index"
                :class="{'highlight':item.NodeId==activeNodeId}"
                @click.stop="otherNode(index, item)">
              <span class="title">{{item.Nodename}}</span>
              <p class="status">
                <span class="green" v-if="activeNodeIndex == index">正在播放</span>
                <span class="green" v-else-if="item.Status=='C'">已完成</span>
                <span v-else>未完成</span>
              </p>
            </li>
          </ul>
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
    <!-- <bottom-bar></bottom-bar> -->
  </div>
</template>
<script>
  import {Indicator, MessageBox, Navbar, TabContainer, TabContainerItem, TabItem, Toast} from 'mint-ui';
  import Vue from 'vue';
  import {mapActions, mapState} from 'vuex';
  import {formatDate, getMac, getStore, setStore} from '../plugins/utils';
  import {
    CheckLoginStatus,
    GetIsAllowLearn,
    GetIsDenyUser,
    getSyncUserStudyData,
    RelatedCourse
  } from '../service/getData';
  import {goBack} from '../service/mixins';
  // import { bottomBar } from '../components'

  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  export default {
    mixins: [goBack],
    data() {
      return {
        autoPlay: true, //是否自动播放
        selected: 'introduce', //被选择便签页id
        courseId: '', //课程id
        courseDetails: {//课程详情信息
          CourseName: '视频播放'
        },
        readyState: 0, //视频是否准备就绪
        nodeList: [], //节点数据
        nodeLength: 0, //节点数据
        duration: 0, //视频时长
        activeNodeIndex: '', //正在播放的索引
        activeNodeId: null, //正在播放的id
        activeNode: { //正在播放的节点数据
          NodeID: '',
          Mp4: '',
          Status: '',
          Time: 0
        },
        myPlayer: null, //video对象
        prevLocation: 0,//上一次播放位置
        locationTime: 0, //当前播放位置
        /*相关课程*/
        courseData: [],
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false,
        url: window.location.href,
        showAddNotes: false, //是否显示添加笔记
        addNotesData: {
          title: '',
          content: ''
        },
        uploadData: {},
        timer: '', //定时器
        playType: 'mp4',
        checkTimer: '', //检查登陆的定时器
        progressStack: []
      };
    },
    created() {
      this.courseId = this.$route.query.id;
      let store = getStore('jyaiccProgress') || {};
      this.progressStack = store[this.courseId] || [];
    },
    mounted() {
      this.isDenyUser();
      /*获取video对象*/
      this.myPlayer = document.getElementById('myPlayermp4');
      /*获取课程详情*/
      // document.addEventListener()
      this.GetIsAllowLearn();
    },
    computed: {
      ...mapState(['userInfo', 'courseInfo'])
    },
    methods: {
      ...mapActions(['saveCourseInfo']),
      togglePlayer(val) {
        this.updateProgress(this.activeNode.NodeID, this.locationTime, this.activeNode.Status);
        this.playType = val;
      },
      //相关课程
      async getRelatedCourse() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await RelatedCourse({CourseId: this.courseId, Page: this.page});
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
      async getCourseDetail() {
        let data = await getSyncUserStudyData({
          UserID: this.userInfo.UserID,
          CourseNumber: this.courseInfo.Course_Number
        });
        this.uploadData = data;
        this.nodeList = data.UserStudyInfoList[0].NodeList;
        this.nodeList.forEach((item, index) => {
          item.Mp3 = item.Mp4.replace(/(\/mp4\/|\.mp4$)/ig, (match, capture) => {
            if (match.indexOf('/') > -1) {
              return '/mp3/';
            }
            if (match.indexOf('.') > -1) {
              return '.mp3';
            }
          });
          // .replace('http://221.224.13.70:8012/', 'http://www.szgx.suzhou.gov.cn');
        });
        this.nodeLength = data.UserStudyInfoList[0].NodeList.length;
        this.activeNodeId = data.UserStudyInfoList[0].LastNodeID;
      },
      // 判断能否看课程
      async GetIsAllowLearn() {
        let data = await GetIsAllowLearn({UserID: this.userInfo.UserID});
        if (data.result === 'false') {
          MessageBox.alert(`${data.resultMessage}`).then(action => {
            // this.goBack();
          });
        }
        this.getCourseDetail();
        this.checkTimer = setInterval(() => {
          this.checkLogin();
        }, 30000);
      },
      //提交进度
      async updateProgress(NodeId, Time, Status) {
        Time = Math.ceil(Time);
        let obj = {...this.uploadData};
        let date = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
        let finishNum = 0;
        let nodeLength = this.nodeList.length;
        this.nodeList.forEach((item, index) => {
          finishNum += item.Status == 'C' ? 1 : 0;
        });
        let progress = ((finishNum / nodeLength) * 100).toFixed(2);
        let currentProgress = ((finishNum / nodeLength) * 100).toFixed(2) + '%';
        let courseInfo = {...this.courseInfo, currentProgress};
        this.saveCourseInfo(courseInfo);
        obj.UserStudyInfoList[0].CurrentProgress = progress;
        obj.UserStudyInfoList[0].LastLocation = Time;
        obj.UserStudyInfoList[0].LastNodeID = NodeId;
        console.log(Status);
        if (Status == '' || !Status) {
          Status = 'S';
        }
        this.activeNode = {...this.activeNode, Time, Status, Length: Math.ceil(this.duration), Date: date};
        this.nodeList[this.activeNodeIndex] = this.activeNode;
        obj.UserStudyInfoList[0].NodeList = [this.activeNode];
        let params = {
          UserID: this.userInfo.UserID,
          CourseNumber: this.courseId,
          data: JSON.stringify(obj)
        };
        let store = getStore('jyaiccProgress') || {};
        try {
          let data = await getSyncUserStudyData(params);
          if (data != 'ok') {
            this.myPlayer.pause();
            this.progressStack.push(params);
            store[this.courseId] = this.progressStack;
            setStore('jyaiccProgress', store);
            MessageBox.confirm('进度提交失败，是否再次提交？').then(() => {
              this.uploadProgress();
            }, () => {
              this.myPlayer.play();
              // this.$router.push({ path: '/courseCenter' })
            });
          }
        } catch (e) {
          this.myPlayer.pause();
          this.progressStack.push(params);
          store[this.courseId] = this.progressStack;
          setStore('jyaiccProgress', store);
          MessageBox.confirm('进度提交失败，是否再次提交？').then(() => {
            this.uploadProgress();
          }, () => {
            this.myPlayer.play();
            // this.$router.push({ path: '/courseCenter' })
          });
        }
      },
      // 手动提交进度
      async uploadProgress() {
        let store = getStore('jyaiccProgress') || {};
        if (this.progressStack && this.progressStack.length >= 0) {
          for (let i = 0; i < this.progressStack.length; i++) {
            let params = this.progressStack[i];
            try {
              let res = await getSyncUserStudyData(params);
              if (res == 'ok') {
                this.progressStack.splice(i, 1);
              } else {
                this.myPlayer.pause();
                MessageBox.confirm('进度提交失败，是否再次提交？').then(() => {
                  this.uploadProgress();
                }, () => {
                  this.myPlayer.play();
                  // this.$router.push({ path: '/courseCenter' })
                });
              }
            } catch (e) {
              this.myPlayer.pause();
              MessageBox.confirm('进度提交失败，是否再次提交？').then(() => {
                this.uploadProgress();
              }, () => {
                this.myPlayer.play();
                // this.$router.push({ path: '/courseCenter' })
              });
            }
          }
          store[this.courseId] = this.progressStack;
        }
      },
      /*播放方法*/
      playFunc() {
        this.myPlayer.load();
        this.myPlayer.addEventListener('error', () => {
          if (this.playType === 'mp4') {
            Toast({message: '资源加载失败, 请检查网络坏境', position: 'bottom'});
          } else {
            Toast({message: '资源出现问题, 请选择视频播放', position: 'bottom'});
          }
        });
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          let readyState = this.myPlayer.readyState;
          this.readyState = readyState;
          if (readyState == 4) {
            /*准备好可以播放时清除定时器*/
            clearInterval(this.timer);
            this.duration = this.myPlayer.duration;
            //当前时间
            this.myPlayer.currentTime = this.prevLocation;
            /*是否自动播放*/
            if (this.autoPlay) {
              this.myPlayer.play();
            } else {
              this.myPlayer.pause();
            }
            /*监听视频播放位置*/
            this.myPlayer.addEventListener('timeupdate', () => {
              let currentTime = this.myPlayer.currentTime;
              if (currentTime > 0) {
                /*视频播放完成，记录当前位置*/
                if (this.activeNode.Status == 'C') {
                  this.locationTime = currentTime;
                } else {
                  /*视频未播放完毕 禁止拖拽*/
                  if (currentTime > this.locationTime + 4 || currentTime < this.locationTime - 4) {
                    this.myPlayer.currentTime = this.locationTime;
                    this.myPlayer.play();
                    Toast({message: '未播放课程禁止拖拽', position: 'bottom'});
                  } else {
                    this.locationTime = currentTime;
                  }
                }
              }
            });
            /*监听视频播放结束*/
            this.myPlayer.addEventListener('ended', () => {
              /*判断是否是拖拽到结束*/
              if (this.locationTime > this.duration - 2) {
                this.activeNode.Status = 'C';
                this.updateProgress(this.activeNode.NodeID, Math.ceil(this.myPlayer.currentTime),
                  this.activeNode.Status);
                this.nextNode();
              } else {
                this.myPlayer.play();
              }
            });
          }
        }, 200);
      },
      /*播放其他章节*/
      playNode(index) {
        this.updateProgress(this.activeNode.NodeID, Math.ceil(this.locationTime), this.activeNode.Status);
        this.activeNodeIndex = index;
      },
      /*是否播放下一章节*/
      nextNode() {
        /*不是最后一个节点播放下一章节*/
        if (this.nodeLength != this.activeNodeIndex + 1) {
          try {
            this.autoPlay = true;
            let nextNodeIndex = this.activeNodeIndex + 1;
            this.playNode(nextNodeIndex);
          } catch (e) {
            Toast({message: '播放出错', position: 'bottom'});
            this.myPlayer.pause();
            this.autoPlay = false;
          }
        } else {
          for (let i = 0; i < this.nodeList.length; i++) {
            let item = this.nodeList[i];
            console.log(item.Status);
            if (item.Status == 'S' || !item.Status) {
              MessageBox.alert('您有未完成的章节，请到目录里确认');
              return;
            } else if (item.Status == 'C') {
              if (i === this.nodeList.length - 1) {
                MessageBox({
                  message: '本课已完成！谢谢观看！',
                  showCancelButton: true,
                  confirmButtonText: '退出课程',
                  cancelButtonText: '关闭弹窗'
                }).then((e) => {
                  if (e == 'confirm') {
                    this.$router.push({path: '/courseCenter'});
                  }
                });
              }
            }
          }
        }
      },
      /*点击节点播放其他章节*/
      otherNode(index, item) {
        // if (item.Status == 'C') {
        this.autoPlay = true;
        this.playNode(index);
        // }
      },
      /*显示、隐藏添加笔记*/
      toggleNotes() {
        this.showAddNotes = !this.showAddNotes;
      },
      /*保存笔记*/
      saveNotes() {
        this.toggleNotes();
        console.log('保存笔记', this.addNotesData);
      },
      /*每30秒调用一次*/
      async checkLogin() {
        let Mac = getMac();
        try {
          let res = await CheckLoginStatus({UserID: this.userInfo.UserID, Mac});
          if (res != 1) {
            Toast({Message: '账号已退出，请重新登录'});
            clearInterval(this.checkTimer);
            this.updateProgress(this.activeNode.NodeID, this.locationTime, this.activeNode.Status);
            clearInterval(this.updateTimer);
            this.$router.push({path: '/login'});
          }
        } catch (e) {
          Toast({Message: '账号已退出，请重新登录'});
          clearInterval(this.checkTimer);
          this.updateProgress(this.activeNode.NodeID, this.locationTime, this.activeNode.Status);
          clearInterval(this.updateTimer);
          this.$router.push({path: '/login'});
        }
      },
      async isDenyUser() {
        let res = await GetIsDenyUser({UserID: this.userInfo.UserID});
        if (res.result == 1) {
          MessageBox.alert(res.message);
        }
      }
    },
    beforeDestroy() {
      this.updateProgress(this.activeNode.NodeID, this.locationTime, this.activeNode.Status);
      clearInterval(this.timer);
    },
    watch: {
      activeNodeIndex: function (val) {
        let dataList = this.nodeList;
        if (dataList) {
          let node = dataList[val];
          this.activeNodeId = node.NodeID;
        }
      },
      activeNodeId: function (val) {
        // if (!val) return
        let dataList = this.nodeList;
        dataList && dataList.forEach((item, index) => {
          if (val == item.NodeID || (val == '' && index == 0)) {
            this.activeNode = item;
            this.activeNodeIndex = index;
            this.prevLocation = item.Time || 0;
            this.locationTime = item.Time || 0;
            this.playFunc();
          }
        });
      },
      playType: function (val) {
        this.prevLocation = this.myPlayer.currentTime;
        this.locationTime = this.myPlayer.currentTime;
        this.myPlayer.pause();
        this.$nextTick(() => {
          this.courseDetails.CourseName = this.playType == 'mp4' ? '视频播放' : '音频播放';
          this.myPlayer = document.getElementById(`myPlayer${this.playType}`);
          this.autoPlay = true;
          this.playFunc();
        });
      }
    },
    // components: {
    //   bottomBar
    // },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.timer);
      clearInterval(this.checkTimer);
      MessageBox.close();
      next();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .play_Jyaicc {
    .header {
      .header_title {
        flex: 6;
      }
    }

    .course_menu {
      background-color: $fill-base;
      padding: 0 toRem(30px);
      font-size: 15px;

      li {
        padding: toRem(20px) 0;
        @extend %clearFix;
      }

      .title {
        @extend %pull-left;
        width: 7rem;
      }

      .status {
        @extend %pull-right;
        color: $color-text-thirdly;
        font-size: 12px;
      }

      .green {
        color: $brand-success;
      }
    }

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
        color: $color-text-reverse;
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
      background-size: contain;
      background-image: url(../assets/mp3-play.png);

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

    .mint-navbar .mint-tab-item {
      margin: 0 toRem(10px);
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
  }

</style>
