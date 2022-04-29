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
  width: 500px;
}
</style>
