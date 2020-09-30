<template>
    <div class="bottombar">
        <ul>
            <li>
                <router-link to="/home">
                    <div>
                        <img src="../assets/yw_home.png" alt v-show="selected != '1'">
                        <img src="../assets/yw_homest.png" alt v-show="selected == '1'">
                    </div>
                    <p><span :class="{ 'is_active': selected == '1'}">首页</span></p>
                </router-link>
            </li>
            <li>
                <router-link to="/courseType">
                    <div>
                        <img src="../assets/yw_course.png" alt v-show="selected != '2'">
                        <img src="../assets/yw_coursest.png" alt v-show="selected == '2'">
                    </div>
                    <p><span :class="{ 'is_active': selected == '2'}">课程</span></p>
                </router-link>
            </li>
            <li>
                <router-link to="/commitList">
                    <div>
                        <img src="../assets/yw_commitcenter.png" alt v-show="selected != '3'">
                        <img src="../assets/yw_commitcenterst.png" alt v-show="selected == '3'">
                    </div>
                    <p><span :class="{ 'is_active': selected == '3'}">交流园地</span></p>
                </router-link>
            </li>
            <li>
                <!-- <router-link to="/liveList"> -->
                <router-link to="/livelist">
                    <div>
                        <img src="../assets/yw_zhibo.png" alt v-show="selected != '4'">
                        <img src="../assets/yw_zhibost.png" alt v-show="selected == '4'">
                    </div>
                    <p><span :class="{ 'is_active': selected == '4'}">直播</span></p>
                </router-link>
                <!-- </router-link> -->
            </li>
            <li>
                <router-link to="/examGuide">
                    <div>
                        <img src="../assets/yw_exam.png" alt v-show="selected != '5'">
                        <img src="../assets/yw_examst.png" alt v-show="selected == '5'">
                    </div>
                    <p><span :class="{ 'is_active': selected == '5'}">考试</span></p>
                </router-link>
            </li>
            <li>
                <router-link to="/personalCenter">
                    <div>
                        <img src="../assets/yw_mine.png" alt v-show="selected != '6'">
                        <img src="../assets/yw_minest.png" alt v-show="selected == '6'">
                    </div>
                    <p><span :class="{ 'is_active': selected == '6'}">我的</span></p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    name: 'bottombar',
    props: {
        selected: {
            type: String,
            default: '0'
        }
    },
    methods: {
        onBuild () {
            MessageBox('提示', '正在建设中。。')
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .bottombar{
        width: 100%;
        max-width: 10rem;
        height: calc(toRem(98px) + env(safe-area-inset-bottom));
        padding-top: toRem(10px);
        padding-bottom: env(safe-area-inset-bottom);
        margin: 0 auto;
        transform: translate(-50%, 0);
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 50%;
        ul{
            display: flex;
            li{
                width: calc(100% / 6);
                height: toRem(98px);
                margin-top: toRem(5px);
                a{
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                }
                span{
                    font-size: 0.35rem;
                }
                .is_active{
                    color: #b20012;
                }
                &:first-of-type{
                    a{
                        img{
                            width: toRem(40px);
                            height: toRem(40px);
                        }
                    }
                }
                &:nth-of-type(2){
                    a{
                        img{
                            width: toRem(44px);
                            height: toRem(38px);
                        }
                    }
                }
                &:nth-of-type(3){
                    a{
                        img{
                            width: toRem(45px);
                            height: toRem(39px);
                        }
                    }
                }
                &:nth-of-type(4){
                    a{
                        img{
                            width: toRem(44px);
                            height: toRem(39px);
                        }
                    }
                }
                &:nth-of-type(5){
                    a{
                        img{
                            width: toRem(44px);
                            height: toRem(39px);
                        }
                    }
                }
                &:last-of-type{
                    a{
                        img{
                            width: toRem(41px);
                            height: toRem(40px);
                        }
                    }
                }
            }
        }
    }
</style>