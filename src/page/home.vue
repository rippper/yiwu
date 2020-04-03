<template>
    <div class="home">
        <div class="h_top">
            <img src="../assets/yw_logo.png" alt="">
            <div class="h_tp_btnpart">
                <div class="h_tp_bp_search">
                    <img src="../assets/yw_search.png" alt @click="goSearch">
                </div>
                <!-- <div class="h_tp_bp_add" @click.stop="openAdd">
                    <img src="../assets/yw_add.png" alt>
                </div>
                <div class="h_tp_bp_addfunction" v-show="addType">
                    <div class="h_tp_bp_afinner">
                        <ul>
                            <li @click.stop>
                                <img src="../assets/yw_history.png" alt>
                                <span>历史</span>
                            </li>
                            <li @click.stop>
                                <div class="imgpart">
                                    <img src="../assets/yw_mails.png" alt>
                                </div>
                                <span>消息</span>
                            </li>
                            <li @click.stop>
                                <img src="../assets/yw_sweep.png" alt>
                                <span>扫一扫</span>
                            </li>
                        </ul>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="h_content">
            <notice-banner :notice="noticeList"></notice-banner>
            <div class="h_ct_imgpart">
                <mt-swipe :showIndicators="false" :auto="5000">
                    <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
                        <div class="h_ct_ip_box" @click="articleLink(item)">
                            <div class="h_ct_ip_imgpart">
                                <img :src="item.Articleimg" alt>
                            </div>
                            <div class="h_ct_ip_wordspart">
                                <div class="h_ct_ip_wpdate">
                                    <div class="h_ct_ip_wpdate_date" v-text="item.Date"></div>
                                    <div class="h_ct_ip_wpdate_year" v-text="item.Year"></div>
                                </div>
                                <div class="h_ct_ip_wptitle" v-text="item.Articletitle"></div>
                            </div>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="h_ct_nav">
                <ul>
                    <li>
                        <router-link to="/rankList">
                            <div>
                                <img src="../assets/yw_rank.png" alt>
                            </div>
                            <p>
                                <span>排行榜</span>
                            </p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/newsCenter">
                            <div>
                                <img src="../assets/yw_zixun.png" alt>
                            </div>
                            <p>
                                <span>资讯</span>
                            </p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/notification">
                            <div>
                                <img src="../assets/yw_tongzhi.png" alt>
                            </div>
                            <p>
                                <span>通知</span>
                            </p>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ path: '/coursecenter', query: { id: 107 } }">
                            <div>
                                <img src="../assets/yw_kecheng.png" alt>
                            </div>
                            <p>
                                <span>心理课程</span>
                            </p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/examCenter">
                            <div>
                                <img src="../assets/yw_ceshi.png" alt>
                            </div>
                            <p>
                                <span>心理测试</span>
                            </p>
                        </router-link>
                    </li>
                    <li>
                        <a href="javascript:;" @click="linkToHeart">
                            <div>
                                <img src="../assets/yw_rexian.png" alt>
                            </div>
                            <p>
                                <span>心理热线</span>
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="h_ct_coursetitle">
                <div class="h_ct_left">
                    <div class="h_ct_left_title">
                        课程中心
                    </div>
                    <div class="h_ct_left_content">
                        全方位的课程资源，轻松学习
                    </div>
                </div>
                <div class="h_ct_right">
                    <router-link to="/courseCenter">
                        查看更多
                    </router-link>
                </div>
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
                            <span>业务知识</span>
                        </p>
                    </mt-tab-item>
                    <mt-tab-item id="4">
                        <div class="h_ct_imgbox">
                            <img src="../assets/yw_renwen.png" alt v-show="selected != 4">
                            <img src="../assets/yw_renwenst.png" alt v-show="selected == 4">
                        </div>
                        <p :class="{'h_ct_active': selected == 4}">
                            <span>科学人文</span>
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
                                                    学分：<span v-text="item.Score"></span>
                                                </div>
                                                <div>
                                                    类型：<span>视频</span>
                                                </div>
                                            </div>
                                            <div class="h_ct_ctl_selectadwatch">
                                                <div class="h_ct_ctl_selectadwatch_left">
                                                    <img src="../assets/yw_noselect.png" alt v-if="item.selectIdentifier == '未选'">
                                                    <img src="../assets/yw_select.png" alt v-else>
                                                </div>
                                                <div class="h_ct_ctl_selectadwatch_right">
                                                    <img src="../assets/yw_watch.png" alt>
                                                    <span v-text="item.ViewCount"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="h_ct_ctl_nomessage" v-show="sopportOnload == false && sopportList.length == 0">
                                    <img src="../assets/yw_error.png" alt> <span>暂时没有该类课程。。。</span>
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
                                                    学分：<span v-text="item.Score"></span>
                                                </div>
                                                <div>
                                                    类型：<span>视频</span>
                                                </div>
                                            </div>
                                            <div class="h_ct_ctl_selectadwatch">
                                                <div class="h_ct_ctl_selectadwatch_left">
                                                    <img src="../assets/yw_noselect.png" alt v-if="item.selectIdentifier == '未选'">
                                                    <img src="../assets/yw_select.png" alt v-else>
                                                </div>
                                                <div class="h_ct_ctl_selectadwatch_right">
                                                    <img src="../assets/yw_watch.png" alt>
                                                    <span v-text="item.ViewCount"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="h_ct_ctl_nomessage" v-show="legelOnload == false && legelList.length == 0">
                                    <img src="../assets/yw_error.png" alt> <span>暂时没有该类课程。。。</span>
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
                                                    学分：<span v-text="item.Score"></span>
                                                </div>
                                                <div>
                                                    类型：<span>视频</span>
                                                </div>
                                            </div>
                                            <div class="h_ct_ctl_selectadwatch">
                                                <div class="h_ct_ctl_selectadwatch_left">
                                                    <img src="../assets/yw_noselect.png" alt v-if="item.selectIdentifier == '未选'">
                                                    <img src="../assets/yw_select.png" alt v-else>
                                                </div>
                                                <div class="h_ct_ctl_selectadwatch_right">
                                                    <img src="../assets/yw_watch.png" alt>
                                                    <span v-text="item.ViewCount"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="h_ct_ctl_nomessage" v-show="businessOnload == false && businessList.length == 0">
                                    <img src="../assets/yw_error.png" alt> <span>暂时没有该类课程。。。</span>
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
                                                    学分：<span v-text="item.Score"></span>
                                                </div>
                                                <div>
                                                    类型：<span>视频</span>
                                                </div>
                                            </div>
                                            <div class="h_ct_ctl_selectadwatch">
                                                <div class="h_ct_ctl_selectadwatch_left">
                                                    <img src="../assets/yw_noselect.png" alt v-if="item.selectIdentifier == '未选'">
                                                    <img src="../assets/yw_select.png" alt v-else>
                                                </div>
                                                <div class="h_ct_ctl_selectadwatch_right">
                                                    <img src="../assets/yw_watch.png" alt>
                                                    <span v-text="item.ViewCount"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="h_ct_ctl_nomessage" v-show="cultureOnload == false && cultureList.length == 0">
                                    <img src="../assets/yw_error.png" alt> <span>暂时没有该类课程。。。</span>
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
            heartList: []
        }
    },
    mounted () {
        // document.addEventListener('click', (e) => {
        //     if (e.target.className != 'h_tp_bp_add') {
        //         this.addType = false
        //     }
        // })
        this.render()
    },
    methods: {
        ...mapActions(['saveCourseInfo']),
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
            this.$router.push({ path: '/newsDetails', query: { ref: this.heartList[0].articleContent } })
        },
        async render () {
            const notice = await getNoticeInfoList({
                Page: 1,
                PageCount: 5
            }) // 顶部通知栏

            if (notice.NoticeInfoList.length > 0) {
                notice.NoticeInfoList = [...notice.NoticeInfoList, notice.NoticeInfoList[0]]
                this.noticeList = notice.NoticeInfoList
            }

            const bannerInfo = await getArticleInfoList({
                method: 'getArticleInfoList',
                Channel_id: '69',
                Page: 1,
                PageCount: 3
            })  // 首页轮播图
            console.log(bannerInfo)
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

            // console.log(heart)
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
                channelId: '105',
                Page: 1,
                PageCount: 4
            })  // 业务知识
            const compre = await getCourseInfoListAll({ 
                method: 'getCourseInfoList',
                channelId: '106',
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
            let res = { result: '1' }
            if (item.IsSelect != '1') {
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
        background: #b20012;
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
            // .h_tp_bp_add{
            //     width: toRem(50px);
            //     height: toRem(92px);
            //     line-height: toRem(92px);
            //     text-align: center;
            //     img{
            //         width: toRem(38px);
            //         height: toRem(38px);
            //     }
            // }
            // .h_tp_bp_addfunction{
            //     width: toRem(190px);
            //     height: toRem(229px);
            //     border-radius: toRem(15px);
            //     position: absolute;
            //     top: toRem(92px);
            //     right: toRem(-6px);
            //     &::before{
            //         content: '';
            //         width: toRem(20px);
            //         height: toRem(20px);
            //         background: #f2f4f6;
            //         transform: rotateZ(45deg);
            //         display: inline-block;
            //         position: absolute;
            //         right: toRem(21px);
            //         top: toRem(-12px);
            //     }
            //     .h_tp_bp_afinner{
            //         width: toRem(190px);
            //         height: toRem(229px);
            //         border-radius: toRem(15px);
            //         position: relative;
            //         background: #f2f4f6;
            //         overflow: hidden;
            //         ul{
            //             li{
            //                 height: toRem(77px);
            //                 border-bottom: 1px solid #ddd;
            //                 &:first-of-type{
            //                     display: flex;
            //                     align-items: center;
            //                     img{
            //                         width: toRem(40px);
            //                         height: toRem(40px);
            //                         margin-left: toRem(21px);
            //                         margin-right: toRem(18px);
            //                     }
            //                     span{
            //                         font-size: 0.4rem;
            //                         font-weight: bold;
            //                     }
            //                 }
            //                 &:nth-of-type(2){
            //                     display: flex;
            //                     align-items: center;
            //                     .imgpart{
            //                         position: relative;
            //                         margin-left: toRem(21px);
            //                         margin-right: toRem(18px);
            //                         img{ 
            //                             width: toRem(38px);
            //                             height: toRem(34px);
            //                         }
            //                     }
            //                     span{
            //                         font-size: 0.4rem;
            //                         font-weight: bold;
            //                     }

            //                 }
            //                 &:last-of-type{
            //                     display: flex;
            //                     align-items: center;
            //                     img{
            //                         width: toRem(36px);
            //                         height: toRem(36px);
            //                         margin-left: toRem(21px);
            //                         margin-right: toRem(18px);
            //                     }
            //                     span{
            //                         font-size: 0.4rem;
            //                         font-weight: bold;
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }
        }
    }
    .h_content{
        width: 100%;
        padding-top: toRem(92px);
        background: #fff;
        .h_ct_imgpart{
            width: toRem(690px);
            height: toRem(360px);
            margin: toRem(30px) auto 0;
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
                display: flex;
                width: 100%;
                height: toRem(80px);
                background: rgba(0,0,0,0.5);
                position: absolute;
                left: 0;
                bottom: 0;
                .h_ct_ip_wpdate{
                    width: toRem(120px);
                    height: 100%;
                    background: $brand-primary;
                    color: #fff;
                    .h_ct_ip_wpdate_date{
                        height: toRem(50px);
                        line-height: toRem(50px);
                        text-align: center;
                        font-size: 0.7rem;
                        font-weight: bold;
                    }
                    .h_ct_ip_wpdate_year{
                        text-align: center;
                        font-size: 0.25rem;
                    }
                }
                .h_ct_ip_wptitle{
                    height: toRem(80px);
                    line-height: toRem(80px);
                    padding-right: toRem(15px);
                    text-indent: 0.5rem;
                    color: #fff;
                    font-size: 0.45rem;
                    // @include ellipsis_two(1);
                }
            }
        }
        .h_ct_nav{
            width: toRem(690px);
            height: toRem(510px);
            padding-top: toRem(30px);
            margin: 0 auto;
            ul{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                li{
                    width: 30%;
                    height: toRem(215px);
                    text-align: center;
                    a{
                        width: 1.6rem;
                        height: 100%;
                        padding-top: toRem(30px);
                        text-align: center;
                        display: inline-block;
                        img{
                            width: toRem(120px);
                            height: toRem(119px);
                        }
                        p{
                            margin-top: toRem(15px);
                            font-size: 0.35rem;
                            font-weight: 500;
                        }
                    }
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
                    font-size: 0.5rem;
                }
                .h_ct_left_content{
                    font-size: 0.35rem;
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
                        font-size: 0.4rem;
                        font-weight: bold;
                    }
                    .h_ct_active{
                        color: #b20012;
                    }
                }
                .is-selected{
                    border-bottom: 0.08rem solid #b20012;
                }
            }
            .h_ct_ctl_courselist{
                width: 100%;
                padding-bottom: toRem(118px);
                background: #f2f4f6;
                padding-top: toRem(29px);
                .h_ct_ctl_clinner{
                    width: toRem(710px);
                    height: toRem(1010px);
                    margin: 0 auto;
                    border-radius: toRem(15px);
                    background: #fff;
                    ul{
                        padding: 0 toRem(20px);
                        display: flex;
                        flex-wrap: wrap;
                        li{
                            width: toRem(334px);
                            height: toRem(488px);
                            a{
                                display: inline-block;
                                width: 100%;
                                height: 100%;
                                padding-top: toRem(30px);
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
                                margin: toRem(25px) auto 0;
                                text-align: left;
                                font-size: 0.4rem;
                                font-weight: bold;
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
                                    img{
                                        width: toRem(36px);
                                        height: toRem(24px);
                                        position: relative;
                                        bottom: toRem(4px);
                                    }
                                    span{
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