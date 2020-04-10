<template>
  <div class="course_item" @click.stop="addCourse(item)">
    <div class="course_img">
      <a class="img">
        <img v-lazy="item.Course_img" v-if="item.Course_img">
        <img src="../assets/yw_nopic.png" alt v-else>
        <!--<error-img :src="item.CourseImg" :error-src="noCourse"></error-img>-->
      </a>
      <!--<img v-if="item.CourseType=='jyzxnews'" class="tip" src="../assets/jingpin.png" alt=""/>
      <img v-if="item.CourseType=='nstdc'" class="tip" src="../assets/flv.png" alt=""/>
      <img v-if="item.CourseType=='h5'" class="tip" src="../assets/H5.png" alt=""/>-->
    </div>
    <div class="course_desc">
      <div class="course_name">{{item.Course_Name}}</div>
      <div class="course_lineTwo">
        <div class="course_teacher">讲师：{{item.Teachername || "无"}}</div>
        <div class="course_type mustselect" v-if="item.AUTO_REG === '1'">必修</div>
        <div class="course_type" v-else>选修</div>
      </div>
      <div class="course_bottom">
        <span class="highlight">学分{{item.Credit_hour}}</span>
        <!--<span class="highlight">&nbsp;时长{{item.Duration}}</span>-->
        <span v-if="!myCourse" class="choose_status"
              :class="item.selectIdentifier=='已选'&&'course_selected'">{{item.selectIdentifier}}</span>
        <span v-if="myCourse" class="progress">进度：{{item.currentProgress}}%</span>
      </div>
      <mt-button v-if="showBtn" class="upload_btn" type="primary" size="small"
                 @click.native="uploadProgress($event)">提交进度
      </mt-button>
    </div>
  </div>
</template>

<script>
  import { getStore, setStore } from "../plugins/utils";
  import { getSyncUserStudyData, singleUploadTimeNode } from "../service/getData";
  import { Toast, MessageBox } from 'mint-ui'

  export default {
    data() {
      return {
        courseType: '',
        courseId: '',
        progressStack: [],
        showBtn: this.showUploadBtn
      }
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      myCourse: {
        type: Boolean,
        required: true
      },
      showUploadBtn: {
        type: Boolean,
        default: false
      }
    },
    created() {
      let { CourseType, Course_Number } = this.item
      this.courseId = Course_Number
      this.courseType = CourseType
      if (CourseType == "jyzxnews") {
        let store = getStore('jyaiccProgress') || {}
        this.progressStack = store[Course_Number] || []
      } else {
        let store = getStore('singleProgress') || {}
        this.progressStack = store[Course_Number] || []
      }
      this.showBtn = this.$route.name === 'myCourse' && this.progressStack.length > 0;
    },
    methods: {
      addCourse(item) {
        let data = new Date(item.Course_CreateDate).getTime()
        let limitdata = new Date('2020-01-01 00:00:00').getTime()
        if (limitdata > data) {
          MessageBox.alert('2020年之前的课程仅作为知识补充，完成后不再给予任何学分!', '提示').then(() => {
            this.$emit('addCourse', item)
          })
        } else {
          this.$emit('addCourse', item)
        }
      },
      async uploadProgress(e) {
        e.stopPropagation();
        if (this.courseType == "jyzxnews") {
          for (let i = 0; i < this.progressStack.length; i++) {
            let params = this.progressStack[i]
            try {
              let data = await getSyncUserStudyData(params)
              if (data == 'ok') {
                this.progressStack.splice(i, 1)
              } else {
                Toast({ message: "提交缓存进度失败", position: 'bottom' })
              }
            } catch (e) {
              Toast({ message: "提交缓存进度失败", position: 'bottom' })
            }
          }
          let store = getStore('jyaiccProgress') || {}
          if (this.progressStack.length == 0) {
            delete store[this.courseId]
          } else {
            store[this.courseId] = this.progressStack;
          }
          setStore('jyaiccProgress', store)
        } else {
          for (let i = 0; i < this.progressStack.length; i++) {
            let params = this.progressStack[i]
            try {
              let data = await singleUploadTimeNode(params)
              if (data.split(',')[0] == 'true') {
                this.progressStack.splice(i, 1)
              } else {
                Toast({ message: "提交缓存进度失败", position: 'bottom' })
              }
            } catch (e) {
              Toast({ message: "提交缓存进度失败", position: 'bottom' })
            }
          }
          let store = getStore('singleProgress')
          if (this.progressStack.length == 0) {
            delete store[this.courseId]
          } else {
            store[this.courseId] = this.progressStack
          }
          setStore('singleProgress', store)
        }
        this.showBtn = this.progressStack.length > 0;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .course_item {
    padding: toRem(20px) toRem(30px);
    @extend %clearFix;
    background-color: $fill-base;
    border-bottom: 1px solid $border-color-base;
    .course_img {
      @extend %pull-left;
      position: relative;
      width: toRem(258px);
      .img {
        img {
          width: 100%;
          height: toRem(146px);
        }
      }
      .tip {
        position: absolute;
        right: toRem(5px);
        top: toRem(5px);
        @include wh(57px, 27px);
        @include borderRadius(5px);
      }
    }
    .course_desc {
      position: relative;
      @extend %pull-left;
      width: toRem(415px);
      padding-left: toRem(15px);
      .upload_btn {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .course_name {
      @include ellipsis_two(2);
      height: toRem(72px);
      /*font-size: 14px;*/
      font-weight: 500;
      color: $color-text-base;
    }
    .course_lineTwo{
      display: flex;
      justify-content: space-between;
      .course_type{
        font-size: 0.35rem;
        color: #0f0;
      }
      .mustselect{
        color: #f00;
      }
    }
    .course_teacher {
      color: $color-text-secondary;
      line-height: toRem(40px);
    }
    .choose_status {
      @extend %pull-right;
      @include wh(64px, 36px);
      background-color: $color-icon-base;
      color: $color-text-reverse;
      text-align: center;
      @include borderRadius(5px);
    }
    .course_selected {
      background-color: $brand-success;
    }
    .progress {
      @extend %pull-right;
      color: $color-text-base;
    }
  }
</style>
