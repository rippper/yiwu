/**
* 课程列表
*/
<template>
  <div class="course_list">
    <course-item v-for="item in courseData"
                 :key="item.Course_Number"
                 :item="item"
                 :myCourse="myCourse"
                 :showUploadBtn="showUploadBtn"
                 @addCourse="addCourse"/>
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Lazyload } from 'mint-ui'
  import noCourse from '../assets/noCourse.png'
  import { toPlay } from '../service/mixins'
  import { mapState, mapActions } from 'vuex'
  import { UpdateUserCourse } from '../service/getData'

  Vue.use(Lazyload, {
    error: noCourse,
  })
  export default {
    mixins: [toPlay],
    data() {
      return {
        noCourse
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    created() {
      // console.log(this.userInfo)
    },
    props: {
      courseData: Array,
      noDataBg: {
        type: Boolean,
        default: false
      },
      noData: {
        type: Boolean,
        default: false
      },
      myCourse: Boolean,
      showUploadBtn: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      ...mapActions(['saveCourseInfo']),
      playCourse(item) {
        this.saveCourseInfo(item)
        this.toPlay(item.CourseType, item.Course_Number)
      },
     
      async addCourse(item) {
        let res = { result: '1' }
        if (item.IsSelect != '1') {
          res = await UpdateUserCourse({ UserID: this.userInfo.UserID, CourseNumber: item.Course_Number })
        }
        if (res.result == 1) {
          this.playCourse(item)
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .course_list {
  }
</style>
