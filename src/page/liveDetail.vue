<template>
    <div class="livedetail container_top">
        <header-fix title="直播详情" fixed>
            <i class="webapp webapp-back" @click="backToList" slot="left"></i>
        </header-fix>
        <iframe :src="linkAddress" width="100%" height="100%" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    name: 'livedetail',
    data () {
        return {
            linkAddress: 'https://e.vhall.com/webinar/inituser/' + this.$route.query.webinar_id + '?email=' + this.$route.query.userId + '@yiliganbu.com&name=' + this.$route.query.name
        }
    },
    methods: {
        backToList () {
            this.$router.push('/livelist')
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.livedetail{
    width: 100%;
    max-width: 10rem;
    height: 100vh;
    margin: 0 auto;
}
</style>