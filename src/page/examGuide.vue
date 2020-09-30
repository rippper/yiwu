<template>
  <div class="examGuide container_both">
    <header-fix title="考试中心" fixed>
      <!-- <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i> -->
    </header-fix>

    <div class="guideList">
      <router-link to="/examCenter">
        <div class="myExamList">
          <img src="../assets/myExam.png">
        </div>
      </router-link>
      <!-- <router-link to="/userRaceRank">
        <div class="rankExam">
          <img src="../assets/examRank.png">
        </div>
      </router-link> -->
    </div>
    <bottomBar :selected="'5'"></bottomBar>
  </div>
</template>
<script>
// import { goBack } from "../service/mixins";
import { bottomBar } from '../components'
export default {
  // mixins: [goBack],
  components: {
    bottomBar
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../style/mixin";
.guideList {
  max-width: 10rem;
  margin: 0 auto;
  div {
    width: toRem(690px);
    height: toRem(330px);
    margin: toRem(25px) 0 0 toRem(30px);
    img {
      width: toRem(690px);
      height: toRem(330px);
    }
  }
}
</style>