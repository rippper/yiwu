<template>
    <div class="trainexamlist">
        <header-fix title="考试列表" fixed>
            <div slot="left">
                <div class="tc_gobackbtn" @click="goBack"></div>
            </div>
        </header-fix>
        <div class="tel_content">
            <section v-infinite-scroll="GetTrainningClasExamList"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-distance="10">
                <exam-list :exam-data="testList"
                        :no-data-bg="noDataBg"
                        :no-data="noData"
                        :examType="'train'"
                        @refreshExamList="refreshExamList">
                </exam-list>
            </section>
        </div>
    </div>
</template>

<script>
import { headerFix, examList } from '../components';
import { goBack } from "../service/mixins";
import { GetTrainningClasExamList } from '../service/getData';
import { mapState } from 'vuex';
import { Indicator } from 'mint-ui';

export default {
    name: 'trainexamlist',
    mixins: [goBack],
    data () {
        return {
            trainID: '',
            testList: [],
            totalCount: 0,
            noData: false,
            noDataBg: false,
            Page: 0,
            Rows: 10
        }
    },
    created () {
        this.trainID = this.$route.query.Id
    },
    mounted () {
        this.GetTrainningClasExamList()
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        async GetTrainningClasExamList () {
            Indicator.open()
            this.loading = true
            let msg = await GetTrainningClasExamList({
                UserID: this.userInfo.UserID,
                tid: this.trainID,
                Page: this.Page,
                PageSize: this.Rows
            })
            this.loading = false
            Indicator.close()
            this.totalCount = msg.totalCount
            if (this.totalCount == 0) {
                this.noDataBg = true
                return false
            }
            let list = []
            if (Array.isArray(msg.ExamInfoList)) {
                list = msg.ExamInfoList
                list.forEach(item => {
                    item.type = 'normal'
                });
            }
            this.testList = [...this.testList, ...msg.ExamInfoList]
            this.Page += 1

            console.log(msg)
        },
        refreshExamList () {
            this.Page = 0
            this.testList = []
            this.GetTrainningClasExamList()
        }
    },
    components: {
        headerFix,
        examList
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.trainexamlist{
    max-width: 10rem;
    height: 100vh;
    margin: 0 auto;
    .tc_gobackbtn{
        width: toRem(60px);
        height: toRem(92px);
        background: url('../assets/arrow.png') no-repeat 50% 50%;
        background-size: toRem(20px) toRem(35px);
    }
    .tel_content{
        width: 100%;
        height: 100%;
        padding-top: toRem(92px);
    }
}
</style>