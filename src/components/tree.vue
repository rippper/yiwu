/**
* 树
*/
<template>
  <ul class="tree_container">
    <tree-node v-for="(item,index) in data"
               :data-list="item"
               @itemClick="selectedNode"
               :on-select="onSelect"
               :selected-id="selectedId"
               :is-show="isShow"
               :key="index">
    </tree-node>
  </ul>
</template>
<script>
  export default {
    props: {
      data: Array,
      onSelect: Function,
      selectedId: [String, Number],
      isShow: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    methods: {
      selectedNode (data) {
        this.onSelect(data)
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
