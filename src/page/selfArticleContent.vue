<template>
    <div class="commitlistcontent container_top">
        <header-fix title="原创文章" fixed>
            <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
        </header-fix>
        <iframe :src="content"  width="100%" height="100%"  frameborder="0"></iframe>
    </div>
</template>

<script>
import { headerFix } from '../components'
import { goBack } from "../service/mixins";

export default {
    mixins: [goBack],
    name: 'commitlistcontent',
    data () {
        return {
            content: this.$route.query.address
        }
    },
    components: {
        headerFix
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.commitlistcontent{
    width: 100%;
    max-width: 10rem;
    height: 100vh;
    margin: 0 auto;
    background: #fff;
}
</style>