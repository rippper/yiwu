<template>
    <div class="livelist container_both">
        <header-fix title="直播列表" fixed></header-fix>
        <div class="ll_list">
            <live-list-item :liveItem="liveItem"></live-list-item>
            <div class="ll_list_noData" v-show="noData"></div>
        </div>
        <bottom-bar :selected="'4'"></bottom-bar>
    </div>
</template>

<script>
import { LiveTelecastList } from '../service/getData';

export default {
    name: 'livelist',
    data () {
        return {
            liveItem: [],
            noData: false
        }
    },
    mounted () {
        this.render()
    },
    methods: {
        printStr () {
            console.log('123')
        },
        async render () {
            let msg = await LiveTelecastList({})
            if (msg.msg === '成功') {
                if (msg.data.lists.length == 0) {
                    this.noData = true
                    return
                }
                this.liveItem = msg.data.lists
            }
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.livelist{
    width: 100%;
    max-width: 10rem;
    margin: 0 auto;
    background: #fff;
    position: relative;
    .ll_list_noData{
        width: 100%;
        height: 100%;
        background: url('../assets/no_data.png') no-repeat 50%, 50%;
        background-size: toRem(254px) toRem(402px);
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>