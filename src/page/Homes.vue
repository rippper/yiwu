<template>
    <div class="home">
        <div class="h_top">
            <img src="../assets/yw_logo.png" alt="">
            <div class="h_tp_btnpart">
                <div class="h_tp_bp_search">
                    <img src="../assets/yw_search.png" alt>
                </div>
                <div class="h_tp_bp_add" @click.stop="openAdd">
                    <img src="../assets/yw_add.png" alt>
                </div>
                <div class="h_tp_bp_addfunction" v-show="addType">
                    <div class="h_tp_bp_afinner">
                        <ul>
                            <li @click.stop>
                                <img src="../assets/yw_history.png" alt>
                                <span>历史</span>
                            </li>
                            <li @click.stop>
                                <div class="imgpart">
                                    <img src="../assets/yw_mails.png" alt>
                                </div>
                                <span>消息</span>
                            </li>
                            <li @click.stop>
                                <img src="../assets/yw_sweep.png" alt>
                                <span>扫一扫</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="h_content">
            <div class="h_ct_notice">
                <div class="h_ct_noticebox">
                    <img src="../assets/yw_notice.png" alt>
                    <div class="h_ct_nb_notice">
                        <ul>
                            <li v-for="(item, index) in noticeList" :key="index+item">
                                <a href="javascript:;" v-text="item.content"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
            addType: false,
            noticeList: [
                {
                    content: '青春多么美丽！它充满了色彩和梦想。青春是这本书的第一章，它是一个永无止境的故事。 关于青春的格言'
                },
                {
                    content: '白日莫空过，青春不再来。林宽 2、百金买骏马，千金买美人;万金买高爵，何处买青春?屈原'
                },
                {
                    content: '青春是不耐久藏的东西。莎士比亚 4、青春时光转眼即逝。贺拉斯 5、青春留不住，白发'
                },
                {
                    content: '青春多么美丽！它充满了色彩和梦想。青春是这本书的第一章，它是一个永无止境的故事。 关于青春的格言'
                }
            ],
        }
    },
    mounted () {
        document.addEventListener('click', (e) => {
            if (e.target.className != 'h_tp_bp_add') {
                this.addType = false
            }
        })
    },
    methods: {
        openAdd () {
            this.addType = true
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.home{
    max-width: 10rem;
    margin: 0 auto;
    position: relative;
    .h_top{
        width: 100%;
        height: toRem(92px);
        background: #b20012;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        > img{
            width: toRem(378px);
            height: toRem(48px);
            margin-left: toRem(30px);
        }
        .h_tp_btnpart{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: toRem(110px);
            height: toRem(92px);
            margin-right: toRem(28px);
            position: relative;
            .h_tp_bp_search{
                width: toRem(50px);
                height: toRem(92px);
                line-height: toRem(92px);
                text-align: center;
                img{
                    width: toRem(40px);
                    height: toRem(40px);
                }
            }
            .h_tp_bp_add{
                width: toRem(50px);
                height: toRem(92px);
                line-height: toRem(92px);
                text-align: center;
                img{
                    width: toRem(38px);
                    height: toRem(38px);
                }
            }
            .h_tp_bp_addfunction{
                width: toRem(190px);
                height: toRem(229px);
                border-radius: toRem(15px);
                position: absolute;
                top: toRem(92px);
                right: toRem(-6px);
                &::before{
                    content: '';
                    width: toRem(20px);
                    height: toRem(20px);
                    background: #f2f4f6;
                    transform: rotateZ(45deg);
                    display: inline-block;
                    position: absolute;
                    right: toRem(21px);
                    top: toRem(-12px);
                }
                .h_tp_bp_afinner{
                    width: toRem(190px);
                    height: toRem(229px);
                    border-radius: toRem(15px);
                    position: relative;
                    background: #f2f4f6;
                    overflow: hidden;
                    ul{
                        li{
                            height: toRem(77px);
                            border-bottom: 1px solid #ddd;
                            &:first-of-type{
                                display: flex;
                                align-items: center;
                                img{
                                    width: toRem(40px);
                                    height: toRem(40px);
                                    margin-left: toRem(21px);
                                    margin-right: toRem(18px);
                                }
                                span{
                                    font-size: 0.4rem;
                                    font-weight: bold;
                                }
                            }
                            &:nth-of-type(2){
                                display: flex;
                                align-items: center;
                                .imgpart{
                                    position: relative;
                                    margin-left: toRem(21px);
                                    margin-right: toRem(18px);
                                    img{ 
                                        width: toRem(38px);
                                        height: toRem(34px);
                                    }
                                }
                                span{
                                    font-size: 0.4rem;
                                    font-weight: bold;
                                }

                            }
                            &:last-of-type{
                                display: flex;
                                align-items: center;
                                img{
                                    width: toRem(36px);
                                    height: toRem(36px);
                                    margin-left: toRem(21px);
                                    margin-right: toRem(18px);
                                }
                                span{
                                    font-size: 0.4rem;
                                    font-weight: bold;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .h_content{
        width: 100%;
        padding-top: toRem(92px);
        background: #fff;
        .h_ct_notice{
            height: toRem(118px);
            padding-top: toRem(50px);
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
                    width: toRem(535px);
                    height: toRem(68px);
                    position: relative;
                    overflow: hidden;
                    ul{
                        position: absolute;
                        top: 0;
                        left: 0;
                        li{
                            width: 100%;
                            height: toRem(68px);
                            line-height: toRem(68px);
                            font-size: 0.35rem;
                            @include ellipsis_two(1);
                            a{
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>