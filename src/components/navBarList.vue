<template>
    <div class="navBarList">
        <div class="navBarList_inner">
            <slot :num="changeProps"></slot>
        </div>
        <div class="nbl_bottom_bit" :class="{ 'nbl_bb_select': selected == 2 }"></div>
    </div>
</template>

<script>
export default {
    name: 'navBarList',
    props: {
        selected: {
            type: [String, Number],
            default: 0
        }
    },
    data () {
        return {
            num: 1
        }
    },
    methods: {
        navChange (val) {
            this.$emit('input', val)
        },
        changeProps (val) {
            this.navChange(val)
        }
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.navBarList{
    width: 100%;
    max-width: 10rem;
    height: toRem(81px);
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    position: relative;
    .nbl_bottom_bit{
        width: toRem(140px);
        height: 2px;
        background: $brand-primary;
        position: absolute;
        left: toRem(118px);
        bottom: 0;
        transition: 0.3s;
    }
    .nbl_bb_select{
        left: toRem(494px);
    }
    .navBarList_inner{
        width: 100%;
        height: toRem(80px);
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
    }
}
</style>