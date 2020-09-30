<template>
    <div class="courseType container_both">
        <header-fix title="课程中心" fixed>
            <router-link class="ct_fangdajing" slot="right" to="/courseSearch"><i class="webapp webapp-search"></i></router-link>
        </header-fix>
        <div class="ct_coursetypelist">
            <div class="ct_ct_coursetypelist_inner">
                <ul>
                    <li v-for="(item, index) in channelInfoList" :key="index" ref="firstfloor">
                        <div class="ct_ctl_firstfloor">
                            <div class="ct_ctl_ff_left">
                                <router-link :to="{ path: '/courseCenter', query: { id: item.Channel_id, title: item.Channel_name } }">
                                    <span v-text="item.Channel_name"></span>
                                </router-link>
                            </div>
                            <div class="ct_ctl_ff_right" v-show="item.Nodes" @click="floorClose(index)">
                                <img src="../assets/yw_todown.png" alt>
                            </div>
                            <div class="ct_ctl_ff_rightleft" v-show="!item.Nodes" @click="linkTo(item.Channel_id, item.Channel_name)">
                                <img src="../assets/yw_toLeft.png" alt>
                            </div>
                        </div>
                        <div class="ct_ctl_secondfloor" :class="{ ct_ctl_isextend: item.toExtend }" v-if="item.Nodes" ref="secoundfloor">
                            <ul>
                                <li v-for="(itemSon) in item.Nodes" :key="itemSon.Channel_name" @click="linkTo(itemSon.Channel_id, itemSon.Channel_name)">
                                    <a href="javascript:;" v-text="itemSon.Channel_name"></a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <bottom-bar :selected="'2'"></bottom-bar>
    </div>
</template>

<script>
import { headerFix, bottomBar } from '../components'
import { getChannelInfoList } from '../service/getData'

export default {
    name: 'courseType',
    data () {
        return {
            channelInfoList: []
        }
    },
    mounted () {
        this.render()
    },
    methods: {
        floorClose (index) {
            this.channelInfoList[index].toExtend = !this.channelInfoList[index].toExtend
        },
        linkTo (id, name) {
            this.$router.push({ path: '/courseCenter', query: { id: id, title: name } })
        },
        async render () {
            let data = await getChannelInfoList()
            let arr = data.ChannelInfoList.filter((e) => {
                return e.Parent_ID == 0
            }).map((item, index) => {
                item.toExtend = 1
                return item
            })
            // console.log(arr);
            data.ChannelInfoList.filter((e) => {
                return e.Parent_ID != false
            }).forEach((item, index) => {
                let i = 0
                arr.forEach((obj, pos) => {
                    if (obj.Channel_id == item.Parent_ID) {
                        i = pos
                        if (i >= 0) {
                            if (!arr[i].Nodes) {
                            arr[i].Nodes = []
                            }
                            arr[i].Nodes.push(item)
                        }
                    }
                })
            })
            this.channelInfoList = arr
        }
    },
    components: {
        headerFix,
        bottomBar
    }
}
</script>

<style lang="scss">
  @import "../style/mixin";
    .courseType{
        background: #fff;
        .ct_fangdajing{
            position: relative;
            top: toRem(6px);
        }
        .ct_coursetypelist{
            width: 100%;
            max-width: 10rem;
            padding: 0 toRem(30px);
            margin: 0 auto;
            overflow: auto;
            .ct_ct_coursetypelist_inner{
                > ul{
                    > li{
                        width: 100%;
                        border-bottom: 1px dashed #f1f1f1;
                        .ct_ctl_firstfloor{
                            width: 100%;
                            height: toRem(86px);
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .ct_ctl_ff_left{
                                width: 90%;
                                height: 100%;
                                a{
                                    width: 100%;
                                    height: 100%;
                                    line-height: toRem(86px);
                                    font-size: 0.4rem;
                                    display: inline-block;
                                    @include ellipsis_two(1);
                                    &::before{
                                        content: '';
                                        width: toRem(25px);
                                        height: toRem(23px);
                                        margin-right: toRem(20px);
                                        display: inline-block;
                                        background: url('../assets/yw_star.png') no-repeat;
                                        background-size: 100%;
                                    }
                                }
                            }
                            .ct_ctl_ff_right{
                                width: 10%;
                                height: 100%;
                                line-height: toRem(86px);
                                text-align: right;
                                img{
                                    width: toRem(22px);
                                    height: toRem(12px);
                                    transition: 0.3s;
                                }
                            }
                            .ct_ctl_ff_rightleft{
                                width: 10%;
                                height: 100%;
                                line-height: toRem(86px);
                                text-align: right;
                                img{
                                    width: toRem(12px);
                                    height: toRem(22px);
                                    transition: 0.3s;
                                }
                            }
                        }
                        .ct_ctl_secondfloor{
                            height: auto;
                            max-height: toRem(500px);
                            overflow: hidden;
                            transition: 0.8s;
                            ul{
                                display: flex;
                                flex-direction: column;
                                flex-wrap: wrap;
                                li{
                                    height: toRem(60px);
                                    line-height: toRem(60px);
                                    padding: 0 toRem(20px);
                                    font-size: 0.4rem;
                                }
                            }
                        }
                        .ct_ctl_isextend{
                            max-height: 0;
                        }
                    }
                }
            }
        }
    }
</style>