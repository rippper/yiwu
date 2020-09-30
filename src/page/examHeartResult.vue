<template>
    <div class="examHeartResult container_top">
        <header-fix title="测试结果" fixed></header-fix>
        <div class="ehr_content">
            <div class="ehr_resulttitle">
                <p>您的测试结果为：</p>
                <div class="ehr_normalresult" v-show="examId == '2452' || examId == '2453' || examId == '2074' || examId == '2075'">
                    <div class="ehr_nr_inner">
                        <ul>
                            <li :class="{ ehr_nr_show: circleShow == 1 }">
                                <img src="../assets/yw_heartnone.png" alt>
                            </li>
                            <li :class="{ ehr_nr_show: circleShow == 2 }">
                                <img src="../assets/yw_heartmild.png" alt>
                            </li>
                            <li :class="{ ehr_nr_show: circleShow == 3 }">
                                <img src="../assets/yw_heartmiddle.png" alt>
                            </li>
                            <li :class="{ ehr_nr_show: circleShow == 4 }">
                                <img src="../assets/yw_hearthard.png" alt>
                            </li>
                            <li>
                                <p v-text="showResult"></p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="ehr_eclresult" v-show="examId == '2076' || examId == '2454'">
                    <ul>
                        <li v-for="(item, key, index) in sclResult" :key="index">
                            <span v-text="key"></span>: <span v-text="item"></span>
                        </li>
                    </ul>
                </div>
                <div class="ehr_sleepresult" v-show="examId == '2077' || examId == '2455'">
                    <p>您本次测试的PSQI分数为：<span v-text="this.sleepResult"></span>(PSQI总分范围为0-21分，分值越高，表示睡眠质量越差。)</p>
                </div>
            </div>
            <div class="ehr_btnpart">
                <div class="ehr_bp_btn" @click="goExam">
                    重新测试
                </div>
                <div class="ehr_bp_btn" @click="linkTo">
                    结束测试
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { analyResult } from '../plugins/utils'

export default {
    name: 'examHeartResult',
    data () {
        return {
            examId: this.$route.query.examId,
            result: JSON.parse(this.$route.query.result),
            sclResult: '', // scl 心理测试结果
            showResult: '', // 焦虑 抑郁 心理测试结果
            sleepResult: '',
            JLResult: ['无焦虑', '轻度焦虑', '中度焦虑', '重度焦虑'],
            YYResult: ['无抑郁', '轻度抑郁', '中度抑郁', '重度抑郁'],
            circleShow: 1
        }
    },
    mounted () {
        this.render()
        console.log(this.result)
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        linkTo () {
            this.$router.push({ path: '/examHeartList' })
        },
        goExam () {
            this.$router.push({path: '/exam', query: {id: this.examId, type: 'heart'}});
        },
        async render () {
            if (this.examId == '2074' || this.examId == '2452') {
                if (this.result.result < 50) {
                    this.circleShow = 1
                    this.showResult = this.JLResult[0]
                } else if (this.result.result <= 59 && this.result.result >= 50) {
                    this.circleShow = 2
                    this.showResult = this.JLResult[1]
                } else if (this.result.result <= 69 && this.result.result >= 60) {
                    this.circleShow = 3
                    this.showResult = this.JLResult[2]
                } else if (this.result.result >= 70) {
                    this.circleShow = 4
                    this.showResult = this.JLResult[3]
                }
            } else if (this.examId == '2075' || this.examId == '2453') {
                if (this.result.result < 53) {
                    this.circleShow = 1
                    this.showResult = this.YYResult[0]
                } else if (this.result.result <= 62 && this.result.result >= 53) {
                    this.circleShow = 2
                    this.showResult = this.YYResult[1]
                } else if (this.result.result <= 72 && this.result.result >= 63) {
                    this.circleShow = 3
                    this.showResult = this.YYResult[2]
                } else if (this.result.result >= 73) {
                    this.circleShow = 4
                    this.showResult = this.YYResult[3]
                }
            } else if (this.examId == '2076' || this.examId == '2454') {
                this.sclResult = analyResult(this.result)
                console.log(this.sclResult)
            } else if (this.examId == '2077' || this.examId == '2455') {
                this.sleepResult = this.result.result
                console.log(this.sleepResult)
            }
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.examHeartResult{
    max-width: 10rem;
    margin: 0 auto;
    background: #fff;
    .ehr_content{
        width: 100%;
        .ehr_bannerImg{
            width: toRem(690px);
            height: toRem(320px);
            margin: toRem(30px) auto 0;
            img{
                width: toRem(690px);
            }
        }
        .ehr_resulttitle{
            width: toRem(690px);
            margin: toRem(60px) auto;
            > p{
                font-size: toRem(37px);
                font-weight: bold;
            }
            .ehr_normalresult{
                width: toRem(690px);
                height: toRem(460px);
                position: relative;
                .ehr_nr_inner{
                    width: toRem(300px);
                    height: toRem(300px);
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                    transition: 0.5s;
                    ul{
                        li{
                            width: toRem(300px);
                            height: toRem(300px);
                            position: absolute;
                            top: 0;
                            left: 0;
                            opacity: 0;
                            &:last-of-type{
                                opacity: 1;
                            }
                        }
                        .ehr_nr_show{
                            opacity: 1;
                        }
                    }
                    p{
                        width: toRem(160px);
                        height: toRem(60px);
                        line-height: toRem(60px);
                        margin: auto;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        font-size: toRem(38px);
                        font-weight: bold;
                        color: #fff;
                        text-align: center;
                    }
                    img{
                        width: toRem(300px);
                        height: toRem(300px);
                    }
                }
            }
            .ehr_eclresult{
                margin-top: toRem(30px);
                ul{
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        width: 50%;
                    }
                }
            }
            .ehr_sleepresult{
                font-size: toRem(37px);
            }
        }
        .ehr_btnpart{
            width: toRem(690px);
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .ehr_bp_btn{
                width: toRem(320px);
                height: toRem(80px);
                line-height: toRem(80px);
                border-radius: toRem(80px);
                background: linear-gradient(to right, #fc773d, #f81302);
                color: #fff;
                font-size: toRem(32px);
                text-align: center;
            }
        }
    }
}
</style>