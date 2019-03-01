<template>
  <div class="upload_progress container_top">
    <header-fix title="上传进度" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <p>
      该功能是用来处理网络环境差的情况下课程播放失败的问题，在这里您可以手动提交进度。建议您在有Wi-Fi或网络情况良好的情况下观看。
    </p>
    <div class="btn_container">
      <mt-button class="upload_btn" type="primary" @click.native="uploadProgress">上传进度</mt-button>
      <mt-button class="upload_btn" type="danger" @click.native="clearStore">清除缓存</mt-button>
    </div>

  </div>
</template>

<script>
  import {MessageBox, Toast} from 'mint-ui';
  import Vue from 'vue';
  import {headerFix} from '../components';
  import {getStore, removeStore, setStore} from '../plugins/utils';
  import {getSyncUserStudyData, singleUploadTimeNode} from '../service/getData';
  import {goBack} from '../service/mixins';

  Vue.component(MessageBox.name, MessageBox);
  export default {
    mixins: [goBack],
    name: 'uploadProgress',
    data() {
      return {};
    },
    components: {
      headerFix,
    },
    methods: {
      async uploadProgress() {
        let singleStore = getStore('singleProgress') || {};
        let singleLen = Object.keys(singleStore).length;
        let aiccStore = getStore('jyaiccProgress') || {};
        let aiccLen = Object.keys(aiccStore).length;
        if (aiccLen > 0) {
          for (let key in aiccStore) {
            let progressStack = aiccStore[key];
            for (let i = 0; i < progressStack.length; i++) {
              let params = progressStack[i];
              try {
                let data = await getSyncUserStudyData(params);
                if (data == 'ok') {
                  progressStack.splice(i, 1);
                } else {
                  Toast({message: '提交缓存进度失败', position: 'bottom'});
                }
              } catch (e) {
                Toast({message: '提交缓存进度失败', position: 'bottom'});
              }
            }
            if (progressStack.length == 0) {
              delete aiccStore[key];
            } else {
              aiccStore[key] = progressStack;
            }
          }
          setStore('jyaiccProgress', aiccStore);
        }
        if (singleLen > 0) {
          for (let key in singleStore) {
            let progressStack = singleStore[key];
            for (let i = 0; i < progressStack.length; i++) {
              let params = progressStack[i];
              try {
                let data = await singleUploadTimeNode(params);
                if (data.split(',')[0] == 'true') {
                  progressStack.splice(i, 1);
                } else {
                  Toast({message: '提交缓存进度失败', position: 'bottom'});
                }
              } catch (e) {
                Toast({message: '提交缓存进度失败', position: 'bottom'});
              }
            }
            if (progressStack.length == 0) {
              delete singleStore[key];
            } else {
              singleStore[key] = progressStack;
            }
          }
          setStore('singleProgress', singleStore);
        }
        if (aiccLen == 0 && singleLen == 0) {
          MessageBox.alert('没有缓存的进度');
        }
      },
      clearStore() {
        MessageBox.confirm('确认要清除缓存？').then(() => {
          removeStore('singleProgress');
          removeStore('jyaiccProgress');
          Toast({message: '清除成功', position: 'bottom'});
        });
      },
    },
    beforeRouteLeave(to, from, next) {
      MessageBox.close();
      next();
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../style/mixin";

  .upload_progress {
    padding-left: toRem(20px);
    padding-right: toRem(20px);

    p {
      text-indent: 2em;
      font-size: 18px;
      line-height: 2;
    }

    .btn_container {
      @include flex(space-around);
    }

    .upload_btn {
      margin-top: toRem(30px);
      width: 35%;
    }
  }
</style>
