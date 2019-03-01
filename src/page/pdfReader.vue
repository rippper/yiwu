<template>
  <div class="pdf-reader container_top">
    <header-fix :title="pdfTitle" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="pdf-actions">
      <i class="page_action prev_page webapp webapp-back" @click="prevPage"></i>
      <span>{{currentPage}}/{{totalPages}}</span>
      <i class="page_action rotate webapp webapp-refresh" @click="rotatePdf"></i>

      <i class="page_action zoomIn webapp webapp-zoomin" @click="zoomIn"></i>
      <i class="page_action zoomOut webapp webapp-zoomout" @click="zoomOut"></i>
      <i class="page_action next_page webapp webapp-more" @click="nextPage"></i>
    </div>
    <pdf ref="pdf"
         class="pdf-container"
         :src="pdfSrc"
         :page="currentPage"
         :rotate="rotate"
         @num-pages="totalPages = $event"
         @loaded="loaded"
         @page-loaded="currentPage = $event"></pdf>
  </div>

</template>

<script>
  import {Indicator, Toast} from 'mint-ui';
  import pdf from 'vue-pdf';
  import headerFix from '../components/headerFix';
  import {goBack} from '../service/mixins';

  export default {
    name: 'pdfReader',
    mixins: [goBack],
    data() {
      return {
        pdfTitle: 'pdf阅读',
        pdfSrc: '',
        currentPage: 1,
        rotate: 0,
        totalPages: 0,
        scale: 1,
      };
    },
    components: {
      pdf,
      headerFix,
    },
    created() {
      let id = this.$route.query.id;
      this.pdfTitle = id == 1 ? '党员应知应会基本读本' : '政治理论应知应会知识测试题库';
      this.pdfSrc = pdf.createLoadingTask(`/UpFiles/Exam/${this.pdfTitle}.pdf`);
    },
    mounted() {
      Indicator.open();
    },
    methods: {
      prevPage() {
        if (this.currentPage === 1) {
          Toast({message: '没有上一页啦', position: 'bottom'});
          return;
        }
        this.currentPage--;
      },
      nextPage() {
        if (this.currentPage === this.totalPages) {
          Toast({message: '没有下一页啦', position: 'bottom'});
          return;
        }
        this.currentPage++;
      },
      rotatePdf() {
        this.rotate += 90;
        if (this.rotate % 360 === 0) {
          this.rotate = 0;
        }
        console.log(this.rotate);
      },
      zoomIn() {
        this.scale += 0.1;
        this.$refs.pdf.$el.querySelector('canvas').style.transform = `scale(${this.scale})`;
        this.$refs.pdf.$el.querySelector('canvas').parentElement.style.overflow = 'scroll';
      },
      zoomOut() {
        this.scale -= 0.1;
        this.scale = Math.max(1, this.scale);
        this.$refs.pdf.$el.querySelector('canvas').style.transform = `scale(${this.scale})`;
      },
      loaded() {
        console.log('loaded');
        Indicator.close();
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .pdf-reader {
    background-color: rgb(82, 86, 89);

    .pdf-actions {
      position: fixed;
      top: toRem(92px);
      background-color: mix(rgb(82, 86, 89), black);
      @include flex();
      align-items: center;
      width: 100%;
      height: toRem(100px);
      padding: toRem(10px) toRem(20px);
      font-size: 18px;
      z-index: 1000;
      color: white;

      .webapp {
        font-size: 20px;
      }
    }

    .pdf-container {
      top: toRem(100px);

      canvas {
        transform-origin: 0 0 0;
      }
    }
  }
</style>
