<template>
  <div class="news_item" @click="goArticleDetail(item)">
    <div class="news_img">
      <error-img :src="item.Articleimg" :error-src="noNews"></error-img>
    </div>
    <div class="news_desc">
      <div class="news_name">{{item.Articletitle}}</div>
      <div class="news_time">{{item.Articlecreatedate}}</div>
    </div>
  </div>
</template>

<script>
  import noNews from '../assets/latestNews.png'

  export default {
    data() {
      return {
        noNews
      }
    },
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      goArticleDetail(item) {
        this.$emit('goArticleDetail', item)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .news_item {
    position: relative;
    padding: toRem(30px);
    @extend %clearFix;
    background-color: $fill-base;
    border-bottom: 1px solid $border-color-base;
    .news_img {
      @extend %pull-left;
      position: relative;
      width: toRem(204px);
      img {
        width: 100%;
        height: toRem(150px);
      }
      .tip {
        position: absolute;
        right: toRem(5px);
        top: toRem(5px);
        @include wh(50px, 27px);
      }
    }
    .news_desc {
      @extend %pull-left;
      width: toRem(480px);
      padding-left: toRem(15px);
    }
    .news_name {
      @include ellipsis_two(2);
      font-size: 15px;
      font-weight: 500;
      // height: toRem(110px);
      padding-top: toRem(10px);
    }
    .news_time {
      color: $color-text-thirdly;
      margin-top: toRem(20px);
    }
  }

</style>
