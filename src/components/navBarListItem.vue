<template slot-scope="scope">
    <div class="navBarListItem" @click="changeSelect">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'navBarListItem',
    props: {
        id: [String, Number]
    },
    methods: {
        changeSelect () {
            console.log(this.id)
            this.$emit('input', this.id)
        }
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.navBarListItem{
    flex: 1;
    height: 100%;
    line-height: toRem(80px);
    font-size: toRem(30px);
    text-align: center;
}
</style>