<template>
  <div class="home_index container_bottom">
    <!--<header-fix title="终身学习平台" fixed>
      <router-link slot="left" to="/message" class="message_icon">
        <i class="webapp webapp-email"></i>
      </router-link>
      <div slot="right" class="clearFix">
        <router-link to="/history" class="history">
          <i class="webapp webapp-time"></i>
        </router-link>
        <img src="../assets/info_show.png" exam @click="toggleModel" alt="用户信息" class="info_show"/>
      </div>
    </header-fix>-->
    <div class="container">
      <!--<mt-swipe :auto="4000">
          <mt-swipe-item v-for="item in swipeData" :key="item.Id">
            <a :href="item.Url">
              <error-img :src="item.Icon"></error-img>
            </a>
          </mt-swipe-item>
      </mt-swipe>-->
      <div class="banner">
        <img src="../assets/banner.jpg" alt="苏州">
        <p class="welcome_info">欢迎{{userInfo.Username}}登录！</p>
      </div>
      <section class="guide_list">
        <div class="guide_container clearFix">
          <div class="guide_item">
            <router-link to="/examGuide">
              <img src="../assets/examCenter.png" alt="在线测试">
              <p>在线测试</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/courseCenter">
              <img src="../assets/my_course.png" alt="我的课程">
              <p>课程中心</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/history">
              <img src="../assets/history_play.png" alt="历史播放">
              <p>历史播放</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/classGarden">
              <img src="../assets/class_ico.png" alt="班级园地">
              <p>班级园地</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/newsCenter">
              <img src="../assets/news_ico.png" alt="资讯中心">
              <p>新闻资讯</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/rankList">
              <img src="../assets/rank_ico.png" alt="排行榜">
              <p>排行榜</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/notification">
              <img src="../assets/ebook_ico.png" alt="通知公告">
              <p>通知公告</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link :to="{path: '/newsCenter', query: {id: 79, title: '技术支持'}}">
              <img src="../assets/home_link5.png" alt="技术支持">
              <p>技术支持</p>
            </router-link>
          </div>
          <!-- <div class="guide_item">
            <a href="http://58.210.227.30/learntrain/elearning/webshow/index_leader.aspx">
              <img src="../assets/home_link3.png" alt="任前考试">
              <p>任前考试</p>
            </a>
          </div>-->
          <!-- <div class="guide_item">
            <router-link to="/trainDetail">
              <img src="../assets/home_link4.png" alt="学分考核">
              <p>学分考核</p>
            </router-link>
          </div>-->
          <!-- <div class="guide_item">
            <router-link to="/resultShow">
              <img src="../assets/result_show_icon.png" alt="成果展示">
              <p>成果展示</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/communication">
              <img src="../assets/communication_ico.png" alt="交流评论">
              <p>交流评论</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/notice">
              <img src="../assets/notice_ico.png" alt="通知公告">
              <p>通知公告</p>
            </router-link>
          </div>-->
        </div>
      </section>
      <section class="course_guide">
        <mt-cell is-link to="courseCenter" value="更多">
          <span slot="title">
            <span class="primary_line"></span>课程导航
          </span>
        </mt-cell>
        <mt-swipe :auto="4000">
          <mt-swipe-item>
            <div class="swipe-container">
              <router-link
                :to="{path:'/courseCenter',query:{id:'84', title:'习近平新时代中国特色社会主义思想和党的十九大精神学习'}}"
              >
                <p>
                  <img src="../assets/channel_big_2.png">
                </p>
                <p class="course_title">习近平新时代中国特色社会主义思想和党的十九大精神学习</p>
              </router-link>
              <a @click="alertMS()">
                <p>
                  <img src="../assets/channel_big_5.png">
                </p>
                <p class="course_title">十九届二中、三中全会精神解读</p>
              </a>
            </div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="swipe-container">
              <router-link :to="{path:'/courseCenter',query:{id:'83', title:'旗帜鲜明讲政治'}}">
                <p>
                  <img src="../assets/channel_big_1.png">
                </p>
                <p class="course_title">旗帜鲜明讲政治</p>
              </router-link>
              <router-link :to="{path:'/courseCenter',query:{id:'90', title:'“四个全面”战略布局'}}">
                <p>
                  <img src="../assets/channel_big_4.png">
                </p>
                <p class="course_title">“四个全面”战略布局</p>
              </router-link>
            </div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="swipe-container">
              <router-link :to="{path:'/courseCenter',query:{id:'85', title:'三大攻坚战'}}">
                <p>
                  <img src="../assets/channel_big_3.png">
                </p>
                <p class="course_title">三大攻坚战</p>
              </router-link>
            </div>
          </mt-swipe-item>
        </mt-swipe>
        <div class="course_category">
          <div class="category_container">
            <router-link
              v-for="item in courseCategoryData"
              :key="item.Channel_id"
              :to="{path:'/courseCenter',query:{id:item.Channel_id, title:item.Channel_name}}"
            >
              <p>
                <error-img :src="item.Channel_img"></error-img>
              </p>
              <p class="category_name">{{item.Channel_name}}</p>
            </router-link>
          </div>
          <div class="refresh_category" @click.stop="refreshCategory">
            <img class="refresh" src="../assets/refresh.png" alt>
            <span>换一批</span>
          </div>
        </div>
      </section>

      <section class="recommend_info">
        <div class="search_field">
          <!--<mt-button id="searchChannelName" type="default" class="search_items search_btn">
            <img src="../assets/down_arrow.png" alt="" slot="icon">
            专题
          </mt-button>
          <mt-button id="searchTime" type="default" class="search_items search_btn">
            <img src="../assets/down_arrow.png" alt="" slot="icon">
            时间
          </mt-button>-->
          <!-- <select class="search_items search_btn" name="searchChannel" id="searchChannel" v-model="searchChannel">
            <option value="">专题</option>
            <option v-for="item in channelData" :key="item.Channel_id" :value="item.Channel_id">{{item.Channel_name}}
            </option>
          </select>
          <select class="search_items search_btn" name="searchTime" id="searchTime" v-model="searchTime">
            <option value="">时间</option>
            <option v-for="year in yearsList" :key="year" :value="year">{{year}}</option>
          </select>-->
          <!-- <p class>通知公告</p> -->
          <!-- <div class="search_input_block">
            <input class="search_input" type="text" placeholder="关键字搜索" v-model="searchText">
            <img class="search_ico" src="../assets/search_gray.png" @click.stop="clickSearch()">
          </div> -->
        </div>
        <!-- <mt-navbar v-model="tabIndex">
          <mt-tab-item id="1">最新课程</mt-tab-item>
          <mt-tab-item id="2">推荐课程</mt-tab-item>
          <mt-tab-item id="3">通知公告</mt-tab-item>
        </mt-navbar>-->
        <!-- <mt-tab-container v-model="tabIndex" :swipeable="true"> -->
        <!-- <mt-tab-container-item id="1">
            <div
              v-for="item in noticeData"
              :key="item.Course_Number"
              @click="addCourse(item)"
            >
              <mt-cell :title="item.Course_Name">
                <div class="left_icon" slot="icon">
                  <img
                    v-if="item.Course_CreateDate && item.Course_CreateDate.indexOf('2018')==0"
                    class="new_ico"
                    src="../assets/new.png"
                  >
                  <img v-else class="dian" src="../assets/blue_cicle.png" alt>
                </div>
              </mt-cell>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div
              v-for="item in recommendCourseData"
              :key="item.Course_Number"
              @click="addCourse(item)"
            >
              <mt-cell :title="item.Course_Name">
                <div class="left_icon" slot="icon">
                  <img
                    v-if="item.Course_CreateDate && item.Course_CreateDate.indexOf('2018')==0"
                    class="new_ico"
                    src="../assets/new.png"
                  >
                  <img v-else class="dian" src="../assets/blue_cicle.png" alt>
                </div>
              </mt-cell>
            </div>
        </mt-tab-container-item>-->
        <!-- <mt-tab-container>
          <mt-tab-container-item>
            <mt-cell
              v-for="item in noticeData"
              :key="item.Noticeid"
              :title="item.Noticetitle"
              @click.native="goArticleDetail(item)"
               
            >
              <div class="left_icon" slot="icon" >
                <img
                  v-if="item.Noticecreatedate.indexOf('2018')==0"
                  class="new_ico"
                  src="../assets/new.png"
                >
                <img v-else class="dian"  src="../assets/blue_cicle.png" alt>
              </div>
            </mt-cell>
          </mt-tab-container-item>
        </mt-tab-container> -->
      </section>
      <!--<section class="recommend_course">
        <div class="recommend_title"><span class="primary_line">课程推荐</span></div>
        <div class="recommend_course_list">
          <ul>
            <li v-for="item in recommendCourseData" :key="item.Id">
              <div class="recommend_course_item" @click="toPlay(item.CourseType,item.CourseId)">
                <a>
                  <error-img :src="item.CourseImg" :error-src="noCourse"></error-img>
                  <p class="course_title">{{item.CourseName}}</p>
                </a>
                <p class="clearFix"><span class="teacher pull-left">讲师：{{item.TeacherName}}</span><span
                    class="highlight pull-right">{{item.Credit}}学分</span></p>
              </div>
            </li>
          </ul>
        </div>
      </section>-->
    </div>
    <footer-fix selected="home"></footer-fix>
    <a v-if="showFloat" ref="floatImg" id="float_img" @click="handleFloat">
      <img src="../assets/float.png" alt>
    </a>
    <!--<mb-model :isShow.sync="showModel">
      <div class="info_content" slot>
        <div class="info_layer_avatar">
          <img class="avatar" src="../assets/user_avatar.png" alt="用户头像">
          <p>{{userInfo.Username}}</p>
        </div>
        <div class="info_detail">
          <h4>您好，欢迎来到终身学习平台</h4>
          <p><span>已获{{userInfo.TotalCredit}}学分，排名第{{userInfo.ScoreRank}}名</span></p>
        </div>
      </div>
    </mb-model>-->
  </div>
