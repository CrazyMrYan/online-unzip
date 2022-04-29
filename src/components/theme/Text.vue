<template>
  <pre v-highlight="data.content">
    <code :class="[data.codeFormat]"></code>
  </pre>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="less" scoped>
pre {
  padding: 0 10px;
  box-sizing: border-box;
  min-width: 500px;
  min-height: 200px;
  padding: 0 10px;
  margin: 0;
  code {
    padding: 0 10px !important;
  }
}
</style>
