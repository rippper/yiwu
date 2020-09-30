<template>
    <div class="commentList">
        <ul>
            <li v-for="(item, index) in List" :key="index">
                <p class="cl_title" v-text="item.Title"></p>
                <div class="cl_content">
                    <div class="cl_content_img">
                        <img src="../assets/person_cener_avatar.png" alt>
                    </div>
                    <div class="cl_content_info">
                        <div class="cl_ci_namedate">
                            <div class="cl_ci_name" v-text="item.username"></div>
                            <div class="cl_ci_date" v-text="item.commenttime"></div>
                        </div>
                        <div class="cl_ci_content" v-text="item.optionvalue"></div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="noDataBg" v-if="noDataBg"></div>
        <div class="no-data" v-if="noData">没有更多内容了...</div>
    </div>
</template>

<script>
export default {
    name: 'commentList',
    props: {
        List: Array,
        noDataBg: Boolean,
        noData: Boolean
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.commentList{
    ul{
        li{
            padding: toRem(35px) toRem(30px) 0;
        }
    }
    .cl_title{
        max-height: toRem(80px);
        line-height: toRem(40px);
        font-size: toRem(32px);
        margin-bottom: toRem(30px);
        @include ellipsis_two(2);
    }
    .cl_content{
        display: flex;
        justify-content: space-between;
    }
    .cl_content_img{
        width: toRem(100px);
        img{
            width: toRem(80px);
            height: toRem(80px);
        }
    }
    .cl_content_info{
        width: toRem(590px);
        border-bottom: 1px solid #ddd;
    }
    .cl_ci_namedate{
        display: flex;
    }
    .cl_ci_name{
        margin: 0 toRem(25px) toRem(25px) 0;
        font-size: toRem(27px);
    }
    .cl_ci_date{
        font-size: toRem(24px);
        color: #a9a9a9;
    }
    .cl_ci_content{
        margin-bottom: toRem(30px);
        font-size: toRem(30px);
    }
}
</style>