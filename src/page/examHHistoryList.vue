<template>
    <div class="examHHistoryList container_top">
        <header-fix title="历史列表" fixed>
            <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
        </header-fix>
        <div class="ehhl_listpart">
            <exam-heart-list
                :examData="examList"
                :noDataBg="noDataBg"
                :noData="noData"
                :openResult="openResult"
            >
            </exam-heart-list>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { GetUserTestHistory } from '../service/getData'
import { analyResult, analyAnxiety, analyDepression, analySleep } from '../plugins/utils'

export default {
    name: 'examHHistoryList',
    data () {
        return {
            examId: this.$route.query.ExamID,
            examList: [],
            noDataBg: false,
            noData: false
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    mounted () {
        this.render()
    },
    methods: {
        goBack () {
            this.$router.push({ path: '/examHResultList' })
        },
        openResult (index) {
            this.examList[index].clickType = !this.examList[index].clickType
        },
        async render () {
            let msg = await GetUserTestHistory({
                ExamID: this.examId,
                UserID: this.userInfo.UserID
            })
            console.log(msg)
            if (this.examId == '2076' || this.examId == '2454') {
                msg.forEach(item => {
                    item.clickType = false
                    item.Result = item.Result.replace(/'/g, '"')
                    item.Result = analyResult(JSON.parse(item.Result))
                });
            } else if (this.examId == '2453' || this.examId == '2075') {
                msg.forEach(item => {
                    item.clickType = false
                    item.Result = item.Result.replace(/'/g, '"')
                    item.Result = analyDepression(JSON.parse(item.Result))
                })
            } else if (this.examId == '2452' || this.examId == '2074') {
                msg.forEach(item => {
                    item.clickType = false
                    item.Result = item.Result.replace(/'/g, '"')
                    item.Result = analyAnxiety(JSON.parse(item.Result))
                })
            } else if (this.examId == '2077' || this.examId == '2455') {
                msg.forEach(item => {
                    item.clickType = false
                    item.Result = item.Result.replace(/'/g, '"')
                    item.beforeTreatment = JSON.parse(item.Result) //记录结果和填空题答案记录
                    item.Result = analySleep(JSON.parse(item.Result))
                })
            }

            this.examList = msg
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.examHHistoryList{

}
</style>