<template>
  <div class="mbChecklist" @change="$emit('change', currentValue)">
    <div class="checkList" v-for="(option,index) in options" :key="index"
         :class="isInArray(option.ThemeItemFlag)&&'checklist_checked'">
      <label class="mint-checklist-label">
        <span class="mint-checkbox selectpart">
          <input
            class="mint-checkbox-input"
            type="checkbox"
            v-model="currentValue"
            :disabled="isDisabled || option.disabled"
            :value="option.ThemeItemFlag || option"/>
          <!--<span class="mint-checkbox-core"></span>-->
        </span>
        <!--&nbsp;&nbsp;{{option.ThemeItemFlag+'.'+option.ThemeItemTitle}}-->
        <span class="mint-checkbox-label" v-text="option.ThemeItemFlag+'.'"></span>
        <span class="mint-checkbox-label label_title" v-text="option.ThemeItemTitle"></span>
      </label>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Checklist } from 'mint-ui'

  Vue.component(Checklist.name, Checklist)
  export default {
    data() {
      return {
        currentValue: this.value
      }
    },
    props: {
      options: {
        required: true
      },
      value: '',
      isDisabled: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    methods: {
      isInArray(value) {
        for (var i = 0; i < this.currentValue.length; i++) {
          if (value === this.currentValue[i]) {
            return true
          }
        }
        return false
      }
    },
    watch: {
      value(val) {
        this.currentValue = val
      },
      currentValue(val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../style/mixin';

  .mbChecklist {
    .checkList {
      @extend %border-base;
      @include borderRadius(10px);
      background-color: $fill-grey;
      margin-bottom: toRem(30px);
      .checklist-input:focus {
        outline: none;
      }
      .mint-checklist-label {
        display: block;
        padding: toRem(21px) toRem(20px);
        font-size: 15px;
        position: relative;
        .mint-checkbox{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 15;
        }
        .selectpart{
          width: 100%;
          height: 100%;

          input{
            display: inline-block;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }
      }
      padding: 0 toRem(20px);
    }
    .checklist_checked {
      border: 1px solid $brand-primary;
      background-color: $fill-base;
      color: $brand-primary;
    }
    .label_title {
      margin-left: toRem(5px);
    }
  }
</style>
