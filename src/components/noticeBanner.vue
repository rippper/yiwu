<template>
    <div class="noticeBanner">
        <div class="h_ct_noticebox">
            <img src="../assets/yw_notice.png" alt>
            <div class="h_ct_nb_notice">
                <ul ref="bannerBody">
                    <li v-for="(item, index) in notice" :key="index+item" >
                        <a href="javascript:;" v-text="item.Noticetitle" @click="goArticleDetail(item)"></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'noticebanner',
    data () {
        return {
            bannerIndex: 0,
            noticeRobot: ''
        }
    },
    props: {
        notice: Array
    },
    mounted () {
        this.noticeRobot = setInterval(() => {
            this.bannerTo(++this.bannerIndex)
        }, 5000)
    },
    beforeDestroy () {
        clearInterval(this.noticeRobot)
    },
    methods: {
        bannerTo (index) {
            this.$refs.bannerBody.style.transition = '0.5s';
            this.$refs.bannerBody.style.top = -index * (68 / 75) + 'rem';
            if (index + 1 > this.notice.length) {
                this.bannerMove()
            }
        },
        bannerMove () {
            this.$refs.bannerBody.style.transition = ''
            this.$refs.bannerBody.style.top = '0'
            this.bannerIndex = 0
            this.bannerStart()
        },
        bannerStart () {
            setTimeout(() => {
                this.$refs.bannerBody.style.transition = '0.5s';
                this.$refs.bannerBody.style.top = -(68 / 75) + 'rem'
                this.bannerIndex = 1
            }, 30)
        },
        goArticleDetail (item) {
            this.$router.push({
                path: "newsDetails",
                query: { ref: item.NoticeContent }
            });
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.noticeBanner{
    height: toRem(84px);
    padding-top: toRem(16px);
    .h_ct_noticebox{
        width: toRem(690px);
        height: toRem(68px);
        margin: 0 auto;
        border-radius: toRem(68px);
        background: #f2f4f6;
        display: flex;
        align-items: center;
        img{
            width: toRem(34px);
            height: toRem(29px);
            margin: {
                right: toRem(30px);
                left: toRem(22px);
            }
        }
        .h_ct_nb_notice{
            width: toRem(590px);
            height: toRem(68px);
            position: relative;
            overflow: hidden;
            ul{
                position: absolute;
                top: 0;
                left: 0;
                li{
                    width: toRem(590px);
                    height: toRem(68px);
                    line-height: toRem(68px);
                    font-size: 0.35rem;
                }
            }
        }
    }
}
</style>