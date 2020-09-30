<template>
    <div class="trainingList">
        <ul>
            <li v-for="(item, index) in List" :key="index" @click="linkToContent(item)">
                <div class="ti_inner">
                    <div class="trainItem_title" v-text="item.tc_Name"></div>
                    <div class="trainItem_infoContent">
                        <div class="ti_ic_item">
                            <span class="ti_labelicon ti_traintime"></span>
                            <span>培训班时间: </span>
                            <span v-text="item.tc_StartTime + '~' + item.tc_EndTime"></span>
                        </div>
                        <div class="ti_ic_item">
                            <span class="ti_labelicon ti_trainapply"></span>
                            <span>报名截止时间: </span>
                            <span v-text="item.tc_SignEndTime"></span>
                        </div>
                        <div class="ti_ic_item">
                            <span class="ti_labelicon ti_trainstatus"></span>
                            <span>报名状态: </span>
                            <span v-text="item.tc_isup"></span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="noDataBg" v-if="noDataBg"></div>
        <div class="no-data" v-if="noData">没有更多内容了...</div>
    </div>
</template>

<script>
export default {
    name: 'trainItem',
    props: {
        List: Array,
        noData: Boolean,
        noDataBg: Boolean
    },
    methods: {
        linkToContent (obj) {
            console.log(obj)
            this.$router.push({ path: '/trainContent', query: { Id: obj.tc_ID } })
        }
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.trainingList{
    width: 100%;
    ul{
        li{
            background: #fff;
            padding: 0 toRem(30px);
            &:last-of-type{
                border-bottom: none;
            }
            .ti_inner{
                width: 100%;
                padding-bottom: toRem(15px);
                border-bottom: toRem(1px) solid #efefef;
            }
        }
    }
    
    .trainItem_title{
        max-height: toRem(160px);
        padding: toRem(15px) 0;
        font-size: toRem(32px);
        font-weight: bold;
        @include ellipsis_two;
    }
    .trainItem_infoContent{
        font-size: toRem(26px);
        .ti_ic_item{
            height: toRem(46px);
            display: flex;
            align-items: center;
        }
        .ti_labelicon{
            display: inline-block;
            width: toRem(40px);
            height: toRem(40px);
            margin-right: toRem(10px);
        }
        .ti_traintime{
            background: url('../assets/yw_clander.png') no-repeat;
            background-size: 100%;
        }
        .ti_trainapply{
            background: url('../assets/yw_applytime.png') no-repeat;
            background-size: 100%;
        }
        .ti_trainstatus{
            background: url('../assets/yw_status.png') no-repeat;
            background-size: 100%;
        }
    }
}
</style>