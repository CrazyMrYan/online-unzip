<template>
  <div v-if="visible" @click.self="closeDialog" class="dialog__wrapper">
    <div class="dialog">
      <h4 class="dialog_title">{{ fileInfo.name }}</h4>
      <div class="dialog_content">
        <component
          :data="fileInfo"
          :is="fileComponent[fileInfo.type]"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import ImageCom from "./theme/Image.vue";
import TextCom from "./theme/Text.vue";
export default {
  components: { ImageCom },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    fileInfo: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    fileComponent: {
      image: ImageCom,
      text: TextCom,
    },
  }),
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
};
</script>

<style lang="less" scoped>
.dialog__wrapper {
  width: 100%;
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  .dialog {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    max-width: 60vw;
    // max-height: 40vh;
    background-color: #ffffff;
    border-radius: 4px;
  }
  .dialog_title {
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    color: #666;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    margin: 0;
  }
  .dialog_content {
    display: flex;
    max-height: 80vh;
    max-width: 60vw;
    overflow: auto;
  }
}
</style>
