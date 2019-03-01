/**
 *  学分考核
 */
<template>
  <div class="trainDetail container_both">
    <header-fix :title="trainTitle" fixed>
      <a slot="left" @click="toggleNav">
        <i class="webapp webapp-category"></i>
      </a>
    </header-fix>
    <div class="date_select clearFix">
      <p class="pull-left">{{selectedTime.startTime}} ~ {{selectedTime.endTime}}</p>
      <p class="pull-right" @click="togglePicker">选择日期：<i class="webapp webapp-calendar"></i></p>
    </div>
    <nav-slide :show="showSlide" @showChange="showChange">
      <div slot="left" class="category">
        <tree :data="trainCategory" :on-select="getTrainData" :selected-id="TypeId"></tree>
      </div>
      <div slot="right">
        <section class="train_detail_tables" v-if="showDataType == 'table'">
          <ul class="train_card center_study">
            <li class="card"  v-for="(item,index) in tableData" :key="index">
              <p class="train_name">{{item.TypeEnumName}}</p>
              <p class="train_time sign_time">开始时间：{{item.StartTime}}</p>
              <p class="train_time">结束时间：{{item.EndTime}}</p>
              <p class="train_location">学时：{{item.Score}}</p>
              <p class="train_reg" v-if="item.IsShowDetail == 'true'">
                <router-link class="train_class_detail" :to="{path: '/classDetail', query:{id: item.TypeEnumID}}">
                  <mt-button type="primary" size="small">详细</mt-button>
                </router-link>
              </p>
            </li>
          </ul>
          <div class="noDataBg" v-if="noDataBg"></div>
        </section>
        <section class="train_detail_tables" v-if="showDataType == 'card'"
          v-infinite-scroll="getTrainData"
          infinite-scroll-immediate-check="immediate"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <ul class="train_card">
            <li class="card" v-for="(item,index) in tableData" :key="item.tc_id+index">
              <p class="train_name">{{item.tc_name}}</p>
              <p class="train_time sign_time">报名时间：{{item.tc_SignStartTime | dateFilter}} ~ {{item.tc_SignEndTime | dateFilter}}</p>
              <p class="train_time">培训时间：{{item.tc_StartTime | dateFilter}} ~ {{item.tc_EndTime | dateFilter}}</p>
              <p class="train_location">培训地点：{{item.hostedAdd || '无'}}</p>
              <p class="train_reg">
                <router-link class="train_class_detail" :to="{path: '/classDetail', query:{id: item.tc_id, type: 'kz'}}">
                  <mt-button type="primary" size="small">详细</mt-button>
                </router-link>
              </p>
            </li>
          </ul>
          <div class="noDataBg" v-if="noDataBg"></div>
          <div class="no-data" v-if="noData">没有更多内容了...</div>
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
    <footer-fix></footer-fix>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Indicator,Popup,Button,InfiniteScroll,MessageBox } from 'mint-ui'
  import { getUserTrainningClass,getUserTrainningClassKZ } from "../service/getData";
  import { formatDate } from "../plugins/utils";

  Vue.component(Popup.name, Popup);
  Vue.component(Button.name, Button);
  Vue.use(InfiniteScroll)
  export default {
    name: "trainDetail",
    data() {
      return {
        trainTitle: "学分考核",
        TypeId: 16,
        showSlide: true,
        tableData: [],
        selectedTime: {
          startTime: formatDate(new Date('2018-1-1'), 'yyyy-MM-dd'),
          endTime: formatDate(new Date('2018-12-31'), 'yyyy-MM-dd'),
        },
        showTimerPicker: false, //是否显示日期选择
        showDataType: 'card', // 显示的数据类型
        immediate: false,
        loading: false,
        noData: false,
        noDataBg: false,
        page: 0
      }
    },
    computed: {
      ...mapState(['userInfo']),
      trainCategory () {
        let arr = [
          {Channel_id: 2,Channel_name: "单位中心组学习",type: 'table'},
          {Channel_id: 5,Channel_name: "专题讲座",type: 'table'},
          {Channel_id: 7,Channel_name: "学习成果",type: 'table'},
          {Channel_id: 9,Channel_name: "领导干部上讲台",type: 'table'},
          {Channel_id: 15,Channel_name: "单位专题培训",type: 'table'},
          {Channel_id: 18,Channel_name: "菜单式讲座",type: 'table'},
          {Channel_id: 16,Channel_name: "科职干部轮训",type: 'card'}
        ]
        return arr
      }
    },
    mounted() {
      let isShowMessage = localStorage.getItem('isShowMessage')
      if (!isShowMessage) {
        MessageBox("提示", "请点击左上角查看分类")
      }
      this.getTrainData()
    },
    methods: {
      toggleNav () {
        this.showSlide = !this.showSlide
      },
      showChange (val) {
        this.showSlide = val
        localStorage.setItem('isShowMessage',true)
      },
      /*切换日期选择*/
      togglePicker () {
        this.showTimerPicker = !this.showTimerPicker
      },
      /*日期选择完成*/
      pickerComplete () {
        this.togglePicker()
        this.getTrainData()
      },
      /*获取表格数据*/
      async getTrainData(data) {
        this.noData = false
        this.noDataBg = false
        this.loading = true

        this.showDataType = (data && data.type) || this.showDataType
        this.showSlide = !this.showSlide
        this.TypeId = (data && data.Channel_id) || this.TypeId
        let startTime = this.selectedTime.startTime
        let cendTime =  this.selectedTime.endTime
        Indicator.open()
        let params = {UserID: this.userInfo.UserID, TypeId: this.TypeId, startTime, cendTime}
        let res = {}
        if (this.showDataType == 'card') {
          res = await getUserTrainningClassKZ(params,{Page: this.page})
        } else {
          res = await getUserTrainningClass(params)
        }
        Indicator.close()
        this.trainTitle = res.TypeEnumName
        let list = []
        if (Array.isArray(res.TrainClassList)) {
          list = res.TrainClassList
        }
        if (this.showDataType == 'card' && list.length == 0 && this.page > 0) {
          this.noData = true
          return
        }
        if (list.length == 0 && this.page == 0) {
          this.noDataBg = true
          return
        }
        if (this.showDataType == 'card') {
          this.tableData = this.tableData.concat(list)
          this.page += 1
        } else {
          this.tableData = list
        }
        this.loading = false
      },
    },
    beforeRouteLeave(to, from, next) {
      MessageBox.close()
      next()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .trainDetail{
    width: 100vw;
    height: 100vh;
    .nav_slide{
      .nav_right{
        margin-top: toRem(-60px);
        padding-top: toRem(60px);
      }
    }
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
    .train_detail_tables{
      .train_table{
        width: 100vw;
        li{
          width: 100%;
          @include ht-lineHt(75px);
          text-align: center;
          @include flex(space-around);
          border-bottom: 1px solid $border-color-base;
          &.table_title{
            font-weight: bold;
            font-size: toRem(24px);
          }
          &>span{
            width: percentage(1/6);
            @extend %ellipsis;
          }
        }
      }
      .train_card{
        padding: toRem(20px);
        .card{
          position: relative;
          background: #FFF;
          box-shadow: 0 0 toRem(25px) 0 #eeeeee;
          border:1px solid $border-color-base;
          @include borderRadius(12px);
          margin-bottom: toRem(20px);
          padding: toRem(20px);
          .train_name{
            font-size: toRem(40px);
            @include ht-lineHt(75px);
          }
          .train_time{
            @include ht-lineHt(50px);
          }
          .train_reg{
            margin-top: toRem(20px);
            .mint-button{
              width: 100%;
              font-size: toRem(32px);
            }
          }
        }
      }
    }
    .footerFix{
      .mint-tabbar.is-fixed{
        z-index: 101;
      }
    }
  }
</style>
