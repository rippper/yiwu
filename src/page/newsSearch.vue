/**
* 新闻搜索
*/
<template>
  <div class="newsSearch container_both">
    <!--头部-->
    <header-fix title="搜索" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <search v-model="keyword" :search="clickSearch">
      <section slot v-infinite-scroll="getArticleList"
               infinite-scroll-immediate-check="immediate"
               infinite-scroll-disabled="loading"
               infinite-scroll-distance="10">
        <news-list :news-data="articleData" :no-data-bg="noDataBg" :no-data="noData"></news-list>
      </section>
    </search>
    <bottom-bar></bottom-bar>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, InfiniteScroll } from 'mint-ui'
  import { getArticleInfoList } from '../service/getData'
  import { goBack } from '../service/mixins'
  import { bottomBar } from '../components'

  Vue.use(InfiniteScroll)
  export default {
    mixins: [goBack],
    data () {
      return {
        keyword: '',
        oldKeyword: '',
        channelId: '',
        articleData: [],
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false,
      }
    },
    created () {
      this.channelId = this.$route.query.id || ''
    },
    mounted () {
    },
    methods: {
      async getArticleList () {
        this.noData = false
        this.noDataBg = false
        this.loading = true
        this.oldKeyword = this.keyword //记录搜索keyword
        Indicator.open()
        let data = await getArticleInfoList({Keyword: this.keyword, Channel_id: this.channelId, Page: this.page})
        Indicator.close()
        let list = []
        if (Array.isArray(data.articleInfoList)) {
          list = data.articleInfoList
        }
        if (list.length == 0 && this.page > 1) {
          this.noData = true
          return
        }
        if (list.length == 0 && this.page == 1) {
          this.noDataBg = true
          return
        }
        this.articleData = this.articleData.concat(list)
        this.loading = false
        this.page += 1
      },
      clickSearch () {
        if (this.keyword != this.oldKeyword && !!this.keyword) {
          this.articleData = []
          this.page = 1
          this.getArticleList()
        }
      }
    },
    components: {
      bottomBar
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .newsSearch {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: $fill-body;
  }
</style>
