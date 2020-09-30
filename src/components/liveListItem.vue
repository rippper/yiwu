<template>
    <div class="livelistitem">
        <ul>
            <li v-for="(item, index) in liveItem" :key="index" @click="linkToDetail(item)">
                <div class="lli_time">
                    <div class="lli_time_left"></div>
                    <div class="lli_time_right" v-text="item.start_time"></div>
                </div>
                <div class="lli_liveitem">
                    <div class="lli_li_left">
                        <img :src="item.thumb" alt v-if="item.thumb">
                        <img src="../assets/yw_nopics.png" alt v-else>
                    </div>
                    <div class="lli_li_right">
                        <p v-text="item.subject"></p>
                        <div class="lli_li_courseType">
                            <div class="lli_li_liveType" :class="{ 'lli_li_ready': item.status == 2, 'lli_li_end': item.status == 3, 'lli_li_living': item.status == 1 }"></div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { CheckCanWatchByLiveId } from '../service/getData';
import { Toast } from 'mint-ui'

export default {
    name: 'livelistitem',
    props: {
        liveItem: Array
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        async linkToDetail (item) {
            let msg = await CheckCanWatchByLiveId({
                userid: this.userInfo.UserID,
                liveid: item.webinar_id
            })
            if (msg.result === 'False') {
                Toast({message: '暂未权限进入直播间', position: 'bottom'})
                return false
            } else if (msg.result === 'True') {
                this.$router.push({ path: '/livedetail', query: { webinar_id: item.webinar_id, userId: this.userInfo.UserID, name: this.userInfo.Username } })
            }
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.livelistitem{
    width: toRem(690px);
    padding: toRem(34px) 0 0;
    margin: 0 auto;
    ul{
        li{
            margin-bottom: toRem(10px);
            .lli_time{
                margin-bottom: toRem(10px);
                display: flex;
                align-items: center;
                .lli_time_left{
                    width: toRem(27px);
                    height: toRem(27px);
                    margin-right: toRem(19px);
                    background: url('../assets/yw_livecircle.png') no-repeat;
                    background-size: 100%;
                }
                .lli_time_right{
                    color: #999;
                    font-size: toRem(26px);
                }
            }
            .lli_liveitem{
                width: 100%;
                height: toRem(197px);
                display: flex;
                &::before{
                    content: '';
                    width: 1px;
                    height: toRem(197px);
                    margin-left: toRem(13px);
                    display: inline-block;
                    background: #aaa;
                }
                .lli_li_left{
                    height: toRem(197px);
                    padding-top: toRem(9px);
                    margin-left: toRem(32px);
                    img{
                        width: toRem(234px);
                        height: toRem(158px);
                        border-radius: toRem(5px);
                    }
                }
                .lli_li_right{
                    padding-top: toRem(20px);
                    margin-left: toRem(21px);
                    p{
                        height: toRem(72px);
                        font-size: toRem(30px);
                        color: #333;
                        @include ellipsis_two(2);
                    }
                    .lli_li_courseType{
                        margin: toRem(32px) 0 0 toRem(7px);
                    }
                    .lli_li_liveType{
                        width: toRem(122px);
                        height: toRem(37px);
                    }
                    .lli_li_ready{
                        background: url('../assets/yw_liveready.png') no-repeat;
                        background-size: 100%;
                    }
                    .lli_li_end{
                        background: url('../assets/yw_liveend.png') no-repeat;
                        background-size: 100%;
                    }
                    .lli_li_living{
                        background: url('../assets/yw_living.png') no-repeat;
                        background-size: 100%;
                    }
                }
            }
        }
    }
}
</style>
