/**
* 我的课程
*/
<template>
  <div class="my_course container_both">
    <header-fix fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <mb-tab slot="title" v-model="tabType">
        <mb-tab-item id="0">未完成</mb-tab-item>
        <mb-tab-item id="1">已完成</mb-tab-item>
      </mb-tab>
      <router-link slot="right" to="/courseSearch"><i class="webapp webapp-search"></i></router-link>
    </header-fix>
    <div class="my_course_container">
      <mt-tab-container v-model="tabType">
        <mt-tab-container-item id="0">
          <section v-if="tabType === '0'" v-infinite-scroll="getMyUnFinishCourse"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-distance="10">
            <course-list :course-data="courseUnFinishData"
                         :no-data-bg="noUfDataBg"
                         :no-data="noUfData"
                         :show-upload-btn="true"
                         my-course>
            </course-list>
          </section>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <section v-if="tabType === '1'" v-infinite-scroll="getMyFinishCourse"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-distance="10">
            <course-list :course-data="courseFinishData"
                         :no-data-bg="noFDataBg"
                         :no-data="noFData"
                         my-course>
            </course-list>
          </section>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- <bottom-bar></bottom-bar> -->
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Indicator, TabContainer, TabContainerItem, InfiniteScroll } from 'mint-ui'
  import { goBack } from '../service/mixins'
  import { getUserCourseInfo } from '../service/getData'
  // import { bottomBar } from '../components'

  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabContainerItem.name, TabContainerItem)
  Vue.use(InfiniteScroll)
  export default {
    mixins: [goBack],
    data () {
      return {
        tabType: '0',
        courseFinishData: [],
        courseUnFinishData: [],
        noFDataBg: false,
        noFData: false,
        noUfDataBg: false,
        noUfData: false,
        loading: false,
        immediate: false,
        unFinishPage: 1,
        finishPage: 1,
        startX: 0,
        endX: 0,
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted () {
      this.getMyFinishCourse()
      this.getMyUnFinishCourse()
      var element = this.$el
      element.addEventListener('touchstart', (event) => {
        if (this.prevent) event.preventDefault()
        if (this.stopPropagation) event.stopPropagation()
        // this.doOnTouchStart(event);
      })

      element.addEventListener('touchmove', (event) => {
        if (this.prevent) event.preventDefault()
        if (this.stopPropagation) event.stopPropagation()
        // this.doOnTouchMove(event);
      })

      element.addEventListener('touchend', (event) => {
        if (this.prevent) event.preventDefault()
        if (this.stopPropagation) event.stopPropagation()
        // this.doOnTouchEnd(event);
      })
    },
    methods: {
      //已完成课程
      async getMyFinishCourse () {
        this.noFData = false
        this.noFDataBg = false
        this.loading = true
        Indicator.open()
        let data = await getUserCourseInfo({UserID: this.userInfo.UserID, Finish: 1, Page: this.finishPage})
        Indicator.close()
        let list = []
        if (Array.isArray(data.UserCourseInfoList)) {
          list = data.UserCourseInfoList
        }
        if (list.length == 0 && this.finishPage > 1) {
          this.noFData = true
          return
        }
        if (list.length == 0 && this.finishPage == 1) {
          this.noFDataBg = true
          return
        }
        this.courseFinishData = this.courseFinishData.concat(list)
        this.loading = false
        this.finishPage += 1
      },
      //未完成课程
      async getMyUnFinishCourse () {
        this.noUfData = false
        this.noUfDataBg = false
        this.loading = true
        Indicator.open()
        let data = await getUserCourseInfo({UserID: this.userInfo.UserID,Finish: 0, Page: this.unFinishPage})
        Indicator.close()
        let list = []
        if (Array.isArray(data.UserCourseInfoList)) {
          list = data.UserCourseInfoList
        }
        if (list.length == 0 && this.unFinishPage > 1) {
          this.noUfData = true
          return
        }
        if (list.length == 0 && this.unFinishPage == 1) {
          this.noUfDataBg = true
          return
        }
        this.courseUnFinishData = this.courseUnFinishData.concat(list)
        this.loading = false
        this.unFinishPage += 1
      },
      doOnTouchStart (event) {
        /*let touches=event.touches;
        let targetTouches=event.targetTouches;
        let changeTouches=event.changeTouches;*/
        let pageX = event.targetTouches[0].pageX
        // let pageY = event.targetTouches[0].pageY
        this.startX = pageX
        // console.log("TouchStart" + pageX, pageY);
      },
      doOnTouchMove (event) {
        // let pageX = event.targetTouches[0].pageX
        // let pageY = event.targetTouches[0].pageY
        // console.log("TouchMove" + pageX, pageY);
      },
      doOnTouchEnd (event) {
        let pageX = event.changedTouches[0].pageX
        // let pageY = event.changedTouches[0].pageY
        this.endX = pageX
        // console.log("TouchEnd" + pageX, pageY);
        //左滑
        if (this.endX < this.startX - 20) {
          this.tabType = '1'
        }
        //右滑
        if (this.endX > this.startX + 20) {
          this.tabType = '0'
        }
      },
    }
    // components: {
    //   bottomBar
    // }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
