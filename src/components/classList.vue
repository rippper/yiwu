/**
* 培训班列表
*/
<template>
  <div class="class_list">
    <ul>
      <class-item v-for="item in data" :key="item.Id" @goDetail="goDetail"/>
    </ul>
    <div class="noDataBg" v-if="noDataBg"></div>
  </div>
</template>
<script>
  export default {
    props: {
      data: Array,
      noDataBg: Boolean
    },
    methods: {
      goDetail (Id) {
        this.$router.push({path: 'classDetail', query: {Id}})
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .class_list {

  }
</style>
