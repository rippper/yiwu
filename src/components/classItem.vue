<template>
  <li class="class_item clearFix" @click="goDetail(item.Id)">
    <div class="class_ico"><img src="../assets/class_logo.png" alt=""></div>
    <div class="class_right">
      <p class="class_title"><a>{{item.Name}}</a><span>({{item.UserCount}}人报名)</span></p>
      <p>培训时间：{{item.StartDate | dateFilter}} ~ {{item.EndDate | dateFilter}}</p>
      <p>报名时间：截止到{{item.SignEndDate | dateFilter}}</p>
      <p>培训地点：{{item.Address}}</p>
      <mb-tag v-if="item.Status == 'UnJoin'" type="error">未报名</mb-tag>
      <mb-tag v-if="item.Status == 'Join'" type="success">已报名</mb-tag>
      <mb-tag v-if="item.Status == 'UnAudit'" type="info">审核中</mb-tag>
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      goDetail(Id) {
        this.$emit('goDetail', Id)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../style/mixin';
  .class_item {
    background: $fill-base;
    padding: toRem(20px) toRem(30px);
    .class_ico {
      width: toRem(92px);
      height: toRem(240px);
      @extend %pull-left;
      img {
        width: toRem(64px);
      }
    }
    .class_right {
      @extend %pull-right;
      position: relative;
      width: toRem(590px);
      p {
        color: $color-text-secondary;
        margin-bottom: toRem(30px);
      }
      .class_title {
        font-size: 14px;
        font-weight: bold;
        span {
          color: $color-text-thirdly;
        }
      }
    }
    .mb_tag {
      position: absolute;
      right: 0;
      bottom: toRem(20px);
    }
  }
</style>
