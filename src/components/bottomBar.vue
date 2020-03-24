<template>
    <div class="bottombar">
        <ul>
            <li>
                <router-link to="/homes">
                    <div>
                        <img src="../assets/yw_home.png" alt v-show="selected != '1'">
                        <img src="../assets/yw_homest.png" alt v-show="selected == '1'">
                    </div>
                    <p><span :class="{ 'is_active': selected == '1'}">首页</span></p>
                </router-link>
            </li>
            <li>
                <router-link to="/courseCenter">
                    <div>
                        <img src="../assets/yw_course.png" alt v-show="selected != '2'">
                        <img src="../assets/yw_coursest.png" alt v-show="selected == '2'">
                    </div>
                    <p><span :class="{ 'is_active': selected == '2'}">课程</span></p>
                </router-link>
            </li>
            <li>
                <router-link to="/examGuide">
                    <div>
                        <img src="../assets/yw_exam.png" alt v-show="selected != '3'">
                        <img src="../assets/yw_examst.png" alt v-show="selected == '3'">
                    </div>
                    <p><span :class="{ 'is_active': selected == '3'}">考试</span></p>
                </router-link>
            </li>
            <li>
                <router-link to="/personalCenter">
                    <div>
                        <img src="../assets/yw_mine.png" alt v-show="selected != '4'">
                        <img src="../assets/yw_minest.png" alt v-show="selected == '4'">
                    </div>
                    <p><span :class="{ 'is_active': selected == '4'}">我的</span></p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'bottombar',
    props: {
        selected: {
            type: String,
            default: '0'
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .bottombar{
        width: 100%;
        max-width: 10rem;
        height: toRem(98px);
        margin: 0 auto;
        transform: translate(-50%, 0);
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 50%;
        ul{
            display: flex;
            li{
                width: 25%;
                height: toRem(98px);
                margin-top: toRem(15px);
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