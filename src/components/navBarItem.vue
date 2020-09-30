<template>
    <div class="navBarItem" v-show="id == selected">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'navBarItem',
    props: {
        id: [String, Number],
        selected: [String, Number]
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.navBarItem{
    width: 100%;
    height: 100%;
    // overflow-y: auto;
}
</style>