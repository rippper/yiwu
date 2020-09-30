<template>
    <div class="examResultList">
        <ul>
            <li v-for="(item, index) in examData" :key="index" @click="linkHistory(item)">
                <div class="exam_img">
                    <img src="../assets/exam_ico.png" alt="">
                </div>
                <div class="exam_desc">
                    <div class="exam_name">{{item.ExamTitle}}</div>
                </div>
            </li>
        </ul>
        <div class="noDataBg" v-if="noDataBg"></div>
        <div class="no-data" v-if="noData">没有更多内容了...</div>
    </div>
</template>

<script>
export default {
    name: 'examResultList',
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
    },
    methods: {
        linkHistory (item) {
            this.$router.push({ path: '/examHHistoryList', query: { ExamID: item.ExamID } })
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .examResultList{
        ul{
            li{
                background-color: $fill-base;
                padding: toRem(20px) toRem(30px) toRem(70px);
                border-bottom: 1px solid $border-color-base;
            }
        }
        .exam_img {
            @extend %pull-left;
            width: toRem(90px);
            img {
                @include square(56px);
            }
        }
        .exam_name {
            @include ellipsis_two(2);
            font-size: 14px;
            font-weight: 500;
            color: $color-text-base;
        }
    
    }
</style>