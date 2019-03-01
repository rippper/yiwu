/**
* 新闻中心
*/
<template>
  <div class="newsCenter container_both">
    <header-fix :title="articleTitle" fixed>
      <div slot="left">
        <a @click="goBack">
          <i class="webapp webapp-back"></i>
        </a>
        <a @click="toggleNav" class="category_icon">
          <i class="webapp webapp-category"></i>
        </a>
      </div>
      <router-link slot="right" :to="{path: '/newsSearch', query:{id: channelId}}">
        <i class="webapp webapp-search"></i>
      </router-link>
    </header-fix>
    <nav-slide :show="showSlide" @showChange="showChange">
      <div slot="left" class="category">
        <tree
          :data="articleCategory"
          :on-select="searchArticle"
          :selected-id="channelId"
          :is-show="queryId == 90?true:false"
        ></tree>
      </div>
      <div slot="right">
        <section
          v-infinite-scroll="getArticleList"
          infinite-scroll-immediate-check="immediate"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <news-list
            :class="{books: queryId == 90}"
            :news-data="articleData"
            :no-data-bg="noDataBg"
            :no-data="noData"
          ></news-list>
        </section>
      </div>
    </nav-slide>
    <footer-fix></footer-fix>
  </div>
</template>
<script>
import Vue from "vue";
import { Indicator, InfiniteScroll } from "mint-ui";
import {
  getArticleInfoList,
  getArticleChannelInfoList
} from "../service/getData";
import { goBack } from "../service/mixins";

Vue.use(InfiniteScroll);

export default {
  mixins: [goBack],
  data() {
    return {
      articleTitle: "新闻资讯",
      showSlide: false,
      articleCategory: [],
      channelId: "",
      articleData: [],
      loading: false,
      immediate: false,
      page: 1,
      noData: false,
      noDataBg: false,
      queryId: ""
    };
  },
  created() {
    this.queryId = this.$route.query.id || "";
    this.channelId = this.$route.query.id || "";
    this.articleTitle = this.$route.query.title || this.articleTitle;
    document.title = this.articleTitle;
  },
  mounted() {
    this.getArticleCategory();
    this.getArticleList();
  },
  methods: {
    toggleNav() {
      this.showSlide = !this.showSlide;
    },
    showChange(val) {
      this.showSlide = val;
    },
    //文章分类
    async getArticleCategory() {
      let data = await getArticleChannelInfoList();
      console.log(data);
      let arr = data.ChannelInfoList
      // let arr = data.ChannelInfoList.filter(e => {
      //   return e.Parent_ID == 0;
      // }).map((item, index) => {
      //   return item;
      // });
      console.log(arr);
      data.ChannelInfoList.filter(e => {
        return e.Parent_ID != 0;
      }).forEach((item, index) => {
        let i = 0;
        arr.forEach((obj, pos) => {
          if (obj.Channel_id == item.Parent_ID) {
            i = pos;
            if (i >= 0) {
              if (!arr[i].Nodes) {
                arr[i].Nodes = [];
              }
              arr[i].Nodes.push(item);
            }
          }
        });
      });

      this.articleCategory = arr;
      console.log(this.articleCategory);
    },
    //文章列表
    async getArticleList() {
      this.noData = false;
      this.noDataBg = false;
      this.loading = true;
      Indicator.open();
      let data = await getArticleInfoList({
        Channel_id: this.channelId,
        Page: this.page
      });
      Indicator.close();
      let list = [];
      if (Array.isArray(data.articleInfoList)) {
        list = data.articleInfoList;
      }
      if (list.length == 0 && this.page > 1) {
        this.noData = true;
        return;
      }
      if (list.length == 0 && this.page == 1) {
        this.noDataBg = true;
        return;
      }
      this.articleData = this.articleData.concat(list);
      this.loading = false;
      this.page += 1;
    },
    searchArticle(data) {
      this.page = 1;
      this.channelId = data.Channel_id;
      this.articleTitle = data.Channel_name;
      this.showSlide = false;
      this.articleData = [];
      this.getArticleList();
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../style/mixin";

.newsCenter {
  width: 100vw;
  height: 100vh;
  .category_icon {
    margin-left: toRem(10px);
  }
}
</style>
