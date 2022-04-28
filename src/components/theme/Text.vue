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
  min-width: 400px;
  height: 400px;
}
</style>
