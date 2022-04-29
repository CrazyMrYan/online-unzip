<template>
  <div v-if="visible" @click.self="closeDialog" class="dialog__wrapper">
    <div class="dialog">
      <h4 class="dialog_title">
        <p class="dialog-title_name">{{ fileInfo.name }}</p>
        <div @click="showMoreInfo = !showMoreInfo">
          <span v-show="!showMoreInfo" class="down-on_click"></span>
          <span v-show="showMoreInfo" class="up-on_click"></span>
        </div>
      </h4>
      <div class="more-info_container" v-show="showMoreInfo">
        <p v-for="(item, key) in moreInfo" :key="key">
          <b> {{ item }} </b>：
          {{ fileInfo[key] }}
        </p>
      </div>
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
import PDF from "./theme/PDF.vue";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    fileInfo: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    fileComponent: {
      image: ImageCom,
      text: TextCom,
      pdf: PDF,
    },
    showMoreInfo: false,
    moreInfo: {
      type: "文件类型",
      size: "文件大小",
      date: "修改时间",
    },
  }),
  methods: {
    closeDialog() {
      this.showMoreInfo = false;
      this.$emit("close-dialog");
    },
  },
};
</script>

<style lang="less" scoped>
.more-info_container {
  font-size: 12px;
  padding: 10px;
  box-sizing: border-box;
  color: #999;
  p {
    padding: 0;
    margin: 0;
    padding-left: 10px;
  }
}
.down-on_click {
  background-image: url("../assets/down.png");
  background-size: 100% 100%;
  display: block;
  width: 20px;
  height: 20px;
}
.up-on_click {
  background-image: url("../assets/up.png");
  background-size: 100% 100%;
  display: block;
  width: 20px;
  height: 20px;
}
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
    max-width: 50vw;
    background-color: #ffffff;
    border-radius: 4px;
  }
  .dialog_title {
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    color: #666;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    margin: 0;
    div {
      cursor: pointer;
    }
    .dialog-title_name {
      flex: 1;
      margin: 0;
    }
  }
  .dialog_content {
    display: flex;
    max-height: 80vh;
    max-width: 60vw;
    overflow: auto;
  }
}
</style>
