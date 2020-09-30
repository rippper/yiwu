/**
* 课程评论
*/
<template>
  <div class="evaluate">
    <div class="course_judge_tag" @click="openEvaluateModel">
      <p class="title">评价该课程</p>
      <!-- <p class="judge">
        <star v-model="commentCredit" disabled></star>
      </p> -->
    </div>
    <div class="split"></div>
    <div class="course_comment">
      <h1>评价详情 <span class="course_comment_count">（{{commentCount}}个评价）</span></h1>
      <section v-infinite-scroll="getCommentList"
               infinite-scroll-immediate-check="immediate"
               infinite-scroll-disabled="loading"
               infinite-scroll-distance="10">
        <div class="course_comment_item" v-for="(item) in commentList" :key="item.CommentId">
          <div class="left_avatar"><img src="../assets/male.png" alt></div>
          <div class="right_content">
            <p class="name">
              <span>{{item.username}}</span>
            </p>
            <p class="date">{{item.Createtime}}</p>
            <p class="content">{{item.content}}</p>
          </div>
        </div>
      </section>
      <!-- <div class="course_comment_item" v-for="(item) in commentList" :key="item.CommentId">
        <div class="left_avatar">
          <error-img :src="item.HeadImg" :error-src="male"></error-img>
        </div>
        <div class="right_content">
          <p class="name">
            <span>{{item.UserName}}</span>
            <star v-model="item.Star" size="small" disabled></star>
          </p>
          <p class="date">{{item.Createtime}}</p>
          <p class="content">{{item.CommentComtent}}</p>
        </div>
      </div> -->
    </div>
    <!--添加评论-->
    <mb-model :is-show.sync="isShowModel">
      <div slot class="addEvaluate">
        <p>请输入您对课程的评论。</p>
        <!-- <star v-model="addCourseData.Star" show-text></star> -->
        <textarea v-model="addCourseData.Content" type="text" placeholder="评论，300以内"></textarea>
        <a @click.prevent="addComment" class="submit">提交</a>
      </div>
    </mb-model>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Toast, MessageBox, InfiniteScroll } from 'mint-ui'
  import { GetCommentList, AddComment } from '../service/getData'
  import { mapState } from 'vuex'
  import male from '../assets/male.png'

  Vue.use(InfiniteScroll)
  export default {
    data () {
      return {
        male,
        isShowModel: false,
        noData: false,
        immediate: false,
        loading: false,
        page: 0,
        commentList: [],
        commentCount: [],
        addCourseData: {
          ObjType: '1',
          ObjId: this.courseId,
          Content: '',
          Star: 5,
        }
      }
    },
    props: ['courseId', 'commentCredit', 'courseDetails'],
    computed: {
      ...mapState(['userInfo'])
    },
    mounted () {
      console.log(this.courseDetails.currentProgress)
    },
    methods: {
      //课程评论列表
      async getCommentList () {
        this.noData = false
        this.loading = true
        let data = await GetCommentList({
          courseid: this.courseId,
          page: this.page,
          pagesize: 10
        })
        console.log(data)
        let list = data.list
        this.commentCount = data.count.count
        if (list.length == 0) {
          this.noData = true
          return
        }
        this.commentList = list
        this.loading = false
        this.page += 1
      },
      //添加课程评论
      async addComment () {
        if (parseInt(this.courseDetails.currentProgress) < 100) {
          MessageBox('提示', '看完课程才能评论！')
          return
        }
        if (this.addCourseData.Content.length > 0 && this.addCourseData.Content.length <= 300) {
          this.addCourseData.Content = this.addCourseData.Content.replace(/(^\s*)|(\s*$)/g, "");
          this.addCourseData.Content = this.addCourseData.Content.replace(/"/g, '\'');
          let data = await AddComment({
            userid: this.userInfo.UserID,
            courseid: this.courseId,
            data: this.addCourseData.Content
          })
          console.log(data)
          if (data.result == '提交成功！') {
            this.page = 0
            this.getCommentList()
            Toast({message: data.result, position: 'bottom'})
          } else if (data.Type != 401) {
            MessageBox('警告', data.Message)
          }
          this.isShowModel = false
        } else {
          Toast({message: '评论内容不能超过300字！', position: 'bottom'})
        }
      },
      openEvaluateModel () {
        this.isShowModel = true
      }
    },
    watch: {
      courseId (val) {
        this.getCommentList()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .evaluate {
    background-color: $fill-base;
    .course_judge_tag {
      .title {
        @include ht-lineHt(112px);
        text-align: center;
        font-size: 15px;
      }
      .judge {
        width: 4.146667rem;
        height: 0.4rem;
        /*background: url(../assets/bigStar.png) no-repeat 0 0;*/
        /*background-size: 4.146667rem 4.4rem;*/
        margin: 0 auto toRem(30px);
      }
    }
    .addEvaluate {
      padding: toRem(20px) toRem(20px) 0 toRem(20px);
      text-align: center;
      .rate_text {
        display: block;
        color: $color-text-base;
        margin-top: toRem(10px);
      }
      textarea {
        display: block;
        resize: none;
        width: 100%;
        height: toRem(225px);
        font-size: 13px;
        background: #f7f9fc;
        padding: toRem(10px);
      }
      .submit {
        display: block;
        width: 100%;
        height: 1.4rem;
        line-height: 1.4rem;
        text-align: center;
        background: #fff;
        color: $brand-primary;
        font-size: 13px;
      }
    }
    .course_comment {
      padding: 0 toRem(30px);
      h1 {
        font-size: 14px;
        line-height: toRem(60px);
      }
      .course_comment_count {
        color: $color-text-thirdly;
      }
    }
    .course_comment_item {
      @extend %clearFix;
      padding: toRem(20px) 0 toRem(30px);
      border-bottom: 1px solid $border-color-light;
      .left_avatar {
        @extend %pull-left;
        width: toRem(80px);
        img {
          width: toRem(65px);
        }
      }
      .right_content {
        @extend %pull-left;
        width: toRem(600px);
        .name {
          font-size: 14px;
          font-weight: 600;
        }
        .star_grade {
          @extend %pull-right;
        }
        .date {
          color: $color-text-thirdly;
          padding: toRem(10px) 0;
        }
        .content {
          color: $color-text-secondary;
        }
      }
    }
    .split {
      display: block;
      height: toRem(20px);
      background-color: $fill-body;
    }
  }
</style>
