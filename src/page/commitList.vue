<template>
    <div class="commitList container_bottom">
        <header-fix title="交流园地" fixed></header-fix>
        <div class="cl_bodylist">
            <nav-bar-list :selected="selected">
                <nav-bar-list-item id="1" v-model="selected">自创文章</nav-bar-list-item>
                <nav-bar-list-item id="2" v-model="selected">课程评论</nav-bar-list-item>
            </nav-bar-list>
        </div>
        <div>
            <nav-bar-item id="1" :selected="selected">
                <section
                    v-infinite-scroll="articleRender"
                    infinite-scroll-immediate-check="immediate"
                    infinite-scroll-disabled="articleLoading"
                    infinite-scroll-distance="10"
                >
                    <self-article-list :List="articleList" :noData="artNoData" :noDataBg="artNoDataBg"></self-article-list>
                </section>
            </nav-bar-item>
            <nav-bar-item id="2" :selected="selected">
                <section
                    v-infinite-scroll="commentRender"
                    infinite-scroll-immediate-check="immediate"
                    infinite-scroll-disabled="commentLoading"
                    infinite-scroll-distance="20"
                >
                    <comment-list :List="commentList" :noData="comNoData" :noDataBg="comNoDataBg"></comment-list>
                </section>
            </nav-bar-item>
        </div>
        <bottom-bar :selected="'3'"></bottom-bar>
    </div>
</template>

<script>
import Vue from 'vue'
import { headerFix, navBarList, navBarListItem, bottomBar, navBarItem, commentList, selfArticleList } from '../components'
import { Indicator, InfiniteScroll } from 'mint-ui'
import { GetYCComment, GetCommnetList } from '../service/getData'

Vue.use(InfiniteScroll)

export default {
    name: 'commitList',
    data () {
        return {
            selected: 1,
            commentList: [],
            comNoDataBg: false,
            comNoData: false,
            comPage: 0,
            comPageSize: 8,
            comCount: 0,
            commentLoading: false,
            articleList: [],
            artNoDataBg: false,
            artNoData: false,
            artPage: 0,
            artPageSize: 10,
            artCount: 16,
            articleLoading: false,
            immediate: false
        }
    },
    mounted () {
        this.articleRender('start')
        this.commentRender('start')
    },
    methods: {
        async articleRender (type) {
            if (type !== 'start') {
                if (this.artNoData || this.artNoDataBg || this.selected == 2) {
                    return true
                }
            }
            Indicator.open()
            let article = await GetYCComment({
                page: this.artPage,
                pagesize: this.artPageSize
            })
            Indicator.close()
            this.artCount = article.count.count
            if (this.artCount == 0) {
                this.artNoDataBg = true
                return false
            }
            if (Array.isArray(article.list)) {
                this.articleList = [...this.articleList, ...article.list]
                this.artPage += 1
            }
            if (this.articleList.length >= this.artCount) {
                this.artNoData = true
                return false
            }  
        },
        async commentRender (type) {
            if (type !== 'start') {
                if (this.comNoData || this.comNoDataBg || this.selected == 1) {
                    return true
                }
            }
            Indicator.open()
            this.commentLoading = true
            let comment = await GetCommnetList({
                page: this.comPage,
                pagesize: this.comPageSize
            })
            console.log(comment)
            // comment = JSON.parse(comment)
            if (typeof (comment) == 'string') {
                comment = comment.replace(/\s/g,"")
                
                comment = JSON.parse(comment)
                comment.list.map(item => {
                    let datepart = item.commenttime.substr(0,10)
                    let timepart = item.commenttime.substr(10,8)
                    item.commenttime = datepart + ' ' + timepart
                })
            }
            console.log(comment)
            Indicator.close()
            this.commentLoading = false
            this.comCount = comment.count.count
            if (this.comCount == 0) {
                this.comNoDataBg = true
                return true
            }
            if (Array.isArray(comment.list)) {
                this.commentList = [...this.commentList, ...comment.list]
                this.comPage += 1
            }
            if (this.commentList.length == this.comCount) {
                this.comNoData = true
                return true
            }  
        }
    },
    components: {
        headerFix,
        navBarList,
        navBarListItem,
        bottomBar,
        navBarItem,
        commentList,
        selfArticleList
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.commitList{
    width: 100%;
    max-width: 10rem;
    padding-top: toRem(173px);
    margin: 0 auto;
    background: #fff;
    .cl_bodylist{
        width: 100%;
        position: fixed;
        top: toRem(92px);
        left: 0;
        z-index: 99;
    }
}
</style>