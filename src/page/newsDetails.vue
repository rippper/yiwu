/**
* 文章内容
*/
<template>
  <div class="article_container">
    <!--头部-->
    <header-fix :title="articleType == 'heart' ? '心理热线' : '文章详情'" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <!--<span slot="right" class="read_count">{{articleDetails.ClickCount}}阅读</span>-->
    </header-fix>
    <div v-if="articleId">
      <section class="article_details_title">
        <h2>{{articleDetails.ArticleTitle}}</h2>
        <div class="article_details_desc clearFix">
          <span class="article_details_resource">{{articleDetails.Source}}</span>
          <span>{{articleDetails.ArticleCreateDate | dateFilter}}</span>
          <span class="pull-right article_details_author">作者：{{articleDetails.ArticleAuthor}}</span>
        </div>
      </section>
      <article class="article_details_content" v-html="articleDetails.Description"></article>
      <div class="article_footer">
        <mt-button
          v-if="!articleDetails.IsCollection"
          size="normal"
          type="primary"
          @click.native="collectNews"
          plain
        >
          <i class="webapp webapp-favorite"></i>收藏
        </mt-button>
        <mt-button v-else size="normal" type="primary" @click.native="cancelCollect" plain>
          <i class="webapp webapp-favorite-fill"></i>取消收藏
        </mt-button>
        <mt-button size="normal" type="primary" @click.native="toggleShowShare" plain>
          <i class="webapp webapp-share"></i>分享
        </mt-button>
      </div>
      <transition name="fade">
        <div class="filter_layer" v-if="showShare" @click="toggleShowShare"></div>
      </transition>
      <transition name="slide-top">
        <div class="share_list" v-if="showShare">
          <div class="share_item" @click.prevent="shareWeiBo">
            <a>
              <img src="../assets/weibo.png" alt>
            </a>
            <p>新浪微博</p>
          </div>
          <!--<div class="share_item" @click.prevent="shareAppMessage">
            <a><img src="../assets/weixin.png" alt=""/></a>
            <p>微信好友</p>
          </div>
          <div class="share_item" @click.prevent="shareQQ">
            <a><img src="../assets/qq.png" alt=""/></a>
            <p>QQ</p>
          </div>-->
          <div class="cancel_share" @click="toggleShowShare">取消</div>
        </div>
      </transition>
    </div>
    <div class="news_content" v-if="iframeSrc">
      <iframe :src="iframeSrc" frameborder="0"></iframe>
    </div>
    <!-- <bottom-bar></bottom-bar> -->
  </div>
