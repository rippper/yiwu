/**
* 学习档案列表
*/
<template>
  <div class="portfolio_container">
    <div class="clearFix collect_content" v-for="(item,index) in learningData" :key="index">
      <div class="left_content">{{sortNum(index + 1)}}.</div>
      <div class="right_content">
        <p class="collect_title">
          <span>{{item.Course_name}}</span>
        </p>
        <p class="collect_date">
          <span v-if="!showHistory">开始时间：<span class="primary_color">{{item.reg_date}}</span></span>
          <span v-else>完成时间：<span class="primary_color">{{item.active_date}}</span></span>
          <span class="pull-right" v-if="!showHistory">学习进度：<span class="primary_color">{{item.browse_score}}%</span></span>
        </p>
        <p class="collect_date">
          <span class="credit">获得学分：<span class="primary_color">{{item.credit_hour}}</span></span>
          <!-- <span class="score">评论学分：<span class="primary_color">{{item.extra_credit}}</span></span> -->
        </p>
        <p v-if="!showHistory" class="collect_date">
          <span class="status"
                :class="{'status-selected': item.learnStatus == '已选择',
                'status-wait': item.learnStatus=='正在学习',
                'status-success': item.learnStatus == '已完成'}">
            学习状态：{{item.learnStatus}}
          </span>
        </p>
      </div>
    </div>
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>
  export default {
    props: {
      learningData: {
        type: Array
      },
      noDataBg: {
        type: Boolean,
        default: false
      },
      noData: {
        type: Boolean,
        default: false
      },
      showHistory: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      sortNum (num) {
        let index = parseInt(num)
        if (index < 10) {
          return `0${index}`
        }
        return index
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .portfolio_container {
    background-color: $fill-base;
  }

  .collect_content {
    width: 100%;
    padding: toRem(30px) toRem(25px);
    border-bottom: 1px solid $border-color-light;
  }

  .left_content {
    @extend %pull-left;
    width: 10%;
    line-height: toRem(41px);
    font-size: 14px;
  }

  .right_content {
    @extend %pull-left;
    width: 90%;
    font-size: 14px;
    .collect_title {
      height: toRem(82px);
      line-height: toRem(41px);
      @include ellipsis_two();
    }
    .collect_date {
      font-size: 13px;
      color: $color-text-secondary;
      @include ht-lineHt(37.5px);
      .primary_color{
        color: $brand-primary;
      }
      .score {
        @extend %pull-right;
      }
      .status-wait{
        color: $brand-info;
      }
      .status-success{
        color: $brand-success;
      }
      .status-selected{
        color: $brand-wait;
      }
    }
  }

  .error {
    color: $brand-error;
  }
</style>
