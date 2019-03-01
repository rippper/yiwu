<template>
  <div class="container_top">
    <header-fix title="在线测试排行" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div  class="user_race_rank" >
      <div class="examTitle">{{rankData.exam_title}}</div>
      <p>您的测试最高分：{{rankData.userHighScore}}</p>
      <p>目前测试人数：{{rankData.examUserCount}}</p>
      <p>您的测试排名：{{rankData.userRank}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { GetUserRaceRank } from "../service/getData";
import { goBack } from "../service/mixins";

export default {
  name: "userRaceRank",
  mixins: [goBack],
  data() {
    return {
      rankData: {}
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.getRankData();
  },
  methods: {
    async getRankData() {
      let data = await GetUserRaceRank({ UserID: this.userInfo.UserID });
      console.log(data);
      this.rankData = data;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../style/mixin";

.user_race_rank {
  .examTitle {
    width: toRem(690px);
    height: toRem(70px);
    background: #4793de;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color:#fff;
    text-align: center;
  }
  padding: toRem(20px);
  font-size: 18px;
  line-height: 2;
}
</style>
