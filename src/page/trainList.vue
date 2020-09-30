<template>
    <div class="trainList">
        <header-fix title="培训班列表" fixed>
            <div slot="left">
                <div class="tl_gobackbtn" @click="goBack"></div>
            </div>
            <div class="tl_titleright" slot="right">
                <div class="tl_listbtn" @click="labelShowChange"></div>
            </div>
        </header-fix>
        <div class="tl_content">
            <nav-slide :show="labelShow" @showChange="showChange">
                <div class="tl_content_left" slot="left">
                    <div
                        class="tl_cl_item"
                        :class="{ 'tl_isSelect': item.isClick }"
                        v-for="(item, index) in trainType"
                        :key="index"
                        v-text="item.title"
                        @click="TypeChange(index)">
                    </div>
                </div>
                <div class="tl_content_right" slot="right">
                    <section
                        v-infinite-scroll="getTrainningClassList"
                        infinite-scroll-immediate-check="immediate"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="10"
                    >
                        <training-list :List="trainList" :noData="noData" :noDataBg="noDataBg"></training-list>
                    </section>
                </div>
            </nav-slide>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { headerFix, navSlide, trainingList } from '../components';
import { getTrainningClassList } from '../service/getData.js';
import { Indicator, InfiniteScroll } from 'mint-ui';
import { mapState } from 'vuex';

Vue.use(InfiniteScroll)
export default {
    name: 'trainList',
    data () {
        return {
            labelShow: false,
            trainList: [],
            trainType: [
                {
                    title: '全部',
                    typeId: -1,
                    isClick: true
                },
                {
                    title: '正在举办',
                    typeId: 0,
                    isClick: false
                },
                {
                    title: '即将举办',
                    typeId: 1,
                    isClick: false
                },
                {
                    title: '已经举办',
                    typeId: 2,
                    isClick: false
                }
            ],
            currentType: -1,
            loading: false,
            Page: 0,
            Rows: 10,
            totalCount: 0,
            noData: false,
            noDataBg: false
            
        }
    },
    mounted () {
        console.log(this.userInfo)
        this.getTrainningClassList()
        // this.loadmore()
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        goBack () {
            this.$router.push({path: '/home'})
        },
        showChange (type) {
            this.labelShow = type
        },
        labelShowChange () {
            this.labelShow = !this.labelShow
        },
        TypeChange (i) {
            this.trainType.forEach((item, index) => {
                item.isClick = false
                if (index == i) {
                    item.isClick = true
                }
            })
            this.currentType = this.trainType[i].typeId
            this.trainList = []
            this.noData = false
            this.noDataBg = false
            this.totalCount = 0
            this.Page = 0
            this.getTrainningClassList()
            this.labelShowChange()
        },
        async getTrainningClassList () {
            Indicator.open()
            this.loading = true
            let msg = await getTrainningClassList({
                UserID: this.userInfo.UserID,
                type: this.currentType,
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
            for (let m = 0; m < 10; m++) {
                console.log(m)
            //     msg.TrainClassInfoList.push(msg.TrainClassInfoList[0])
            }
            this.trainList = [...this.trainList, ...msg.TrainClassInfoList]
            this.Page += 1
            if (this.trainList.length >= this.totalCount) {
                this.noData = true
                return false
            }
        }
    },
    components: {
        headerFix,
        navSlide,
        trainingList
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.trainList{
    max-width: 10rem;
    height: 100vh;
    padding-top: toRem(92px);
    margin: 0 auto;
    .tl_gobackbtn{
        width: toRem(60px);
        height: toRem(92px);
        background: url('../assets/arrow.png') no-repeat 50% 50%;
        background-size: toRem(20px) toRem(35px);
    }
    .tl_titleright{
        display: flex;
        flex-direction: row-reverse;
    }
    .tl_listbtn{
        width: toRem(92px);
        height: toRem(92px);
        background: url('../assets/slide.png') no-repeat 50% 50%;
        background-size: toRem(35px) toRem(29px);
    }
    .tl_content{
        width: 100%;
        height: 100%;
    }
    .tl_content_left{
        height: 100%;
    }
    .tl_content_right{
        height: 100%;
    }
    .tl_cl_item{
        width:100%;
        height: toRem(80px);
        line-height: toRem(80px);
        padding-left: toRem(15px);
        font-size: toRem(32px);
    }
    .tl_isSelect{
        color: $brand-primary;
    }
    .tl_item{
        width: 100%;
        background: #888;
        height: toRem(150px);
    }
}
</style>