<template>
    <div class="examHistoryList">
        <ul>
            <li v-for="(item, index) in examData" :key="index">
                <div class="ehl_historyItem" @click="linkToRecord(item)">
                    <p>
                        考试提交时间：
                        <span v-text="item.Createdate"></span>
                    </p>
                    <div class="ehl_hi_checkresultbtn" @click.stop="openResult(index)">查看结果</div>
                </div>
                <div class="ehl_historyResultBox" :class="{ ehl_hrb_open: item.clickType }">
                    <p>本次测试结果：</p>
                    <ul>
                        <li v-for="(item, key, index) in item.Result" :key="index">
                            <span v-text="key"></span>: <span v-text="item"></span>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="noDataBg" v-if="noDataBg"></div>
        <div class="no-data" v-if="noData">没有更多内容了...</div>
    </div>
</template>

<script>
export default {
    name: 'examHistoryList',
    props: {
        examData: Array,
        noDataBg: {
            type: Boolean,
            default: false
        },
        noData: {
            type: Boolean,
            default: false
        },
        openResult: Function
    },
    mounted () {
        console.log(this.examData)
    },
    methods: {
        linkToRecord (item) {
            if (item.examid == '2077' || item.examid == '2455') {
                this.$router.push({ path: '/examReview', query: { examId: item.examid, Ticket: item.TicketId, Type: 'heart', fillResult: item.beforeTreatment.data1 } })
            } else {
                this.$router.push({ path: '/examReview', query: { examId: item.examid, Ticket: item.TicketId, Type: 'heart' } })
            }
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.examHHistoryList{
    ul{
        li{
            .ehl_historyItem{
                height: toRem(80px);
                line-height: toRem(80px);
                padding: 0 toRem(30px);
                border-bottom: 1px solid #d1d1d1;
                background: #fff;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.35rem;
                .ehl_hi_checkresultbtn{
                    width: toRem(130px);
                    height: toRem(70px);
                    line-height: toRem(70px);
                    border-radius: toRem(5px);
                    text-align: center;
                    font-size: 0.35rem;
                    color: #fff;
                    background: $brand-primary;
                }
            }
            .ehl_historyResultBox{
                max-height: 0;
                box-sizing: border-box;
                transition: 0.3s;
                overflow: hidden;
                background: #fafafa;
                p{
                    padding: 0 toRem(30px);
                    height: toRem(60px);
                    line-height: toRem(60px);
                    font-size: 0.35rem;
                }
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    padding: 0 toRem(30px);
                    padding-bottom: toRem(30px);
                    border-bottom: 1px solid #d1d1d1;
                    li{
                        width: 50%;
                        font-size: 0.35rem;
                    }
                }
            }
            .ehl_hrb_open{
                max-height: toRem(320px);
            }
        }
    }
}
</style>