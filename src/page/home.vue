<template>
    <div class="home">
        <div class="h_top">
            <img src="../assets/yw_logo.png" alt="">
            <div class="h_tp_btnpart">
                <div class="h_tp_bp_search">
                    <img src="../assets/yw_search.png" alt @click="goSearch">
                </div>
            </div>
        </div>
        <div class="h_content">
            <div class="h_ct_datepart">
                <p>今天是<span v-text="Year"></span>年<span v-text="Month"></span>月<span v-text="Day"></span>日 农历<span v-text="nongli"></span>；</p>
            </div>
            <notice-banner :notice="noticeList"></notice-banner>
            <div class="h_ct_imgpart">
                <mt-swipe :showIndicators="false" :auto="5000">
                    <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
                        <div class="h_ct_ip_box" @click="articleLink(item)">
                            <div class="h_ct_ip_imgpart">
                                <img :src="item.Articleimg" alt>
                            </div>
                            <div class="h_ct_ip_wordspart">
                                <div class="h_ct_ip_wptitle" v-text="item.Articletitle"></div>
                            </div>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="h_ct_nav">
                <div class="h_ct_nav_title">
                    <p>信息资讯</p>
                </div>
                <ul>
                    <li>
                        <router-link to="/notification">
                            <div>
                                <img src="../assets/yw_notices.png" alt>
                            </div>
                            <p>
                                <span>通知公告</span>
                            </p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/rankList">
                            <div>
                                <img src="../assets/yw_ranks.png" alt>
                            </div>
                            <p>
                                <span>排行榜</span>
                            </p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/courseCenter">
                            <div>
                                <img src="../assets/yw_courses.png" alt>
                            </div>
                            <p>
                                <span>课程中心</span>
                            </p>
                        </router-link>
                    </li>
                </ul>
                <div class="h_ct_nav_title">
                    <p>心理服务</p>
                </div>
                <ul>
                    <li>
                        <router-link :to="{ path: '/coursecenter', query: { id: 107, title: '心理课程' } }">
                            <div>
                                <img src="../assets/yw_heartcourse.png" alt>
                            </div>
                            <p>
                                <span>心理课程</span>
                            </p>
                        </router-link>
                    </li>
                    <li>
                        <a href="javascript:;" @click="onBuild">
                            <div>
                                <img src="../assets/yw_heartexam.png" alt>
                            </div>
                            <p>
                                <span>心理测试</span>
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" @click="linkToHeart">
                            <div>
                                <img src="../assets/yw_heartline.png" alt>
                            </div>
                            <p>
                                <span>心理热线</span>
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="h_ct_nav_bottom"></div>
            <div class="h_ct_specialTask">
                <router-link :to="{ path: '/trainList' }">
                    <img src="../assets/yw_training.jpg" alt>
                </router-link>
                <router-link :to="{ path: '/courseCenter', query: { id: 112, title: '自贸区发展' } }">
                    <img src="../assets/zymyq.png" alt>
                </router-link>
            </div>
            <div class="h_ct_coursetablelist">
                <mt-navbar v-model="selected">
                    <mt-tab-item id="1">
                        <div class="h_ct_imgbox">
                            <img src="../assets/yw_tuijian.png" alt v-show="selected != 1">
                            <img src="../assets/yw_tuijianst.png" alt v-show="selected == 1">
                        </div>
                        <p :class="{'h_ct_active': selected == 1}">
                            <span>热门推荐</span>
                        </p>
                    </mt-tab-item>
                    <mt-tab-item id="2">
                        <div class="h_ct_imgbox">
                            <img src="../assets/yw_fagui.png" alt v-show="selected != 2">
                            <img src="../assets/yw_faguist.png" alt v-show="selected == 2">
                        </div>
                        <p :class="{'h_ct_active': selected == 2}">
                            <span>政策法规</span>
                        </p>
                    </mt-tab-item>
                    <mt-tab-item id="3">
                        <div class="h_ct_imgbox">
                            <img src="../assets/yw_zhishi.png" alt v-show="selected != 3">
                            <img src="../assets/yw_zhishist.png" alt v-show="selected == 3">
                        </div>
                        <p :class="{'h_ct_active': selected == 3}">
                            <span>执政能力</span>
                        </p>
                    </mt-tab-item>
                    <mt-tab-item id="4">
                        <div class="h_ct_imgbox">
                            <img src="../assets/yw_renwen.png" alt v-show="selected != 4">
                            <img src="../assets/yw_renwenst.png" alt v-show="selected == 4">
                        </div>
                        <p :class="{'h_ct_active': selected == 4}">
                            <span>社会经济</span>
                        </p>
                    </mt-tab-item>
                </mt-navbar>
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                        <div class="h_ct_ctl_courselist">
                            <div class="h_ct_ctl_clinner">
                                <ul>
                                    <li v-for="(item, index) in sopportList" :key="index+item">
                                        <a href="javascript:;" @click="addCourse(item)">
                                            <div class="h_ct_ctl_image">
                                                <img :src="item.Course_img" alt v-if="item.Course_img">
                                                <img src="../assets/yw_nopic.png" alt v-else>
                                            </div>
                                            <p class="h_ct_ctl_title" v-text="item.Course_Name"></p>
                                            <div class="h_ct_ctl_scoreadtype">
                                                <div>
                                                    学分:<span v-text="item.Credit_hour"></span>
                                                </div>
                                                <div>
                                                    类型: <span>视频</span>
                                                </div>
                                            </div>
                                            <div class="h_ct_ctl_selectadwatch">
                                                <div class="h_ct_ctl_selectadwatch_left">
                                                    <img src="../assets/yw_noselect.png" alt v-if="item.selectIdentifier == '未选'">
                                                    <img src="../assets/yw_select.png" alt v-else>
                                                </div>
                                                <div class="h_ct_ctl_selectadwatch_right">
                                                    <p>讲师: <span v-text="item.Teachername"></span></p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="h_ct_ctl_nomessage" v-show="sopportOnload == false && sopportList.length == 0">
                                    <img src="../assets/yw_error.png" alt> <span>暂时没有该类课程</span>
                                </div>
                                <div class="h_ct_ctl_onload" v-show="sopportOnload">
                                    <mt-spinner color="#b20017"></mt-spinner>
                                    <span class="h_ct_ctl_info">加载中...</span>
                                </div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div class="h_ct_ctl_courselist">
                            <div class="h_ct_ctl_clinner">
                                <ul>
                                    <li v-for="(item, index) in legelList" :key="index+item">
                                        <a href="javascript:;" @click="addCourse(item)">
                                            <div class="h_ct_ctl_image">
                                                <img :src="item.Course_img" alt v-if="item.Course_img">
                                                <img src="../assets/yw_nopic.png" alt v-else>
                                            </div>
                                            <p class="h_ct_ctl_title" v-text="item.Course_Name"></p>
                                            <div class="h_ct_ctl_scoreadtype">
                                                <div>
                                                    学分: <span v-text="item.Credit_hour"></span>
                                                </div>
                                                <div>
                                                    类型: <span>视频</span>
                                                </div>
                                            </div>
                                            <div class="h_ct_ctl_selectadwatch">
                                                <div class="h_ct_ctl_selectadwatch_left">
                                                    <img src="../assets/yw_noselect.png" alt v-if="item.selectIdentifier == '未选'">
                                                    <img src="../assets/yw_select.png" alt v-else>
                                                </div>
                                                <div class="h_ct_ctl_selectadwatch_right">
                                                    <p>讲师: <span v-text="item.Teachername"></span></p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="h_ct_ctl_nomessage" v-show="legelOnload == false && legelList.length == 0">
                                    <img src="../assets/yw_error.png" alt> <span>暂时没有该类课程</span>
                                </div>
                                <div class="h_ct_ctl_onload" v-show="legelOnload">
                                    <mt-spinner color="#b20017"></mt-spinner>
                                    <span class="h_ct_ctl_info">加载中...</span>
                                </div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <div class="h_ct_ctl_courselist">
                            <div class="h_ct_ctl_clinner">
                                <ul>
                                    <li v-for="(item, index) in businessList" :key="index+item">
                                        <a href="javascript:;" @click="addCourse(item)">
                                            <div class="h_ct_ctl_image">
                                                <img :src="item.Course_img" alt v-if="item.Course_img">
                                                <img src="../assets/yw_nopic.png" alt v-else>
                                            </div>
                                            <p class="h_ct_ctl_title" v-text="item.Course_Name"></p>
                                            <div class="h_ct_ctl_scoreadtype">
                                                <div>
                                                    学分: <span v-text="item.Credit_hour"></span>
                                                </div>
                                                <div>
                                                    类型: <span>视频</span>
                                                </div>
                                            </div>
                                            <div class="h_ct_ctl_selectadwatch">
                                                <div class="h_ct_ctl_selectadwatch_left">
                                                    <img src="../assets/yw_noselect.png" alt v-if="item.selectIdentifier == '未选'">
                                                    <img src="../assets/yw_select.png" alt v-else>
                                                </div>
                                                <div class="h_ct_ctl_selectadwatch_right">
                                                    <p>讲师: <span v-text="item.Teachername"></span></p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="h_ct_ctl_nomessage" v-show="businessOnload == false && businessList.length == 0">
                                    <img src="../assets/yw_error.png" alt> <span>暂时没有该类课程</span>
                                </div>
                                <div class="h_ct_ctl_onload" v-show="businessOnload">
                                    <mt-spinner color="#b20017"></mt-spinner>
                                    <span class="h_ct_ctl_info">加载中...</span>
                                </div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="4">
                        <div class="h_ct_ctl_courselist">
                            <div class="h_ct_ctl_clinner">
                                <ul>
                                    <li v-for="(item, index) in cultureList" :key="index+item">
                                        <a href="javascript:;" @click="addCourse(item)">
                                            <div class="h_ct_ctl_image">
                                                <img :src="item.Course_img" alt v-if="item.Course_img">
                                                <img src="../assets/yw_nopic.png" alt v-else>
                                            </div>
                                            <p class="h_ct_ctl_title" v-text="item.Course_Name"></p>
                                            <div class="h_ct_ctl_scoreadtype">
                                                <div>
                                                    学分: <span v-text="item.Credit_hour"></span>
                                                </div>
                                                <div>
                                                    类型: <span>视频</span>
                                                </div>
                                            </div>
                                            <div class="h_ct_ctl_selectadwatch">
                                                <div class="h_ct_ctl_selectadwatch_left">
                                                    <img src="../assets/yw_noselect.png" alt v-if="item.selectIdentifier == '未选'">
                                                    <img src="../assets/yw_select.png" alt v-else>
                                                </div>
                                                <div class="h_ct_ctl_selectadwatch_right">
                                                    <p>讲师: <span v-text="item.Teachername"></span></p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="h_ct_ctl_nomessage" v-show="cultureOnload == false && cultureList.length == 0">
                                    <img src="../assets/yw_error.png" alt> <span>暂时没有该类课程</span>
                                </div>
                                <div class="h_ct_ctl_onload" v-show="cultureOnload">
                                    <mt-spinner color="#b20017"></mt-spinner>
                                    <span class="h_ct_ctl_info">加载中...</span>
                                </div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <bottom-bar :selected="'1'"></bottom-bar>
    </div>
