/**
* 学习档案
*/
<template>
  <div class="learning_portfolio container_top">
    <header-fix title="学习档案" fixed>
      <span slot="left">
        <i class="webapp webapp-back" @click.stop="goBack"></i>
        <!-- <a @click="toggleNav">
          <i class="webapp webapp-category"></i>
        </a> -->
      </span>

      <div v-if="!showHistory" slot="right" class="clearFix">
        <span class="filter" @click="toggleModel">
          <span>用户信息</span>
        </span>
      </div>
    </header-fix>
    <nav-slide :show="showSlide" @showChange="showChange">
      <div slot="left" class="category">
        <div class="category_item" @click="changeYear(false)">本年</div>
        <div class="category_item" @click="changeYear(true)">2016</div>
      </div>
      <div slot="right">
        <div v-if="!showHistory" class="date_select clearFix">
          <p class="pull-left">{{selectedTime.startTime}} ~ {{selectedTime.endTime}}</p>
          <p class="pull-right" @click="togglePicker">选择日期：<i class="webapp webapp-calendar"></i></p>
        </div>
        <section v-infinite-scroll="getLearningData"
                 infinite-scroll-immediate-check="immediate"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10">
          <portfolio-list :learning-data="learningData" :no-data-bg="noDataBg" :no-data="noData" :show-history="showHistory"></portfolio-list>
        </section>
      </div>
    </nav-slide>

    <!--时间选择器-->
    <transition name="slide-left">
      <date-time-picker
        class="picker_container"
        v-if="showTimerPicker"
        :selected-time.sync="selectedTime"
      >
        <!--头部-->
        <header-fix slot="header" title="日期选择" fixed>
          <span slot="left" @click="togglePicker">取消</span>
          <span slot="right" @click="pickerComplete">完成</span>
        </header-fix>
      </date-time-picker>
    </transition>
    <mb-model :isShow.sync="showModel">
      <div class="info_content" slot>
        <p class="user_name">用户名：{{learningAllData.user_name}}</p>
        <p>
          <span>单位：{{learningAllData.user_group_name}}</span>&emsp;
          <span class="pull-right">获得总学分：{{learningAllData.CourseFinishCount}}</span></p>
        <p>
          <span>选择课件数：{{learningAllData.CourseChoosedCount}}</span>&emsp;
          <span class="pull-right">完成课件数：{{learningAllData.CourseFinishCount}}</span></p>
        <p class="message">{{learningAllData.Message}}</p>
      </div>
    </mb-model>
    <!--<div class="filter_layer" v-if="showFilter" @click="toggleFilter"></div>
    <div class="filter_list" :class="{'show':showFilter}">
      <p class="filter_item filter_title"><span>筛选条件</span></p>
      <p class="filter_item" :class="type=='1'&&sort=='desc'&&'active'"
         @click="filterExam({type:'1',order:'desc'})">
        <span>时间降序</span>
        <i v-if="type=='1'&&sort=='desc'" class="webapp webapp-selected"></i>
      </p>
      <p class="filter_item" :class="type=='1'&&sort=='asc'&&'active'"
         @click="filterExam({type:'1',order:'asc'})">
        <span>时间升序</span>
        <i v-if="type=='1'&&sort=='asc'" class="webapp webapp-selected"></i>
      </p>
      <p class="filter_item" :class="type=='0'&&sort=='desc'&&'active'"
         @click="filterExam({type:'0',order:'desc'})">
        <span>学分降序</span>
        <i v-if="type=='0'&&sort=='desc'" class="webapp webapp-selected"></i>
      </p>
      <p class="filter_item" :class="type=='0'&&sort=='asc'&&'active'"
         @click="filterExam({type:'0',order:'asc'})">
        <span>学分升序</span>
        <i v-if="type=='0'&&sort=='asc'" class="webapp webapp-selected"></i>
      </p>
    </div>-->
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Indicator, InfiniteScroll } from 'mint-ui'
  import { GetUserStatistics,GetUserHistory } from '../service/getData'
  import { goBack } from '../service/mixins'
  import { formatDate } from "../plugins/utils";

  Vue.use(InfiniteScroll)
  export default {
    mixins: [goBack],
    data () {
      return {
        sort: 'desc',
        type: '1',
        learningData: [],
        loading: false,
        immediate: false,
        page: 0,
        noData: false,
        noDataBg: false,
        selectedTime: {
          startTime: formatDate(new Date('2020-01-01'), 'yyyy-MM-dd'),
          endTime: formatDate(new Date('2020-12-31'), 'yyyy-MM-dd'),
        },
        showTimerPicker: false, //是否显示日期选择
        showModel: false,
        learningAllData: {},
        showHistory: false,
        showSlide: false,
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    created () {

    },
    mounted () {
      this.getLearningData()
    },
    updated () {

    },
    methods: {
      toggleNav () {
        this.showSlide = !this.showSlide
      },
      showChange (val) {
        this.showSlide = val
      },
      togglePicker() {
        this.showTimerPicker = !this.showTimerPicker
      },
      /*日期选择完成*/
      pickerComplete () {
        this.page = 0
        this.learningData = []
        this.togglePicker()
        this.getLearningData(false)
      },
      async getLearningData (isHistory) {
        this.noData = false
        this.noDataBg = false
        this.loading = true
        Indicator.open()
        let params,data
        if (isHistory) {
          params = {Page: this.page, UserID: this.userInfo.UserID}
          data = await GetUserHistory(params)
        } else {
          params = {Page: this.page, UserID: this.userInfo.UserID, ...this.selectedTime}
          data = await GetUserStatistics(params)
        }
        this.learningAllData = data
        Indicator.close()
        let list = []
        if (Array.isArray(data.CourseList)) {
          list = data.CourseList
        }
        if (list.length == 0 && this.page >= 1) {
          this.noData = true
          return
        }
        if (list.length == 0 && this.page == 0) {
          this.noDataBg = true
          this.learningData = []
          return
        }
        this.learningData = this.learningData.concat(list)
        this.loading = false
        this.page += 1
      },
      toggleModel () {
        this.showModel = !this.showModel
      },
      changeYear(isHistory) {
        this.showHistory = isHistory
        this.page = 0
        this.learningData = []
        this.toggleNav()
        this.getLearningData(isHistory)
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .learning_portfolio {
    width: 100vw;
    height: 100vh;
    .date_select {
      color: $color-text-thirdly;
      @include ht-lineHt(60px);
      padding: 0 toRem(25px);
      .webapp {
        color: $color-text-thirdly;
        margin-left: toRem(15px);
      }
    }
    .date_picker_popup{
      width: 100vw;
      height: 100vh;
    }
    .picker_container {
      position: fixed;
      z-index: 1000;
      top: 0;
      right: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #fff;
    }
    .info_content{
      padding: toRem(20px);
      &>p {
        &:not(.message) {
          color: $brand-primary;
          font-size: toRem(26px);
          @include ht-lineHt(50px);
        }
        &.message {
          text-indent: 2em;
          text-align: justify;
        }
      }
    }
    .category{
      .category_item{
        text-align: center;
        @include ht-lineHt(75px);
        font-size: toRem(30px);
        border-bottom: 1px solid $border-color-base;
        &:nth-last-child(1) {
          border-bottom: none;
        }
      }
    }
  }

</style>
