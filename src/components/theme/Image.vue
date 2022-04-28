<template>
  <img :src="data.content" />
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
img {
  // width: 100%;
  // min-width: 30vw;
  width: 400px;
  height: 400px;
}
</style>
