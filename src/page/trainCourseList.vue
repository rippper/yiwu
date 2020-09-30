<template>
    <div class="traincourselist">
        <header-fix title="课程列表" fixed>
            <div slot="left">
                <div class="tc_gobackbtn" @click="goBack"></div>
            </div>
        </header-fix>
        <div class="tcl_content">
            <section
                v-infinite-scroll="GetTrainningClassCourseList"
                infinite-scroll-immediate-check="immediate"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
            >
                <course-list :course-data="courseList" :no-data-bg="noDataBg" :no-data="noData"></course-list>
            </section>
        </div>
    </div>
</template>

<script>
import { headerFix, courseList } from '../components';
import { goBack } from "../service/mixins";
import { GetTrainningClassCourseList } from '../service/getData';
import { mapState } from 'vuex';
import { Indicator } from 'mint-ui';

export default {
    name: 'traincourselist',
    mixins: [goBack],
    data () {
        return {
            trainID: '',
            courseList: [],
            noData: false,
            noDataBg: false,
            loading: false,
            Page: 0,
            Rows: 10,
            totalCount: 0
        }
    },
    created () {
        this.trainID = this.$route.query.Id
    },
    mounted () {
        this.GetTrainningClassCourseList()
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        async GetTrainningClassCourseList () {
            Indicator.open()
            this.loading = true
            let msg = await GetTrainningClassCourseList({
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
            if (this.courseList.length >= this.totalCount) {
                this.noData = true
                return false
            }
            this.courseList = [...this.courseList, ...msg.CourseInfoList]
            this.Page += 1
        }
    },
    components: {
        headerFix,
        courseList
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.traincourselist{
    max-width: 10rem;
    margin: 0 auto;
    height: 100vh;
    .tc_gobackbtn{
        width: toRem(60px);
        height: toRem(92px);
        background: url('../assets/arrow.png') no-repeat 50% 50%;
        background-size: toRem(20px) toRem(35px);
    }
    .tcl_content{
        width: 100%;
        height: 100%;
        padding-top: toRem(92px);
    }
}
</style>