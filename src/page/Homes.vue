<template>
    <div class="home">
        <div class="h_top">
            <img src="../assets/yw_logo.png" alt="">
            <div class="h_tp_btnpart">
                <div class="h_tp_bp_search">
                    <img src="../assets/yw_search.png" alt>
                </div>
                <div class="h_tp_bp_add" @click.stop="openAdd">
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
                </div>
            </div>
        </div>
        <div class="h_content">
            <div class="h_ct_notice">
                <div class="h_ct_noticebox">
                    <img src="../assets/yw_notice.png" alt>
                    <div class="h_ct_nb_notice">
                        <ul>
                            <li v-for="(item, index) in noticeList" :key="index+item">
                                <a href="javascript:;" v-text="item.content"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="h_ct_imgpart">
                <img src="../assets/example/example001.jpg" alt>
            </div>
            <div class="h_ct_nav">
                <ul>
                    <li>
                        <a href="javascript:;">
                            <div>
                                <img src="../assets/yw_rank.png" alt>
                            </div>
                            <p>
                                <span>资讯</span>
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <div>
                                <img src="../assets/yw_zixun.png" alt>
                            </div>
                            <p>
                                <span>资讯</span>
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <div>
                                <img src="../assets/yw_tongzhi.png" alt>
                            </div>
                            <p>
                                <span>通知</span>
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <div>
                                <img src="../assets/yw_kecheng.png" alt>
                            </div>
                            <p>
                                <span>心理课程</span>
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <div>
                                <img src="../assets/yw_ceshi.png" alt>
                            </div>
                            <p>
                                <span>心理测试</span>
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
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
                    <a href="javascript:;">
                        查看更多
                    </a>
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
                            <span>当前热点</span>
                        </p>
                    </mt-tab-item>
                    <mt-tab-item id="2">
                        <div class="h_ct_imgbox">
                            <img src="../assets/yw_fagui.png" alt v-show="selected != 2">
                            <img src="../assets/yw_faguist.png" alt v-show="selected == 2">
                        </div>
                        <p :class="{'h_ct_active': selected == 2}">
                            <span>必修课程</span>
                        </p>
                    </mt-tab-item>
                    <mt-tab-item id="3">
                        <div class="h_ct_imgbox">
                            <img src="../assets/yw_zhishi.png" alt v-show="selected != 3">
                            <img src="../assets/yw_zhishist.png" alt v-show="selected == 3">
                        </div>
                        <p :class="{'h_ct_active': selected == 3}">
                            <span>选修课程</span>
                        </p>
                    </mt-tab-item>
                    <mt-tab-item id="4">
                        <div class="h_ct_imgbox">
                            <img src="../assets/yw_renwen.png" alt v-show="selected != 4">
                            <img src="../assets/yw_renwenst.png" alt v-show="selected == 4">
                        </div>
                        <p :class="{'h_ct_active': selected == 4}">
                            <span>综合管理</span>
                        </p>
                    </mt-tab-item>
                </mt-navbar>
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                        <div class="h_ct_ctl_courselist">
                            <div class="h_ct_ctl_clinner">
                                <ul>
                                    <li v-for="(item, index) in sopportList" :key="index+item">
                                        <a href="javascript:;">
                                            <div class="h_ct_ctl_image">
                                                <img :src="item.Course_img" alt v-if="item.Course_img">
                                                <img src="../assets/example/example002.jpg" alt v-else>
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
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div class="h_ct_ctl_courselist">
                            <div class="h_ct_ctl_clinner">
                                <ul>
                                    <li v-for="(item, index) in legelList" :key="index+item">
                                        <a href="javascript:;">
                                            <div class="h_ct_ctl_image">
                                                <img :src="item.Img" alt>
                                            </div>
                                            <p class="h_ct_ctl_title" v-text="item.Title"></p>
                                            <div class="h_ct_ctl_scoreadtype">
                                                <div>
                                                    学时：<span v-text="item.Score"></span>
                                                </div>
                                                <div>
                                                    类型：<span>视频</span>
                                                </div>
                                            </div>
                                            <div class="h_ct_ctl_selectadwatch">
                                                <div class="h_ct_ctl_selectadwatch_left">
                                                    <img src="../assets/yw_select.png" alt v-if="item.Select">
                                                    <img src="../assets/yw_noselect.png" alt v-else>
                                                </div>
                                                <div class="h_ct_ctl_selectadwatch_right">
                                                    <img src="../assets/yw_watch.png" alt>
                                                    <span v-text="item.Watcher"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <div class="h_ct_ctl_courselist">
                            <div class="h_ct_ctl_clinner">
                                <ul>
                                    <li v-for="(item, index) in businessList" :key="index+item">
                                        <a href="javascript:;">
                                            <div class="h_ct_ctl_image">
                                                <img :src="item.Img" alt>
                                            </div>
                                            <p class="h_ct_ctl_title" v-text="item.Title"></p>
                                            <div class="h_ct_ctl_scoreadtype">
                                                <div>
                                                    学时：<span v-text="item.Score"></span>
                                                </div>
                                                <div>
                                                    类型：<span>视频</span>
                                                </div>
                                            </div>
                                            <div class="h_ct_ctl_selectadwatch">
                                                <div class="h_ct_ctl_selectadwatch_left">
                                                    <img src="../assets/yw_select.png" alt v-if="item.Select">
                                                    <img src="../assets/yw_noselect.png" alt v-else>
                                                </div>
                                                <div class="h_ct_ctl_selectadwatch_right">
                                                    <img src="../assets/yw_watch.png" alt>
                                                    <span v-text="item.Watcher"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="4">
                        <div class="h_ct_ctl_courselist">
                            <div class="h_ct_ctl_clinner">
                                <ul>
                                    <li v-for="(item, index) in cultureList" :key="index+item">
                                        <a href="javascript:;">
                                            <div class="h_ct_ctl_image">
                                                <img :src="item.Img" alt>
                                            </div>
                                            <p class="h_ct_ctl_title" v-text="item.Title"></p>
                                            <div class="h_ct_ctl_scoreadtype">
                                                <div>
                                                    学时：<span v-text="item.Score"></span>
                                                </div>
                                                <div>
                                                    类型：<span>视频</span>
                                                </div>
                                            </div>
                                            <div class="h_ct_ctl_selectadwatch">
                                                <div class="h_ct_ctl_selectadwatch_left">
                                                    <img src="../assets/yw_select.png" alt v-if="item.Select">
                                                    <img src="../assets/yw_noselect.png" alt v-else>
                                                </div>
                                                <div class="h_ct_ctl_selectadwatch_right">
                                                    <img src="../assets/yw_watch.png" alt>
                                                    <span v-text="item.Watcher"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
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
import { bottomBar } from '../components';
import { 
    getCourseInfoListAll, 
    getChannelInfoList
} from '../service/getData'
export default {
    name: 'home',
    data () {
        return {
            addType: false,
            noticeList: [
                {
                    content: '青春多么美丽！它充满了色彩和梦想。青春是这本书的第一章，它是一个永无止境的故事。 关于青春的格言'
                },
                {
                    content: '白日莫空过，青春不再来。林宽 2、百金买骏马，千金买美人;万金买高爵，何处买青春?屈原'
                },
                {
                    content: '青春是不耐久藏的东西。莎士比亚 4、青春时光转眼即逝。贺拉斯 5、青春留不住，白发'
                },
                {
                    content: '青春多么美丽！它充满了色彩和梦想。青春是这本书的第一章，它是一个永无止境的故事。 关于青春的格言'
                }
            ],
            selected: '1',
            sopportList: [],
            legelList: [
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '让改革发展成果惠及全体人民',
                    Score: '1.0',
                    Type: '音频',
                    Select: true,
                    Watcher: '2198'
                },
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '让改革发展成果惠及全体人民',
                    Score: '1.0',
                    Type: '音频',
                    Select: true,
                    Watcher: '2198'
                },
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '让改革发展成果惠及全体人民',
                    Score: '1.0',
                    Type: '音频',
                    Select: true,
                    Watcher: '2198'
                },
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '让改革发展成果惠及全体人民',
                    Score: '1.0',
                    Type: '音频',
                    Select: true,
                    Watcher: '2198'
                }
            ],            
            businessList: [
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '让改革发展成果惠及全体人民',
                    Score: '1.0',
                    Type: '音频',
                    Select: true,
                    Watcher: '2198'
                },
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '让改革发展成果惠及全体人民',
                    Score: '1.0',
                    Type: '音频',
                    Select: true,
                    Watcher: '2198'
                },
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '让改革发展成果惠及全体人民',
                    Score: '1.0',
                    Type: '音频',
                    Select: true,
                    Watcher: '2198'
                },
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '让改革发展成果惠及全体人民',
                    Score: '1.0',
                    Type: '音频',
                    Select: true,
                    Watcher: '2198'
                }
            ],            
            cultureList: [
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '让改革发展成果惠及全体人民',
                    Score: '1.0',
                    Type: '音频',
                    Select: true,
                    Watcher: '2198'
                },
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '让改革发展成果惠及全体人民',
                    Score: '1.0',
                    Type: '音频',
                    Select: true,
                    Watcher: '2198'
                },
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '让改革发展成果惠及全体人民',
                    Score: '1.0',
                    Type: '音频',
                    Select: true,
                    Watcher: '2198'
                },
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '让改革发展成果惠及全体人民',
                    Score: '1.0',
                    Type: '音频',
                    Select: true,
                    Watcher: '2198'
                }
            ]
        }
    },
    mounted () {
        document.addEventListener('click', (e) => {
            if (e.target.className != 'h_tp_bp_add') {
                this.addType = false
            }
        })
        this.render()
    },
    methods: {
        openAdd () {
            this.addType = true
        },

        async render () {
            let info = await getChannelInfoList({
            })
            console.log(info)
            let msg = await getCourseInfoListAll({ 
                method: 'getCourseInfoList',
                channelId: '30',
                Page: 1,
                PageCount: 4
            })
            console.log(msg)
            this.sopportList = msg.CourseInfoList
            console.log(this.sopportList.length)
            //method: 'getCourseInfoList',selecttype: 1,channelId: '',UserID: '',Keyword: '',Page: 1，PageCount: 4
        }
    },
    components: {
        bottomBar
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
            width: toRem(110px);
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
            .h_tp_bp_add{
                width: toRem(50px);
                height: toRem(92px);
                line-height: toRem(92px);
                text-align: center;
                img{
                    width: toRem(38px);
                    height: toRem(38px);
                }
            }
            .h_tp_bp_addfunction{
                width: toRem(190px);
                height: toRem(229px);
                border-radius: toRem(15px);
                position: absolute;
                top: toRem(92px);
                right: toRem(-6px);
                &::before{
                    content: '';
                    width: toRem(20px);
                    height: toRem(20px);
                    background: #f2f4f6;
                    transform: rotateZ(45deg);
                    display: inline-block;
                    position: absolute;
                    right: toRem(21px);
                    top: toRem(-12px);
                }
                .h_tp_bp_afinner{
                    width: toRem(190px);
                    height: toRem(229px);
                    border-radius: toRem(15px);
                    position: relative;
                    background: #f2f4f6;
                    overflow: hidden;
                    ul{
                        li{
                            height: toRem(77px);
                            border-bottom: 1px solid #ddd;
                            &:first-of-type{
                                display: flex;
                                align-items: center;
                                img{
                                    width: toRem(40px);
                                    height: toRem(40px);
                                    margin-left: toRem(21px);
                                    margin-right: toRem(18px);
                                }
                                span{
                                    font-size: 0.4rem;
                                    font-weight: bold;
                                }
                            }
                            &:nth-of-type(2){
                                display: flex;
                                align-items: center;
                                .imgpart{
                                    position: relative;
                                    margin-left: toRem(21px);
                                    margin-right: toRem(18px);
                                    img{ 
                                        width: toRem(38px);
                                        height: toRem(34px);
                                    }
                                }
                                span{
                                    font-size: 0.4rem;
                                    font-weight: bold;
                                }

                            }
                            &:last-of-type{
                                display: flex;
                                align-items: center;
                                img{
                                    width: toRem(36px);
                                    height: toRem(36px);
                                    margin-left: toRem(21px);
                                    margin-right: toRem(18px);
                                }
                                span{
                                    font-size: 0.4rem;
                                    font-weight: bold;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .h_content{
        width: 100%;
        padding-top: toRem(92px);
        background: #fff;
        .h_ct_notice{
            height: toRem(118px);
            padding-top: toRem(50px);
            .h_ct_noticebox{
                width: toRem(690px);
                height: toRem(68px);
                margin: 0 auto;
                border-radius: toRem(68px);
                background: #f2f4f6;
                display: flex;
                align-items: center;
                img{
                    width: toRem(34px);
                    height: toRem(29px);
                    margin: {
                        right: toRem(30px);
                        left: toRem(22px);
                    }
                }
                .h_ct_nb_notice{
                    width: toRem(535px);
                    height: toRem(68px);
                    position: relative;
                    overflow: hidden;
                    ul{
                        position: absolute;
                        top: 0;
                        left: 0;
                        li{
                            width: 100%;
                            height: toRem(68px);
                            line-height: toRem(68px);
                            font-size: 0.35rem;
                            @include ellipsis_two(1);
                            a{
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
        .h_ct_imgpart{
            width: toRem(690px);
            height: toRem(360px);
            margin: toRem(30px) auto 0;
            border-radius: toRem(15px);
            overflow: hidden;
            img{
                width: toRem(690px);
                height: toRem(360px);
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
                    a{
                        width: 100%;
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
                }
            }
        }
    }
}
</style>