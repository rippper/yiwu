/**
* 消息详情
*/
<template>
  <div class="notice_detail container_both">
    <!--头部-->
    <header-fix :title="title" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="notice_title">{{messageData.MessageTitle}}</div>
    <div class="notice_desc">
      <span class="send_person">发送人：{{messageData.FromUserName}}</span>
      <span class="send_date">发布日期：{{messageData.SendTime}}</span>
    </div>
    <div class="articleDet" v-html="html"></div>
    <bottom-bar></bottom-bar>
  </div>
</template>
<script>
  import { Indicator } from 'mint-ui'
  import { goBack } from '../service/mixins'
  import { HTMLDecode } from '../plugins/utils'
  import { getNoticeInfoContent } from '../service/getData'
  import { bottomBar } from '../components'

  export default {
    mixins: [goBack],
    data () {
      return {
        title: '消息详情',
        messageData: {},
        messageId: '',
        html: ''
      }
    },
    created () {
      this.messageId = this.$route.query.id || ''
      this.messageData.MessageTitle = this.$route.query.title || ''
      this.messageData.FromUserName = this.$route.query.author || ''
      this.messageData.SendTime = this.$route.query.date || ''
    },
    mounted () {
      this.getMessageContent(this.messageId)
    },
    methods: {
      async getMessageContent (Noticeid) {
        Indicator.open()
        let data = await getNoticeInfoContent({Noticeid})
        Indicator.close()
        this.html = HTMLDecode(data)
      },
    },
    components: {
      bottomBar
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .notice_detail {
    background-color: $fill-base;
    .articleDet {
      width: 100%;
      overflow: hidden;
      font-size: 16px;
      padding: toRem(40px) toRem(20px) toRem(20px) toRem(20px);
    }
    .notice_title {
      padding: toRem(20px) toRem(20px);
      font-size: 20px;
      font-weight: 600;
    }
    .notice_desc {
      @extend %clearFix;
      color: $color-text-thirdly;
      padding: 0 toRem(20px);
      .send_person {
        @extend %pull-left;
      }
      .send_date {
        @extend %pull-right;
      }
    }
  }
</style>
