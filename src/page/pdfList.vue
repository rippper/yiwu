<template>
  <div class="pdf-list container_both">
    <header-fix title="在线测试题库" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="container">
      <ul>
        <li>
          <router-link :to="{path:'/pdfReader',query:{id:1}}">党员应知应会基本读本</router-link>
        </li>
        <li>
          <router-link :to="{path:'/pdfReader',query:{id:2}}">政治理论应知应会知识测试题库</router-link>
        </li>
      </ul>
    </div>
    <footer-fix></footer-fix>
  </div>
</template>

<script>
  import {goBack} from '../service/mixins';

  export default {
    name: 'pdfList',
    mixins: [goBack],
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .pdf-list {
    .container {
      width: 100%;
      height: 100%;
      background-color: #fff;
      ul {
        li {
          @include ht-lineHt(90px);
          padding: 0 toRem(15px);
          font-size: 16px;
          border-bottom: 1px solid #ddd;
          @extend %ellipsis;
        }
      }
    }
  }
</style>
