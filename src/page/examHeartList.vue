<template>
    <div class="examHeartList container_top">
        <header-fix title="心理测试列表" fixed>
            <i class="webapp webapp-back" @click.stop="linkHome" slot="left"></i>
        </header-fix>
        <div class="hel_examlist">
            <section v-infinite-scroll="render"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-distance="10">
                <exam-list
                    :exam-data="ExamList"
                    :no-data-bg="noDateBg"
                    :no-data="noDate"
                >
                </exam-list>
            </section>
        </div>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { GetExamListTest } from '../service/getData';

export default {
    name: 'examHeartList',
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
        linkHome () {
            this.$router.push({ path: '/home' })
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