</template>

<script>
import { bottomBar, noticeBanner } from '../components';
import { 
    getCourseInfoListAll, 
    getNoticeInfoList,
    UpdateUserCourse,
    getArticleInfoList
} from '../service/getData'
import { toPlay } from '../service/mixins'
import { mapState, mapActions } from 'vuex'
import { MessageBox } from 'mint-ui'

export default {
    mixins: [toPlay],
    name: 'home',
    data () {
        return {
            addType: false,
            noticeList: [],
            bannerList: [],
            selected: '1',
            sopportList: [],
            sopportOnload: true,
            legelList: [],
            legelOnload: true,    
            businessList: [],
            businessOnload: true,            
            cultureList: [],
            cultureOnload: true,
            heartList: [],
            Year: '',
            Month: '',
            Day: '',
            nongli: "戊戌年",
        }
    },
    mounted () {
        // document.addEventListener('click', (e) => {
        //     if (e.target.className != 'h_tp_bp_add') {
        //         this.addType = false
        //     }
        // })
        this.render()
        this.date()
        this.hdnongli()
    },
    methods: {
        ...mapActions(['saveCourseInfo']),
        inBuilding () {
            MessageBox('提示', '正在建设中。。')
        },
        openAdd () {
            this.addType = true
        },
        playVideo (type, id) {
            this.toPlay(type, id)
        },
        goSearch () {
            this.$router.push({ path: '/courseSearch' })
        },
        playCourse(item) {
            this.saveCourseInfo(item)
            this.toPlay(item.CourseType, item.Course_Number)
        },
        articleLink (item) {
            this.$router.push({ path: '/newsDetails', query: { ref: item.articleContent } })
        },
        linkToHeart () {
            this.$router.push({ path: '/newsDetails', query: { ref: this.heartList[0].articleContent, type: 'heart' } })
        },
        onBuild () {
            this.$router.push({ path: '/examHeartList' })
        },
        date () {
            const date = new Date()
            this.Year = date.getFullYear()
            this.Month = date.getMonth() + 1
            this.Day = date.getDate()
        },
        hdnongli () {
            var CalendarData = new Array(100);
            var madd = new Array(12);
            var tgString = "甲乙丙丁戊己庚辛壬癸";
            var dzString = "子丑寅卯辰巳午未申酉戌亥";
            var numString = "一二三四五六七八九十";
            var monString = "正二三四五六七八九十冬腊";
            var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
            var cYear, cMonth, cDay, TheDate;
            CalendarData = [
                0xa4b,
                0x5164b,
                0x6a5,
                0x6d4,
                0x415b5,
                0x2b6,
                0x957,
                0x2092f,
                0x497,
                0x60c96,
                0xd4a,
                0xea5,
                0x50da9,
                0x5ad,
                0x2b6,
                0x3126e,
                0x92e,
                0x7192d,
                0xc95,
                0xd4a,
                0x61b4a,
                0xb55,
                0x56a,
                0x4155b,
                0x25d,
                0x92d,
                0x2192b,
                0xa95,
                0x71695,
                0x6ca,
                0xb55,
                0x50ab5,
                0x4da,
                0xa5b,
                0x30a57,
                0x52b,
                0x8152a,
                0xe95,
                0x6aa,
                0x615aa,
                0xab5,
                0x4b6,
                0x414ae,
                0xa57,
                0x526,
                0x31d26,
                0xd95,
                0x70b55,
                0x56a,
                0x96d,
                0x5095d,
                0x4ad,
                0xa4d,
                0x41a4d,
                0xd25,
                0x81aa5,
                0xb54,
                0xb6a,
                0x612da,
                0x95b,
                0x49b,
                0x41497,
                0xa4b,
                0xa164b,
                0x6a5,
                0x6d4,
                0x615b4,
                0xab6,
                0x957,
                0x5092f,
                0x497,
                0x64b,
                0x30d4a,
                0xea5,
                0x80d65,
                0x5ac,
                0xab6,
                0x5126d,
                0x92e,
                0xc96,
                0x41a95,
                0xd4a,
                0xda5,
                0x20b55,
                0x56a,
                0x7155b,
                0x25d,
                0x92d,
                0x5192b,
                0xa95,
                0xb4a,
                0x416aa,
                0xad5,
                0x90ab5,
                0x4ba,
                0xa5b,
                0x60a57,
                0x52b,
                0xa93,
                0x40e95
            ];
            madd[0] = 0;
            madd[1] = 31;
            madd[2] = 59;
            madd[3] = 90;
            madd[4] = 120;
            madd[5] = 151;
            madd[6] = 181;
            madd[7] = 212;
            madd[8] = 243;
            madd[9] = 273;
            madd[10] = 304;
            madd[11] = 334;

            function GetBit(m, n) {
                return (m >> n) & 1;
            }
            function e2c() {
                TheDate =
                arguments.length != 3
                    ? new Date()
                    : new Date(arguments[0], arguments[1], arguments[2]);
                var total, m, n, k;
                var isEnd = false;
                var tmp = TheDate.getYear();
                if (tmp < 1900) {
                tmp += 1900;
                }
                total =
                (tmp - 1921) * 365 +
                Math.floor((tmp - 1921) / 4) +
                madd[TheDate.getMonth()] +
                TheDate.getDate() -
                38;

                if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
                total++;
                }
                for (m = 0; ; m++) {
                k = CalendarData[m] < 0xfff ? 11 : 12;
                for (n = k; n >= 0; n--) {
                    if (total <= 29 + GetBit(CalendarData[m], n)) {
                    isEnd = true;
                    break;
                    }
                    total = total - 29 - GetBit(CalendarData[m], n);
                }
                if (isEnd) break;
                }
                cYear = 1921 + m;
                cMonth = k - n + 1;
                cDay = total;
                if (k == 12) {
                if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
                    cMonth = 1 - cMonth;
                }
                if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
                    cMonth--;
                }
                }
            }

            function GetcDateString() {
                var tmp = "";
                tmp += tgString.charAt((cYear - 4) % 10);
                tmp += dzString.charAt((cYear - 4) % 12);
                tmp += "(";
                tmp += sx.charAt((cYear - 4) % 12);
                tmp += ")年 ";
                if (cMonth < 1) {
                tmp += "(闰)";
                tmp += monString.charAt(-cMonth - 1);
                } else {
                tmp += monString.charAt(cMonth - 1);
                }
                tmp += "月";
                tmp += cDay < 11 ? "初" : cDay < 20 ? "十" : cDay < 30 ? "廿" : "三十";
                if (cDay % 10 != 0 || cDay == 10) {
                tmp += numString.charAt((cDay - 1) % 10);
                }
                return tmp;
            }

            function GetLunarDay(solarYear, solarMonth, solarDay) {
                //solarYear = solarYear<1900?(1900+solarYear):solarYear;
                if (solarYear < 1921 || solarYear > 2020) {
                return "";
                } else {
                solarMonth = parseInt(solarMonth) > 0 ? solarMonth - 1 : 11;
                e2c(solarYear, solarMonth, solarDay);
                return GetcDateString();
                }
            }

            var D = new Date();
            var yy = D.getFullYear();
            var mm = D.getMonth() + 1;
            var dd = D.getDate();
            if (yy < 100) yy = "19" + yy;
            function showCal() {
                let nonglitime = GetLunarDay(yy, mm, dd);
                return nonglitime;
            }
            this.nongli = showCal()
        },
        async render () {
            const notice = await getNoticeInfoList({
                Page: 1,
                PageCount: 5
            }) // 顶部通知栏

            if (notice.NoticeInfoList.length > 0) {
                notice.NoticeInfoList = [...notice.NoticeInfoList, notice.NoticeInfoList[0]]
                console.log(notice.NoticeInfoList)
                notice.NoticeInfoList.forEach(item => {
                    item.Noticetitle = item.Noticetitle.substr(0,20) + '...'
                })
                this.noticeList = notice.NoticeInfoList
            }

            const bannerInfo = await getArticleInfoList({
                method: 'getArticleInfoList',
                Channel_id: '69',
                Sort: 'desc',
                Page: 1,
                PageCount: 4
            })  // 首页轮播图
            // console.log(bannerInfo)
            if (bannerInfo.articleInfoList.length > 0) {
                bannerInfo.articleInfoList.map(item => {
                    const date = new Date(item.Articlecreatedate)
                    item.Year = date.getFullYear() + '-' + (date.getMonth() + 1 > 10 ? date.getMonth() + 1 > 10 : '0' + (date.getMonth() + 1))
                    item.Date = date.getDate()
                })
                this.bannerList = bannerInfo.articleInfoList
            }

            const heart = await getArticleInfoList({
                method: 'getArticleInfoList',
                Channel_id: '70',
                Page: 1,
                PageCount: 3
            })

            if (heart.totalCount != 0) {
                this.heartList = heart.articleInfoList
            }
            const hotpart = await getCourseInfoListAll({ 
                method: 'getCourseInfoList',
                channelId: '103',
                Page: 1,
                PageCount: 4
            })  // 热门推荐
            const needed = await getCourseInfoListAll({ 
                method: 'getCourseInfoList',
                channelId: '104',
                Page: 1,
                PageCount: 4
            })  // 政策法规
            const notneeded = await getCourseInfoListAll({ 
                method: 'getCourseInfoList',
                channelId: '40',
                Page: 1,
                PageCount: 4
            })  // 业务知识
            const compre = await getCourseInfoListAll({ 
                method: 'getCourseInfoList',
                channelId: '110',
                Page: 1,
                PageCount: 4
            })  // 科学人文
            if (hotpart.totalCount != 0) {
                this.sopportList = hotpart.CourseInfoList
                this.sopportOnload = false
            } else {
                this.sopportOnload = false
            }
            if (needed.totalCount != 0) {
                this.legelList = needed.CourseInfoList
                this.legelOnload = false
            } else {
                this.legelOnload = false
            }
            if (notneeded.totalCount != 0) {
                this.businessList = notneeded.CourseInfoList
                this.businessOnload = false
            } else {
                this.businessOnload = false
            }
            if (compre.totalCount != 0) {
                this.cultureList = compre.CourseInfoList
                this.cultureOnload = false
            } else {
                this.cultureOnload = false
            }
            //method: 'getCourseInfoList',selecttype: 1,channelId: '',UserID: '',Keyword: '',Page: 1，PageCount: 4
        },
        async addCourse(item) {
            // console.log(item)
            let res = { result: '1' }
            if (item.selectIdentifier == '未选') {
                res = await UpdateUserCourse({ UserID: this.userInfo.UserID, CourseNumber: item.Course_Number })
            }
            if (res.result == 1) {
                this.playCourse(item)
            }
        }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    components: {
        bottomBar,
        noticeBanner
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.home{
    max-width: 10rem;
    margin: 0 auto;
    position: relative;
    .h_top{
        width: 100%;
        max-width: 10rem;
        height: toRem(92px);
        background: $brand-primary;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transform: translate(-50%, 0);
        position: fixed;
        top: 0;
        left: 50%;
        z-index: 10;
        > img{
            width: toRem(378px);
            height: toRem(48px);
            margin-left: toRem(30px);
        }
        .h_tp_btnpart{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: toRem(55px);
            height: toRem(92px);
            margin-right: toRem(28px);
            position: relative;
            .h_tp_bp_search{
                width: toRem(50px);
                height: toRem(92px);
                line-height: toRem(92px);
                text-align: center;
                img{
                    width: toRem(40px);
                    height: toRem(40px);
                }
            }
        }
    }
    .h_content{
        width: 100%;
        padding-top: toRem(92px);
        background: #fff;
        .h_ct_datepart{
            width: toRem(690px);
            margin: toRem(20px) auto 0;
            p{
                font-size: 0.35rem;
            }
        }
        .h_ct_imgpart{
            width: toRem(690px);
            height: toRem(360px);
            margin: toRem(16px) auto 0;
            border-radius: toRem(15px);
            overflow: hidden;
            .mint-swipe{
                width: toRem(690px);
            }
            .h_ct_ip_box{
                width: toRem(690px);
                height: toRem(360px);
                position: relative;
            }
            .h_ct_ip_imgpart{
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .h_ct_ip_wordspart{
                width: 100%;
                height: toRem(80px);
                background: rgba(0,0,0,0.5);
                position: absolute;
                left: 0;
                bottom: 0;
                .h_ct_ip_wptitle{
                    height: toRem(80px);
                    line-height: toRem(80px);
                    padding-right: toRem(15px);
                    text-indent: 0.5rem;
                    color: #fff;
                    font-size: 0.35rem;
                    @include ellipsis_two(1);
                }
            }
        }
        .h_ct_nav{
            width: toRem(690px);
            height: toRem(552px);
            padding-top: toRem(10px);
            margin: 0 auto;
            .h_ct_nav_title{
                height: toRem(60px);
                display: flex;
                align-items: center;
                &::before{
                    content: '';
                    width: toRem(7px);
                    height: toRem(35px);
                    border-radius: toRem(7px);
                    background: $brand-primary;
                    display: inline-block;
                }
                p{
                    margin-left: toRem(20px);
                    font-size: 0.35rem;
                }
            }
            ul{
                padding: 0 toRem(73px);
                display: flex;
                justify-content: space-between;
                li{
                    width: toRem(121px);
                    height: toRem(195px);
                    text-align: center;
                    a{
                        width: 1.6rem;
                        height: 100%;
                        padding-top: toRem(10px);
                        text-align: center;
                        display: inline-block;
                        img{
                            width: toRem(121px);
                            height: toRem(121px);
                        }
                        p{
                            margin-top: toRem(15px);
                            font-size: 0.35rem;
                        }
                    }
                }
            }
        }
        .h_ct_nav_bottom{
            width: 100%;
            height: toRem(20px);
            background: #f2f4f6;
        }
        .h_ct_specialTask{
            padding: toRem(30px) 0;
            a{
                width: toRem(690px);
                margin: 0 auto;
                display: block;
                &:last-of-Type{
                    margin-top: toRem(30px);
                }
                img{
                    width: toRem(690px);
                    border-radius: toRem(15px);
                }
            }
        }
        .h_ct_coursetitle{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: toRem(690px);
            height: toRem(112px);
            margin: 0 auto;
            .h_ct_left{
                .h_ct_left_title{
                    font-weight: bold;
                    font-size: toRem(36px);
                }
                .h_ct_left_content{
                    margin-top: toRem(8px);
                    font-size: toRem(22px);
                    color: #999;
                }
            }
            .h_ct_right{
                a{
                    display: inline-block;
                    height: toRem(112px);
                    line-height: toRem(112px);;
                    font-size: 0.35rem;
                    color: #bf131b;
                }
            }
        }
        .h_ct_coursetablelist{
            .mint-navbar{
                .mint-tab-item{
                    &:first-of-type{
                        img{
                            width: toRem(40px);
                            height: toRem(44px);
                        }
                    }
                    &:nth-of-type(2){
                        img{
                            width: toRem(47px);
                            height: toRem(48px);
                        }
                    }
                    &:nth-of-type(3){
                        img{
                            width: toRem(45px);
                            height: toRem(47px);
                        }
                    }
                    &:last-of-type{
                        img{
                            width: toRem(46px);
                            height: toRem(51px);
                        }
                    }
                    .h_ct_imgbox{
                        height: toRem(52px);
                        line-height: toRem(52px);
                    }
                    p{
                        margin-top: toRem(17px);
                        font-size: 0.35rem;
                    }
                    .h_ct_active{
                        
                        color: $brand-primary;
                    }
                }
                .is-selected{
                    border-bottom: 0.08rem solid $brand-primary;
                }
            }
            .h_ct_ctl_courselist{
                width: 100%;
                padding-bottom: toRem(135px);
                background: #f2f4f6;
                padding-top: toRem(20px);
                .h_ct_ctl_clinner{
                    width: toRem(688px);
                    height: toRem(920px);
                    margin: 0 auto;
                    border-radius: toRem(15px);
                    background: #fff;
                    ul{
                        padding: toRem(10px) toRem(10px) toRem(10px);
                        display: flex;
                        flex-wrap: wrap;
                        li{
                            width: toRem(334px);
                            height: toRem(430px);
                            padding: 0 toRem(10px);
                            margin: toRem(10px) 0;
                            a{
                                display: inline-block;
                                width: 100%;
                                height: 100%;
                                text-align: center;
                            }
                            .h_ct_ctl_image{
                                img{
                                    width: toRem(314px);
                                    height: toRem(220px);
                                    border-radius: toRem(15px);
                                }
                            }

                            .h_ct_ctl_title{
                                width: toRem(314px);
                                height: 1rem;
                                line-height: 0.5rem;
                                margin: toRem(25px) auto 0;
                                text-align: left;
                                font-size: 0.35rem;
                                @include ellipsis_two(2);
                            }
                            .h_ct_ctl_scoreadtype{
                                width: toRem(314px);
                                margin: toRem(10px) auto 0;
                                display: flex;
                                justify-content: space-between;
                                font-size: 0.3rem;
                                color: #a0a0a0;
                            }
                            .h_ct_ctl_selectadwatch{
                                display: flex;
                                width: toRem(314px);
                                margin: toRem(20px) auto 0;
                                justify-content: space-between;
                                align-items: center;
                                .h_ct_ctl_selectadwatch_left{
                                    img{
                                        width: toRem(60px);
                                        height: toRem(36px);
                                    }
                                }
                                .h_ct_ctl_selectadwatch_right{
                                    p{
                                        font-size: 0.3rem;
                                        color: #a0a0a0;
                                    }
                                }
                            }
                        }
                    }
                    .h_ct_ctl_onload{
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        span{
                            font-size: 0.4rem;
                            margin-left: 0.2rem;
                        }
                    }
                    .h_ct_ctl_nomessage{
                        width: 100%;
                        height: 100%;
                        line-height: toRem(1010px);
                        text-align: center;
                        img{
                            width: toRem(60px);
                            height: toRem(60px);
                            position: relative;
                            bottom: toRem(5px);
                        }
                        span{
                            font-size: 0.5rem;
                        }
                    }
                }
            }
        }
    }
}
</style>