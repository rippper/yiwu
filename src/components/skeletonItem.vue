<template>
  <div class="skeleton-item">
    <div class="animated-background skeleton-item_img"></div>
    <div class="animated-background skeleton-item_line_1"></div>
    <div class="animated-background skeleton-item_line_2"></div>
    <div class="animated-background skeleton-item_line_3"></div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  @include keyframes(placeHolderShimmer){
    0%{
      background-position: -468px 0
    }
    100%{
      background-position: 468px 0
    }
  }
  .animated-background {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #bbb 8%, #eee 18%, #bbb 33%);
    background-size: 800px 104px;
    height: 40px;
    position: relative;
  }

  .skeleton-item{
    padding: toRem(20px) toRem(30px);
    @extend %clearFix;
    background-color: $fill-base;
    border-bottom: 1px solid $border-color-base;
    height: toRem(188px);
    .skeleton-item_img{
      @include wh(258px,148px);
      float: left;
    }
    .skeleton-item_line_1{
      margin-left: toRem(280px);
      @include wh(400px, 37.5px);
    }
    .skeleton-item_line_2{
      margin-top: toRem(15px);
      margin-left: toRem(280px);
      @include wh(350px, 20px);
    }
    .skeleton-item_line_3{
      margin-top: toRem(15px);
      margin-left: toRem(280px);
      @include wh(100px, 16px);
    }
  }
</style>
