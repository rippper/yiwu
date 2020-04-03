<template>
  <div class="notification container_top">
    <header-fix :title="noticeTitle" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <div slot="right" class="clearFix"></div>
    </header-fix>
    <div>
      <mt-tab-container>
        <mt-tab-container-item>
          <mt-cell
            v-for="item in noticeData"
            :key="item.Noticeid"
            :title="item.Noticetitle"
            @click.native="goArticleDetail(item)"
          >
            <div class="left_icon" slot="icon">
              <img
                v-if="item.Noticecreatedate.indexOf('2018')==0"
                class="new_ico"
                src="../assets/new.png"
              >
              <img v-else class="dian" src="../assets/blue_cicle.png" alt>
            </div>
          </mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- <bottom-bar></bottom-bar> -->
  </div>
</template>
<script>
import { Cell, TabContainer, TabContainerItem } from "mint-ui";
import Vue from "vue";
import { goBack } from "../service/mixins";
import { getNoticeInfoList } from "../service/getData";
// import { bottomBar } from '../components'
Vue.component(Cell.name, Cell);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
export default {
  mixins: [goBack],
  data() {
    return {
      noticeTitle: "通知公告",
      noticeData: []
    };
  },
  created() {
    this.getNoticeInfo();
  },
  methods: {
    async getNoticeInfo() {
      let res = await getNoticeInfoList({
        Page: 1,
        PageCount: 6
      });
      this.noticeData = res.NoticeInfoList;
      // console.log(this.noticeData);
    },
    goArticleDetail(item) {
      this.$router.push({
        path: "newsDetails",
        query: { ref: item.NoticeContent }
      });
    }
  }
  // components: {
  //   bottomBar
  // }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../style/mixin";

.left_icon {
  flex-shrink: 0;
  margin-bottom: toRem(72px);
  @include wh(37px, 15px);
  text-align: center;

  .new_ico {
    @include wh(37px, 15px);
  }

  .dian {
    @include square(15px);
  }
}
.mint-cell {
  .mint-cell-wrapper {
    .mint-cell-title {
      width: 100%;

      .mint-cell-text {
        @extend %ellipsis;
        color: #545454;
      }
    }
  }
}
</style>