<template>
    <div class="examHResultList container_top">
        <header-fix title="考试列表" fixed>
            <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
        </header-fix>
        <div class="ehrl_list">
            <section v-infinite-scroll="render"
                infinite-scroll-immediate-check="immediate"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
                <exam-result-list
                    :exam-data="ExamList"
                    :no-data-bg="noDateBg"
                    :no-data="noDate"
                >
                </exam-result-list>
            </section>
        </div>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { GetExamListTest } from '../service/getData';

export default {
    name: 'examHResultList',
    data () {
        return {
            ExamList: [],
            noDate: false,
            noDateBg: false,
            loading: false,
            Page: 0,
            PageCount: 10,
        }
    },
    mounted () {
        this.render()
    },
    methods: {
        goBack () {
            this.$router.push('/personalCenter')
        },
        async render () {
            this.noDate = false;
            this.noDateBg = false;
            this.loading = true;
            Indicator.open()
            let data = await GetExamListTest({
                Page: this.Page,
                PageCount: this.PageCount
            })
            Indicator.close()
            let list = []
            if (Array.isArray(data.ExamInfoList)) {
                list = data.ExamInfoList
                list.forEach(item => {
                    item.type = 'heart'
                });
            }
            if (list.length == 0 && this.Page > 0) {
                this.noDate = true
                return
            }
            if (list.length == 0 && this.Page == 0) {
                this.noDateBg = true
                return
            }
            this.ExamList = this.ExamList.concat(list)
            this.loading = false
            this.Page += 1
        }
    }
}
</script>

<style lang="scss">

</style>