/**
* 排行傍
*/
<template>
  <div class="rankList">
    <!--头部-->
    <header-fix title="排行榜" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">学习标兵</mt-tab-item>
      <mt-tab-item id="2">课程排名</mt-tab-item>
      <mt-tab-item id="3">单位排名</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <table class="table">
          <thead class="fixed_rank_title">
          <tr>
            <th class="student_rank">排名</th>
            <th class="student_list">学员</th>
            <th class="student_company">学员单位</th>
            <th class="student_times">学分</th>
          </tr>
          </thead>
          <tbody class="fixed_rank_content">
          <tr v-for="(item,index) in studentData" :key="item.index">
            <td v-if="index<3" class="student_rank"
                :class="{'rank_bg_one':index==0,'rank_bg_two':index==1,'rank_bg_three':index==2,}"></td>
            <td v-if="index>=3" class="student_rank">{{item.index}}</td>
            <td class="student_list">{{item.name}}</td>
            <td class="student_company">{{item.groupname}}</td>
            <td class="student_times">{{item.value}}</td>
          </tr>
          </tbody>
        </table>
        <div class="noDataBg" v-if="noDataBg1"></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <table class="table">
          <thead class="fixed_rank_title">
          <tr>
            <th class="course_rank">排名</th>
            <th class="course_name">课程</th>
            <th class="course_times">播放次数</th>
          </tr>
          </thead>
          <tbody class="fixed_rank_content">
          <tr v-for="(item,index) in courseData" :key="item.index">
            <td v-if="index<3" class="course_rank"
                :class="{'rank_bg_one':index==0,'rank_bg_two':index==1,'rank_bg_three':index==2,}"></td>
            <td v-if="index>=3" class="course_rank">{{item.index}}</td>
            <td class="course_name">{{item.name}}</td>
            <td class="course_times">{{item.value}}</td>
          </tr>
          </tbody>
        </table>
        <div class="noDataBg" v-if="noDataBg2"></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <table class="table">
          <thead class="fixed_rank_title">
          <tr>
            <th class="course_rank">排名</th>
            <th class="course_name">单位</th>
            <th class="course_times">学分</th>
          </tr>
          </thead>
          <tbody class="fixed_rank_content">
          <tr v-for="(item,index) in groupData" :key="item.index">
            <td v-if="index<3" class="course_rank"
                :class="{'rank_bg_one':index==0,'rank_bg_two':index==1,'rank_bg_three':index==2,}"></td>
            <td v-if="index>=3" class="course_rank">{{item.index}}</td>
            <td class="course_name">{{item.name}}</td>
            <td class="course_times">{{item.value}}</td>
          </tr>
          </tbody>
        </table>
        <div class="noDataBg" v-if="noDataBg3"></div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
  import { goBack } from '../service/mixins'
  import { GetRankInfoList } from '../service/getData'

  Vue.component(Navbar.name, Navbar)
  Vue.component(TabItem.name, TabItem)
  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabContainerItem.name, TabContainerItem)
  export default {
    mixins: [goBack],
    data () {
      return {
        selected: '1',
        studentData: [],
        courseData: [],
        groupData: [],
        noDataBg1: false,
        noDataBg2: false,
        noDataBg3: false,
      }
    },
    mounted () {
      this.getRankList('1')
      this.getRankList('2')
      this.getRankList('3')
    },
    methods: {
      //排行榜
      async getRankList (RankType) {
        let data = await GetRankInfoList({RankType})
        // if (data.Type == 1) {
          if (RankType == '1') {
            this.studentData = data.RankInfoList;
            // console.log(this.studentData);
            if (data.RankInfoList.length == 0) {
              this.noDataBg1 = true
            }
            console.log(this.studentData)
          } else if (RankType == '2') {
            this.courseData = data.RankInfoList
            if (data.RankInfoList.length == 0) {
              this.noDataBg2 = true
            }
          } else if (RankType == '3') {
            this.groupData = data.RankInfoList
            if (data.RankInfoList.length == 0) {
              this.noDataBg3 = true
            }
          }
        // }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .rankList {
    padding-top: toRem(250px);
    height: 100vh;
    .mint-navbar {
      position: fixed;
      top: toRem(92px);
      left: 0;
      width: 100%;
      z-index: 10;
    }
    .fixed_rank_title {
      position: fixed;
      top: toRem(175px);
      left: 0;
      width: 100%;
      background-color: $brand-primary;
      z-index: 10;
    }
    .fixed_rank_content{
      width: 100%;
      z-index: 10;
    }
    .table {
      width: 100%;
      text-align: center;
      background-color: $fill-base;
      th, td {
        text-align: center;
      }
      th {
        line-height: toRem(75px);
        text-align: center;
        font-size: 14px;
        color: $color-text-reverse;
      }
      td {
        line-height: toRem(70px);
        font-size: 14px;
      }
      .rank {
        width: toRem(225px);
      }
      .student_rank{
        width: toRem(150px);
      }
      .student_list{
        width: toRem(150px);
      }
      .student_company{
        width: toRem(402px);
        line-height: toRem(55px);
        padding: toRem(10px) 0;
        @include ellipsis_two(2);
      }
      .student_times{
        width: toRem(150px);
      }
      .course_rank{
        width: toRem(150px);
      }
      .course_name{
        width: toRem(452px);
        line-height: toRem(55px);
        padding: toRem(10px) 0;
        @include ellipsis_two(2);
      }
      .course_times{
        width: toRem(150px);
      }
      .student {
        width: toRem(302px);
        line-height: toRem(55px);
        padding: toRem(10px) 0;
        @include ellipsis_two(2);
      }
      .sm_height {
        line-height: toRem(40px);
      }
      .credit {
        width: toRem(225px);
      }
    }
  }
</style>