</template>
<script>
import { MessageBox, Toast } from "mint-ui";
import wx from "weixin-js-sdk";
import { goBack } from "../service/mixins";
import {
  Auth,
  AddCollectionList,
  DeleteCollectionList,
  getArticleInfoContent
} from "../service/getData";
// import { bottomBar } from '../components'
// ArticleDetail,
//  import { getWXUrl } from '../plugins/utils'
export default {
  mixins: [goBack],
  data() {
    return {
      articleId: "",
      iframeSrc: "",
      articleDetails: {
        ArticleName: "",
        AuthorName: "",
        Click: 0,
        Content: "",
        CreateDate: "",
        Source: "",
        IsCollection: 0
      },
      showShare: false,
      link: window.location.href,
      articleType: this.$route.query.type || ''
    };
  },
  created() {
    this.articleId = this.$route.query.id || "";
    this.iframeSrc = this.$route.query.ref || "";
  },
  mounted() {
    if (this.articleType == 'heart') {
      document.title = '心理热线'
    }
    // this.getArticleDetail()
    // this.getWechatWxAuthModel()
  },
  methods: {
    //文章内容
    async getArticleDetail() {
      let data = await getArticleInfoContent({ Id: this.articleId });
      this.articleDetails = data.Data;
      this.content = data.Data.Content;
      this.checkWxjsaApi();
    },
    //收藏
    async collectNews() {
      let data = await AddCollectionList({ ObjId: this.articleId, ObjType: 0 });
      if (data.Type == 1) {
        Toast({ message: "收藏成功", position: "bottom" });
        this.articleDetails.IsCollection = true;
      }
    },
    //取消收藏
    async cancelCollect() {
      let IdItem = [];
      IdItem.push(this.articleId);
      let data = await DeleteCollectionList({ IdItem });
      if (data.Type == 1) {
        Toast({ message: "取消收藏成功", position: "bottom" });
        this.articleDetails.IsCollection = false;
      }
    },
    /*微信签名*/
    async getWechatWxAuthModel() {
      let data = await Auth({ Url: this.url });
      console.log(this.url);
      if (data.Type == 1) {
        wx.config({
          debug: false,
          appId: data.Data.appId, // 必填，公众号的唯一标识
          timestamp: data.Data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.Data.noncestr, // 必填，生成签名的随机串
          signature: data.Data.signature, // 必填，签名
          jsApiList: [
            "checkJsApi",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo",
            "onMenuShareQZone"
          ] // 必填，需要使用的JS接口列表
        });
      } else if (data.Type != 401) {
        MessageBox("警告", data.Message);
      }
    },
    checkWxjsaApi() {
      let t = this;
      //        let articlePath = this.$router.resolve({path: '/newsDetails', query: {id: t.articleId}})
      let shareData = {
        title: t.articleDetails.ArticleTitle, // 分享标题
        desc: t.articleDetails.ArticleTitle, // 分享描述
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        success: function() {
          // 用户确认分享后执行的回调函数
          console.log("success");
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
          console.log("cancel");
        }
      };
      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo",
            "onMenuShareQZone"
          ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function(res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          }
        });
        /*朋友圈*/
        wx.onMenuShareTimeline({
          title: t.articleDetails.ArticleTitle, // 分享标题
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          success: function() {
            // 用户确认分享后执行的回调函数
            console.log("success");
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
            console.log("cancel");
          }
        });
        /*朋友*/
        wx.onMenuShareAppMessage(shareData);
        /*QQ*/
        wx.onMenuShareQQ(shareData);
        /*腾讯微博*/
        wx.onMenuShareWeibo(shareData);
        /*QQ空间*/
        wx.onMenuShareQZone(shareData);
      });
    },
    /*分享新浪微博*/
    shareWeiBo() {
      let _shareUrl =
        "http://v.t.sina.com.cn/share/share.php?&appkey=895033136"; //真实的appkey，必选参数
      _shareUrl += "&url=" + encodeURIComponent(document.location); //参数url设置分享的内容链接|默认当前页location，可选参数
      _shareUrl +=
        "&title=" +
        encodeURIComponent(this.articleDetails.ArticleName || document.title); //参数title设置分享的标题|默认当前页标题，可选参数
      _shareUrl += "&source=" + encodeURIComponent("");
      _shareUrl += "&sourceUrl=" + encodeURIComponent("");
      _shareUrl += "&content=" + "utf-8"; //参数content设置页面编码gb2312|utf-8，可选参数
      _shareUrl += "&pic=" + encodeURIComponent(""); //参数pic设置图片链接|默认为空，可选参数
      window.open(
        _shareUrl,
        "_blank",
        "width=" +
          +",height=" +
          +",top=" +
          +",left=" +
          +",toolbar=no,menubar=no,scrollbars=no, resizable=1,location=no,status=0"
      );
    },
    toggleShowShare() {
      this.showShare = !this.showShare;
    }
  },
  // components: {
  //   bottomBar
  // },
  beforeRouteLeave(to, from, next) {
    MessageBox.close();
    next();
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../style/mixin";

.article_container {
  margin: 0 toRem(-30px);
  padding: toRem(92px) toRem(30px) toRem(30px) toRem(30px);
  background-color: $fill-base;
  .read_count {
    display: inline-block;
    min-width: toRem(130px);
    height: toRem(50px);
    line-height: toRem(50px);
    text-align: center;
    @include border-left-radius(25px);
    @include border-right-radius(25px);
    background-color: #fff;
    color: $brand-primary;
    font-size: 12px;
  }
  .news_content{
    width: 100%;
    max-width: 10rem;
  }
  iframe {
    width: 100%;
    max-width: 10rem;
    height: 100vh;
  }
  img{
    max-width: 10rem;
  }
}

.article_details_desc {
  padding: toRem(20px) 0;
  color: $color-text-thirdly;
}

.article_details_title {
  color: $color-text-secondary;
  border-bottom: 1px dashed $border-color-base;
  padding-top: toRem(20px);
  h2 {
    font-weight: 600;
    font-size: 18px;
    color: $color-text-base;
  }
  span {
    margin-right: toRem(25px);
  }
}

.article_details_content {
  padding-top: toRem(20px);
  img {
    width: 100%;
  }
}

.article_footer {
  text-align: center;
  padding: toRem(80px) 0;
  .mint-button {
    height: toRem(60px);
  }
  .mint-button--normal,
  .mint-button--small {
    padding: 0 toRem(60px);
  }
  .mint-button:first-child {
    margin-right: toRem(70px);
  }
  .mint-button:last-child {
    margin-left: toRem(70px);
  }
  .webapp {
    color: $brand-primary;
    margin-right: toRem(5px);
  }
}

.share_list {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: $fill-body;
  z-index: 60;
  @extend %clearFix;
  .share_item {
    @extend %pull-left;
    padding: toRem(24px) 0 toRem(10px) toRem(24px);
    width: toRem(156px);
    text-align: center;
    p {
      line-height: toRem(50px);
    }
  }
  img {
    width: toRem(108px);
  }
  .cancel_share {
    background-color: $fill-base;
    text-align: center;
    line-height: toRem(94px);
    color: $brand-primary;
    @extend %pull-left;
    width: 100%;
  }
}
</style>
