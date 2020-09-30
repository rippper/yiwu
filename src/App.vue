<template>
  <div class="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="$route.fullpath"></router-view>
      </keep-alive>
    </transition>

    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" :key="$route.fullpath"></router-view>
    </transition>
  </div>
  <!--添加unique的key是为了保证当重复使用组件时，会刷新页面。（虽然损失了一丢丢性能，但避免了无限的bug）
  如/posts/a和/posts/b使用的是同一组件
  因为vue-router会"智能地"发现是同一个组件，然后它就决定要复用这个组件，所以你在created函数里写的方法压根就没执行。-->
</template>

<script>
  export default {
  }
</script>

<style>
@import '../static/css/fonts.css';
  .router-fade-enter-active,
  .router-fade-leave-active {
    transition: opacity 0.3s;
  }

  .router-fade-enter,
  .router-fade-leave-active {
    opacity: 0;
  }
</style>
