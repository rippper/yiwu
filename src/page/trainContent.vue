<template>
    <div class="trainContent">
        <header-fix title="培训班详情" fixed>
            <div slot="left">
                <div class="tc_gobackbtn" @click="goBack"></div>
            </div>
        </header-fix>
        <div class="tc_content">
            <div class="tc_content_title" v-text="trainDetail.tc_Name"></div>
            <div class="tc_content_applyDate">
                <div class="tc_ct_title">报名时间</div>
                <div class="tc_ct_time" v-text="trainDetail.tc_SignStartTime + '~' + trainDetail.tc_SignEndTime"></div>
            </div>
            <div class="tc_content_trainDate">
                <div class="tc_ct_title">培训时间</div>
                <div class="tc_ct_time" v-text="trainDetail.tc_StartTime + '~' + trainDetail.tc_EndTime"></div>
            </div>
            <div class="tc_content_trainType">
                <div class="tc_ct_title">报名状态</div>
                <div class="tc_ct_time" v-text="applyTypeWord"></div>
            </div>
            <div class="tc_btngroup">
                <div class="tc_btngroup_course" @click="linkToCourseList">
                    <div class="tc_btngroup_course_inner">
                        培训班课程
                    </div>
                </div>
                <div class="tc_btngroup_exam" @click="linkToTrainList">培训班测试</div>
                <div class="tc_btngroup_apply" v-if="trainDetail.cansign == 1">
                    <div class="tc_bga_apply" v-if="applyType == 0" @click="makeApply">立即报名</div>
                    <div class="tc_bga_cancel" v-else-if="applyType == 1" @click="cancelApply">取消报名</div>
                    <div class="tc_bga_success" v-else-if="applyType == 2">报名成功</div>
                    <div class="tc_bga_fail" v-else-if="applyType == 3">报名未通过</div>
                </div>
                <div class="tc_btngroup_apply" v-else-if="trainDetail.cansign == 0">
                    <div class="tc_bga_fail">无法报名</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { headerFix } from '../components';
import { GetTrainingDetail, SignUp, SignOff, CheckCanTrainingExam } from '../service/getData';
import { mapState } from 'vuex';
import { Toast, MessageBox } from 'mint-ui';

export default {
    name: 'trainContent',
    data () {
        return {
            trainId: '',
            trainDetail: '',
            applyType: '', // 0 未报名， 1 报名审核中， 2 报名审核通过， 3 报名未通过
            applyTypeWord: '',
            title: '数据库搭建开发技术垄断积累看似简单介绍是看得见风景收到两份简历都是jfk角度思考了肌肤拉克丝的借了绝对是'
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created () {
        this.trainId = this.$route.query.Id
    },
    mounted () {
        this.GetTrainingDetail()
    },
    methods: {
        goBack () {
            this.$router.push({ path: '/trainList' })
        },
        linkToCourseList () {
            if (this.applyType != 2) {
                MessageBox('提示', '请先报名培训班！');
                return false
            }
            this.$router.push({path: '/trainCourseList', query: { Id: this.trainId }})
        },
        async linkToTrainList () {
            let msg = await CheckCanTrainingExam({
                UserID: this.userInfo.UserID,
                tid: this.trainId
            })
            if (msg.result == "true") {
                this.$router.push({ path: '/trainExamList', query: { Id: this.trainId } })
            } else {
                MessageBox('提示', '完成所有培训班课程，才能参加考试。');
            } 
        },
        async cancelApply () {
            let msg = await SignOff({
                UserID: this.userInfo.UserID,
                tid: this.trainId
            })
            if (msg.Result == 1) {
                Toast({
                    message: '已取消报名',
                    position: 'bottom',
                    duration: 2000
                });
                this.applyType = 0
                this.applyTypeWord = '未报名'
            }
        },
        async makeApply () {
            console.log(this.trainDetail)
            let time = new Date(this.trainDetail.tc_SignEndTime).getTime()
            let nowTime = new Date().getTime()
            if (nowTime - time > 0) {
                Toast({
                    message: '已过期，无法报名',
                    position: 'bottom',
                    duration: 2000
                });
                 return false
            }
            let msg = await SignUp({
                UserID: this.userInfo.UserID,
                tid: this.trainId
            })
            if (msg.Result == 1) {
                Toast({
                    message: '报名成功，请等待审核',
                    position: 'bottom',
                    duration: 2000
                });
                this.applyType = 1
                this.applyTypeWord = '报名审核中'
            }
        },
        async GetTrainingDetail () {
            let msg = await GetTrainingDetail({
                UserID: this.userInfo.UserID,
                tid: this.trainId
            })
            this.trainDetail = msg[0]
            if (msg[0].tc_isup == '未报名') {
                this.applyType = 0
                this.applyTypeWord = '未报名'
            } else if (msg[0].tc_isup == '报名审核中') {
                this.applyType = 1
                this.applyTypeWord = '报名审核中'
            } else if (msg[0].tc_isup == '报名审核通过') {
                this.applyType = 2
                this.applyTypeWord = '报名审核通过'
            } else if (msg[0].tc_isup == '报名未通过') {
                this.applyType = 3
                this.applyTypeWord = '报名未通过'
            }
        }
    },
    components: {
        headerFix
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.trainContent{
    max-width: 10rem;
    height: 100vh;
    margin: 0 auto;
    background: #fff;
    .tc_gobackbtn{
        width: toRem(60px);
        height: toRem(92px);
        background: url('../assets/arrow.png') no-repeat 50% 50%;
        background-size: toRem(20px) toRem(35px);
    }
    .tc_content{
        width: 100%;
        padding: toRem(92px) toRem(30px) 0;
        .tc_content_title{
            max-height: toRem(110px);
            padding-top: toRem(30px);
            font-size: toRem(40px);
            box-sizing: content-box;
            @include ellipsis_two;
        }
        .tc_content_applyDate{
            height: toRem(80px);
            line-height: toRem(80px);
            margin-top: toRem(30px);
            border-top: toRem(1px) solid #ececec;
            display: flex;
        }
        .tc_content_trainDate{
            height: toRem(80px);
            line-height: toRem(80px);
            border-top: toRem(1px) solid #ececec;
            display: flex;
        }
        .tc_content_trainType{
            height: toRem(80px);
            line-height: toRem(80px);
            border-top: toRem(1px) solid #ececec;
            display: flex;
        }
        .tc_ct_title{
            width: 25%;
            color: #888;
        }
        .tc_ct_time{
            width: 75%;
        }
        .tc_btngroup{
            width: 100%;
            height: toRem(120px);
            line-height: toRem(120px);
            text-align: center;
            display: flex;
            position: absolute;
            bottom: 0;
            left: 0;
            .tc_btngroup_course{
                flex: 1;
                display: flex;
                align-items: center;
                .tc_btngroup_course_inner{
                    width: 100%;
                    height: toRem(60px);
                    line-height: toRem(60px);
                    border-right: 1px solid #cecece;
                }
            }
            .tc_btngroup_exam{
                flex: 1;
            }
            .tc_btngroup_apply{
                flex: 2;
                color: #fff;
                font-size: toRem(32px);
                .tc_bga_apply{
                    width: 100%;
                    height: 100%;
                    background: #8dc63f;
                }
                .tc_bga_cancel{
                    width: 100%;
                    height: 100%;
                    background: #e54d42;
                }
                .tc_bga_success{
                    width: 100%;
                    height: 100%;
                    background: #39b54a;
                }
                .tc_bga_fail{
                    width: 100%;
                    height: 100%;
                    background: #8799a3;
                }
            }
        }
    }
}
</style>