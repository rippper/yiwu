/**
* 新闻列表
*/
<template>
  <div class="news_list">
    <news-item v-for="item in newsData" :key="item.Articleid" :item="item" @goArticleDetail="goArticleDetail(item)" />
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>

  import { toPlay } from '../service/mixins'

  export default {
    mixins: [toPlay],
    props: {
      newsData: Array,
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
      goArticleDetail (item) {
        this.$router.push({path: 'newsDetails', query: {ref: item.articleContent}})
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .news_list {
    &.books{
      .news_img{
        img{
          height: auto;
        }
      }
      .news_desc{
        .news_time{
          position: absolute;
          left: toRem(30px+204px+15px);
          bottom: toRem(30px);
        }
      }
    }
  }
</style>
