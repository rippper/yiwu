<template>
    <div class="selfarticlelist">
        <ul>
            <li v-for="(item, index) in List" :key="index">
                <router-link :to="{ path: '/selfArticleContent', query: { address: item.outline }}">
                    <p class="sal_title" v-text="item.title"></p>
                    <div class="sal_info">
                        <p class="sal_info_author">作者：<span v-text="item.username"></span></p>
                        <div class="sal_info_date" v-text="item.createtime"></div>
                    </div>
                </router-link>
            </li>
        </ul>
        <div class="noDataBg" v-if="noDataBg"></div>
        <div class="no-data" v-if="noData">没有更多内容了...</div>
    </div>
</template>

<script>

export default {
    name: 'selfarticlelist',
    props: {
        List: Array,
        noDataBg: Boolean,
        noData: Boolean
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.selfarticlelist{
    ul{
        li{
            padding: toRem(35px) toRem(30px) toRem(27px);
            border-bottom: toRem(1px) solid #e6e6e6;
            .sal_title{
                max-height: toRem(80px);
                line-height: toRem(40px);
                font-size: toRem(28px);
                @include ellipsis_two(2);
            }
            .sal_info{
                display: flex;
                justify-content: space-between;
                margin-top: toRem(44px);
            }
            .sal_info_author{
                font-size: toRem(23px);
                color: #999;
            }
            .sal_info_date{
                font-size: toRem(23px);
                color: #999;
            }
        }
    }
}
</style>