</template>
<script>
import {
  Cell,
  MessageBox,
  Navbar,
  Popup,
  Swipe,
  SwipeItem,
  TabContainer,
  TabContainerItem
} from "mint-ui";
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import noCourse from "../assets/noCourse.png";
import { getQueryString } from "../plugins/utils";
import {
  getChannelInfoList,
  // getChannelInfoListHP,
  getCourseInfoList,
  GetIsAllowExam,
  getNoticeInfoList,
  // GetRaceList,
  UpdateUserCourse
} from "../service/getData";
import { toPlay } from "../service/mixins";
// import MobileSelect from 'mobile-select'

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Cell.name, Cell);
Vue.component(Navbar.name, Navbar);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Popup.name, Popup);
export default {
  name: "home",
  mixins: [toPlay],
  data() {
    return {
      showModel: false,
      swipeData: [],
      recommendCourseData: [],
      noCourse,
      code: "",
      courseCategoryData: [],
      allCourseCategoryData: [],
      tabIndex: "1",
      latestCourseData: [],
      noticeData: [],
      showPop: false,
      channelData: [],
      searchChannel: "",
      searchTime: "",
      searchText: "",
      showYears: false,
      categoryIndex: 0,
      imgCoords: {
        x: 0,
        y: 0,
        x_dir: true,
        y_dir: true
      },
      animateId: null,
      showFloat: false,
      isOnline: true,
      rewardCount: "",
      examCount: "",
      examId: 0
    };
  },
  created() {
    this.getUserAgent();
    this.code = getQueryString().code;
    /*if (this.alertTimes == 0) {
        MessageBox({
          title: '友情提示',
          message: '本年度在线学习截止时间为12月15日'
        }).then(() => {
          this.saveAlertTimes(1);
          this.getRaceList();
        });
      } else {
        this.getRaceList();
      }*/
    // this.getRaceList();
    this.getRecommendCourse();
    // this.getCourseInfo();
    this.getNoticeInfo();
    this.getCourseGuide();
    this.refreshCategory();
  },
  mounted() {
    // let self = this
    this.getChannelInfo();
    /*const searchTime = new MobileSelect({
        trigger: "#searchTime",
        wheels: [
          {data: this.yearsList}
        ],
        callback(indexArr, data) {
          self.searchTime = data[0]
        }
      });
      searchTime.setTitle('年份选择')*/
  },
  computed: {
    ...mapState(["userAgent", "userInfo", "alertTimes"]),
    yearsList() {
      let arr = [];
      let date = new Date();
      let thisYear = date.getFullYear();
      for (let i = thisYear; i >= thisYear - 10; i--) {
        arr.push(i);
      }
      return arr;
    }
    // allCourseCategoryData() {
    //   let arr = [
    //     {
    //       Channel_id: "49",
    //       Channel_name: "党的建设",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/党的建设.png"
    //     },
    //     {
    //       Channel_id: "10",
    //       Channel_name: "政治理论",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/政治理论.png"
    //     },
    //     {
    //       Channel_id: "68",
    //       Channel_name: "高层解读",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/高层解读.png"
    //     },
    //     {
    //       Channel_id: "64",
    //       Channel_name: "国际形势",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/国际形势.png"
    //     },
    //     {
    //       Channel_id: "11",
    //       Channel_name: "国内形势",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/国内形势.png"
    //     },

    //     {
    //       Channel_id: "36",
    //       Channel_name: "经济金融",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/经济金融.png"
    //     },
    //     {
    //       Channel_id: "12",
    //       Channel_name: "公共管理",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/公共管理.png"
    //     },
    //     {
    //       Channel_id: "22",
    //       Channel_name: "产业发展",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/产业发展.png"
    //     },
    //     {
    //       Channel_id: "14",
    //       Channel_name: "城乡发展",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/城乡发展.png"
    //     },
    //     {
    //       Channel_id: "67",
    //       Channel_name: "生态文明",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/生态文名.png"
    //     },

    //     {
    //       Channel_id: "78",
    //       Channel_name: "国防安全",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/国防安全.png"
    //     },
    //     {
    //       Channel_id: "76",
    //       Channel_name: "干部管理",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/干部管理.png"
    //     },
    //     {
    //       Channel_id: "77",
    //       Channel_name: "国企改革",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/国企改革.png"
    //     },
    //     {
    //       Channel_id: "15",
    //       Channel_name: "领导素养",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/领导素养.png"
    //     },
    //     {
    //       Channel_id: "29",
    //       Channel_name: "人文历史",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/人文历史.png"
    //     },
    //     {
    //       Channel_id: "72",
    //       Channel_name: "微课程",
    //       Channel_img:
    //         "http://www.szgx.suzhou.gov.cn:80/fwadmin/UpFiles/Channel/微课程.png"
    //     }
    //   ];
    //   return arr;
    // }
  },
  watch: {},
  methods: {
    ...mapActions(["getUserAgent", "saveCourseInfo", "saveAlertTimes"]),
    /* 未实现的课程频道 */
    goArticleDetail(item) {
      this.$router.push({
        path: "newsDetails",
        query: { ref: item.NoticeContent }
      });
    },
    alertMS() {
      MessageBox("提示", "还在建设中，请稍候");
    },
    /*打开(关闭)Model*/
    toggleModel() {
      this.showModel = !this.showModel;
    },
    
    judgeUrl(type, id) {
      let path = "";
      switch (type) {
        case "CourseList":
          path = `/courseCenter`;
          break;
        case "Article":
          path = `/newsDetails`;
          break;
        case "Course":
          this.getCourseDetail(id);
          break;
        case "ArticleList":
          path = `/newsCenter`;
          break;
      }
      this.$router.push({ path, query: { id } });
    },
    /*课程导航*/
    async getCourseGuide() {
      let categoryData = await getChannelInfoList({ selecttype: 2 });
      console.log(categoryData);
      this.allCourseCategoryData = categoryData.ChannelInfoList;
      this.courseCategoryData = categoryData.ChannelInfoList.slice(
        this.categoryIndex,
        this.categoryIndex + 5
      );
      console.log(this.courseCategoryData);
    },
    /*随机生成五个显示在首页的课程频道*/
    randomArray(data) {
      data.sort(() => 0.5 - Math.random());
      return data.slice(0, 5);
    },
    /*换一批*/
    refreshCategory() {
      let len = this.allCourseCategoryData.length;
      this.courseCategoryData = this.allCourseCategoryData.slice(
        this.categoryIndex,
        Math.min(this.categoryIndex + 5, len)
      );
      console.log(this.courseCategoryData);
      this.categoryIndex += 5;
      if (this.categoryIndex > len) {
        this.categoryIndex = 0;
      }
    },

    /*最新课程和推荐课程*/
    // async getCourseInfo() {
    //   let data = await getCourseInfoList({ UserID: this.userInfo.UserID });
    //   let list = [];
    //   if (data.totalSegmentCount != 0) {
    //     list = data.CourseInfoList;
    //   }
    //   this.latestCourseData = list;
    // },
    /* 通知公告 */
    async getNoticeInfo() {
      let res = await getNoticeInfoList();
      this.noticeData = res.NoticeInfoList;
      console.log(this.noticeData);
    },

    /* 课程频道 */
    async getChannelInfo() {
      // let self = this
      let res = await getChannelInfoList();
      if (Array.isArray(res.ChannelInfoList)) {
        this.channelData = res.ChannelInfoList.filter(e => {
          return e.Parent_ID == 0;
        });
        /*.map((item, index) => {
          return {
            id: item.Channel_id,
            value: item.Channel_name
          }
        })*/
      }
      /*const searchChannel = new MobileSelect({
          trigger: "#searchChannelName",
          wheels: [
            { data: this.channelData }
          ],
          callback(indexArr, data) {
            self.searchChannel = data[0].id
          }
        });
        searchChannel.setTitle('专题选择')*/
    },
    clickSearch() {
      this.$router.push({
        path: "/courseSearch",
        query: {
          channelID: this.searchChannel,
          year: this.searchTime,
          Keyword: this.searchText
        }
      });
    },
    async addCourse(item) {
      if (item.IsSelect == 1) {
        this.saveCourseInfo(item);
        this.toPlay(item.CourseType, item.Course_Number);
      } else {
        let res = await UpdateUserCourse({
          UserID: this.userInfo.UserID,
          CourseNumber: item.Course_Number
        });
        if (res.result == 1) {
          this.saveCourseInfo(item);
          this.toPlay(item.CourseType, item.Course_Number);
        }
      }
    },
    /*推荐课程*/
    async getRecommendCourse() {
      let res = await getCourseInfoList({ UserID: this.userInfo.UserID });
      let list = [];
      if (res.totalCount != 0) {
        list = res.CourseInfoList;
      }
      this.recommendCourseData = list;
    },
    randomStr() {
      let guid32 = "";
      for (let i = 0; i < 8; i++) {
        let s4 = (((1 + Math.random()) * 0x10000) | 0)
          .toString(16)
          .substring(1);
        guid32 += s4;
      }
      return guid32;
    },
    // 检验这个月是否有考试资格
    async GetIsAllowExam() {
      let data = await GetIsAllowExam({
        UserID: this.userInfo.UserID,
        examId: this.examId
      });
      if (data.IsAllowExam > 0) {
        MessageBox.confirm("", {
          message: data.Message,
          showCancelButton: true,
          confirmButtonText: "进入测试",
          cancelButtonText: "退出"
        }).then(
          action => {
            this.$router.push({ path: "/exam", query: { id: 229 } });
          },
          action => {
            // this.checkReward()
          }
        );
      } else {
        // this.checkReward()
      }
    },
    /* 检查是否需要领取奖励 */
    /*async checkReward () {
        let data = await GetExamReward({UserID: this.userInfo.UserID})
        this.rewardCount = data.RewardCount
        this.examCount = data.ExamCount
        if (Number(this.rewardCount) > 0) {
          MessageBox.confirm(`您有${data.RewardCount}份奖励未领取,是否领取奖励？`).then(action => {
            this.$router.push({path: '/raceHistory', query: {examId: this.examId}})
          })
        }
        // this.showFloat = Number(data.ExamCount) <= 0 && /^ceshi[1-5]$/.test(this.userInfo.UserID)
        // this.showFloat = /^ceshi[1-5]$/.test(this.userInfo.UserID)
        // if (this.showFloat) {
        //   this.animateImg()
        // }
      },*/
    animateImg() {
      if (!this.showFloat) return;
      this.animateId = requestAnimationFrame(this.animateImg);
      // const floatImg = document.querySelector("#float_img")
      const floatImg = this.$refs.floatImg;
      if (!floatImg) return;
      let imgWidth = floatImg.clientWidth;
      let imgHeight = floatImg.clientHeight;
      let width = document.body.clientWidth;
      let height =
        window.innerHeight -
        document.querySelector(".footerFix>.mint-tabbar.is-fixed").clientHeight;
      this.imgCoords.x_dir ? this.imgCoords.x++ : this.imgCoords.x--;
      this.imgCoords.y_dir ? this.imgCoords.y++ : this.imgCoords.y--;

      if (this.imgCoords.x === width - imgWidth - 1) {
        this.imgCoords.x_dir = false;
      }
      if (this.imgCoords.x === 1) {
        this.imgCoords.x_dir = true;
      }
      if (this.imgCoords.y === height - imgHeight - 1) {
        this.imgCoords.y_dir = false;
      }
      if (this.imgCoords.y === 1) {
        this.imgCoords.y_dir = true;
      }
      floatImg.style.setProperty("left", this.imgCoords.x + "px");
      floatImg.style.setProperty("top", this.imgCoords.y + "px");
    },
    // async getRaceList() {
    //   let data = await GetRaceList({
    //     Page: 0,
    //     UserID: this.userInfo.UserID,
    //     finish: 0
    //   });
    //   if (data.ExamInfoList.length > 0) {
    //     this.examId = data.ExamInfoList[0].ExamID;
    //     this.GetIsAllowExam();
    //   }
    // },
    handleFloat() {
      if (Number(this.examCount) > 0) {
        this.$router.push({
          path: "/examResult",
          query: { examId: this.examId }
        });
      } else {
        this.$router.push({ path: "/exam", query: { id: this.examId } });
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    cancelAnimationFrame(this.animateId);
    MessageBox.close();
    next();
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../style/mixin";

.home_index {
  padding-top: toRem(0px);
  padding-bottom: toRem(110px);

  .banner {
    position: relative;
    padding-bottom: toRem(10px);

    img {
      width: 100%;
    }

    .welcome_info {
      position: absolute;
      top: toRem(20px);
      right: toRem(25px);
      font-size: toRem(20px);
    }
  }

  .course_guide {
    .mint-cell {
      border-top: 1px solid $border-color-base;
      border-bottom: 1px solid $border-color-base;

      .mint-cell-wrapper {
        padding: 0 toRem(45px) 0 toRem(40px);
      }

      .mint-cell-value.is-link {
        margin-right: toRem(20px);
        font-size: toRem(22px);
      }

      .mint-cell-allow-right::after {
        right: toRem(40px);
      }
    }

    .mint-swipe {
      background: #fff;
      border-bottom: 1px solid $border-color-base;
      height: toRem(254px);

      .mint-swipe-item {
        padding: toRem(28px) toRem(20px) toRem(44px) toRem(20px);

        .swipe-container {
          @include flex(space-between);

          a {
            img {
              @include borderRadius(10px);
              @include wh(338px, 140px);
            }

            .course_title {
              width: toRem(338px);
              @include ht-lineHt(55px);
              @extend %ellipsis;
              font-size: toRem(20px);
              font-weight: 600;
              text-align: center;
            }
          }
        }
      }

      .mint-swipe-indicators {
        bottom: toRem(10px);
      }
    }

    .course_category {
      background: #fff;
      border-bottom: 1px solid $border-color-base;
      padding: toRem(18px) toRem(30px) 0 toRem(30px);

      .category_container {
        width: 100%;
        @include flex();
        a {
          float: left;
          img {
            @include borderRadius(10px);
            @include square(101px);
          }
          .category_name {
            width: toRem(101px);
            @include ht-lineHt(40px);
            @extend %ellipsis;
            font-size: toRem(18px);
            text-align: center;
          }
        }
      }
      .refresh_category {
        position: relative;
        width: 100%;
        @include ht-lineHt(60px);
        text-align: center;
        font-size: toRem(26px);

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(toRem(-65px), -50%, 0);
          width: toRem(35px);
        }

        span {
          padding-left: toRem(37.5px);
        }
      }
    }
  }

  .recommend_info {
    padding-bottom: toRem(10px);

    .search_field {
      padding: 0 toRem(20px) 0 toRem(35px);
      width: 100%;
      height: toRem(70px);
      @include flex();
      align-items: center;
      background: #fff;
      border-bottom: 1px solid #cccccc;
      .search_items {
        &.search_btn {
          background: #fff;
          position: relative;
          border: toRem(2px) solid #e7e4e1;
          @include borderRadius(10px);
          padding: 0 toRem(10px);
          @include wh(137px, 55px);
          text-align: left;
          @extend %ellipsis;

          .mint-button-icon {
            position: absolute;
            right: toRem(5px);
            top: 50%;
            width: toRem(23px);
            transform: translateY(-50%);

            img {
              width: toRem(23px);
            }
          }

          .mint-button-text {
            padding-right: toRem(25px);
            width: 100%;
            height: 100%;
            line-height: toRem(55px);
            @extend %ellipsis;
          }
        }
      }

      .search_input_block {
        position: relative;
        width: toRem(410px);

        .search_input {
          border: toRem(2px) solid #e7d4d1;
          @include borderRadius(10px);
          padding: 0 toRem(55px) 0 toRem(15px);
          @include wh(410px, 55px);
        }

        .search_ico {
          position: absolute;
          color: #000;
          font-weight: bold;
          top: 50%;
          right: toRem(20px);
          width: toRem(35px);
          transform: translateY(-50%);
        }
      }
    }

    .mint-navbar {
      border-bottom: 1px solid $border-color-base;

      .mint-tab-item.is-selected {
        margin-bottom: 0;
        background: $brand-primary;
        color: #fff;
      }
    }

    .left_icon {
      flex-shrink: 0;
      margin-bottom: toRem(72px);
      @include wh(37px, 15px);
      text-align: center;

      .new_ico {
        @include wh(37px, 15px);
      }

      .dian {
        @include square(15px);
      }
    }

    .mint-cell {
      .mint-cell-wrapper {
        .mint-cell-title {
          width: 100%;

          .mint-cell-text {
            @extend %ellipsis;
            color: #545454;
          }
        }
      }
    }
  }

  .header {
    .message_icon {
      @extend %pull-left;
      height: toRem(92px);
    }

    .webapp {
      color: $color-text-reverse;
      font-size: toRem(50px);
    }

    .history {
      @extend %pull-right;
      height: toRem(92px);
    }

    .info_show {
      width: toRem(50px);
      margin-right: toRem(25px);
      @extend %pull-right;
      margin-top: toRem(18px);
    }
  }

  .info_content {
    background: url(../assets/info_bg.png) no-repeat center bottom;
    background-size: toRem(571px) toRem(345px);
    height: toRem(533px);

    .info_layer_avatar {
      text-align: center;
      line-height: toRem(60px);
      font-size: 12px;
    }

    .avatar {
      margin-top: toRem(18px);
      @include square(117px);
    }

    .info_detail {
      text-align: center;
      padding: toRem(100px) toRem(10px) 0 toRem(10px);

      h4 {
        font-size: 14px;
      }

      p {
        margin-top: toRem(40px);
        color: $color-text-secondary;
        font-size: 13px;
      }
    }
  }
  .guide_list {
    border-top: 1px solid $border-color-base;
    border-bottom: 1px solid $border-color-base;
    width: 100%;
    // overflow-x: scroll;
    // overflow-y: hidden;
    // &::-webkit-scrollbar {
    //   width: 0px;
    // }
    background-color: $fill-base;
    // height: toRem(190px);

    .guide_container {
      @extend %clearFix;
      width: 100%;
      // height: toRem(190px);
      text-align: center;
    }
    .guide_item {
      @extend %pull-left;
      width: toRem(187px);
      padding: toRem(30px) 0;
      height: toRem(180px);
      p {
        line-height: toRem(50px);
      }

      img {
        width: toRem(84px);
      }
    }
  }

  .boundary {
    display: block;
    width: 100%;
    height: toRem(20px);
    background-color: #ebf1f1;
  }

  .recommend_course {
    padding: toRem(30px) 0 toRem(20px) toRem(25px);
    background-color: #fff;

    .recommend_title {
      font-size: 14px;
      line-height: toRem(62px);
    }

    .recommend_course_list {
      ul {
        @extend %clearFix;
      }

      li {
        @extend %pull-left;
        width: 50%;
        text-align: center;
        margin-top: toRem(30px);

        .recommend_course_item {
          padding-right: toRem(25px);
        }

        img {
          width: toRem(334px);
          height: toRem(178px);
        }

        .course_title {
          width: 100%;
          @extend %ellipsis;
          text-align: left;
          line-height: toRem(40px);
          font-size: 13px;
        }

        .clearFix {
          line-height: toRem(40px);
        }

        .teacher {
          color: $color-text-thirdly;
        }
      }
    }
  }

  .channel_list {
    padding-top: toRem(50px);
    width: 100%;
    height: 35%;
    overflow-y: scroll;

    p {
      border-top: 1px solid $border-color-base;
      width: 100%;
      @include ht-lineHt(100px);
      @extend %ellipsis;
      font-size: toRem(30px);
      text-align: center;

      &:first-of-type {
        border-top: none;
      }
    }
  }

  .search_year {
    width: 100%;
    height: 45%;
    padding-top: toRem(20px);

    .years_wrapper {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      text-align: center;
    }

    ul {
      li {
        @include ht-lineHt(75px);
        font-size: toRem(36px);
      }
    }
  }

  #float_img {
    position: fixed;
    top: 0;
    left: 0;
    transform: translateZ(0);
  }
}

.mobileSelect .content .panel .wheel .selectContainer li {
  font-size: toRem(40px);
}
</style>
