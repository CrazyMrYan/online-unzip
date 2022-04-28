<template>
  <div>
    <input @change="changeFiles" id="file" type="file" />
    <div class="loading" v-show="loading">
      <p><img class="loading_img" src="../assets/loading.png" />Loading...</p>
    </div>
    <br />
    <div class="finder" v-if="fileListVisible">
      <Sidebar />
      <div style="flex: 1">
        <Headrace />
        <Body
          @findSubFiles="findSubFiles"
          @selectTheFile="selectTheFile"
          :data="getFileList"
          @cancel="selectedList = []"
          :displayMode="displayMode"
          :selectedList="selectedList"
        />
      </div>
    </div>
    <Dialog
      @close-dialog="showDialog = false"
      :visible="showDialog"
      :fileInfo="fileInfo"
    />
  </div>
</template>

<script>
import JSZip from "jszip";
import { image, text, settleDocuments } from "../utils/processFile";
import {
  queryFileType,
  processIgnoreFolder,
  getParentFolder,
  getFileNameExtension,
} from "../utils/getFileInfo";
let FileInformationSet = null;
import Sidebar from "./Sidebar.vue";
import Dialog from "./Dialog.vue";
import Headrace from "./Headrace.vue";
import Body from "./Body.vue";
import shortcuts from "../mixins/shortcuts";

export default {
  components: { Sidebar, Headrace, Dialog, Body },
  mixins: [shortcuts],
  data: () => ({
    path: undefined,
    displayMode: "", // list
    fileListVisible: false,
    selectedList: [],
    loading: false,
    showDialog: false,
    fileInfo: null,
  }),
  computed: {
    getFileList() {
      const fileData = [];
      const folderData = [];
      Object.keys(FileInformationSet).forEach((file) => {
        const fileInfoItem = FileInformationSet[file];
        const isSubset = fileInfoItem.parent === this.path;
        if (!processIgnoreFolder(file) && isSubset) {
          const data = settleDocuments(fileInfoItem, file);
          fileInfoItem.dir ? folderData.push(data) : fileData.push(data);
        }
      });
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.loading = false;
      return [...folderData, ...fileData];
    },
  },

  methods: {
    selectTheFile(file) {
      const position = this.selectedList.indexOf(file.name);
      if (this.selectedList.includes(file.name)) {
        this.selectedList.splice(position, position + 1);
      } else {
        this.selectedList.push(file.name);
      }
    },

    async viewFileInformation(file) {
      let fileInfo = Object.create(null);
      if (queryFileType(file.id, "image")) {
        fileInfo = await image(FileInformationSet, file);
        console.log(fileInfo);
      } else if (queryFileType(file.id, "text")) {
        fileInfo = await text(FileInformationSet, file);
        fileInfo.codeFormat = getFileNameExtension(file.id);
        console.log(fileInfo);
      }
      this.fileInfo = fileInfo;
      console.log(this.fileInfo);
      this.showDialog = true;
      this.loading = false;
    },

    findSubFiles(file) {
      this.loading = true;
      if (!file.dir) return this.viewFileInformation(file);
      this.selectedList = [];
      this.path = file.id;
    },

    resetFiles() {
      FileInformationSet = {};
      this.path = undefined;
      this.selectedList = [];
      console.log(this.getFileList);
    },

    async changeFiles() {
      // this.resetFiles();
      const file = document.querySelector("#file").files[0];
      if (!file) return false;
      console.time("file");
      this.loading = true;
      const { files } = await JSZip.loadAsync(file);
      Object.keys(files).forEach((item) => {
        files[item]["parent"] = getParentFolder(item, files[item].dir);
      });
      FileInformationSet = files;
      this.fileListVisible = true;
      this.loading = false;
      console.timeEnd("file");
    },
  },
};
</script>

<style lang="less" scoped>
.files-list_container {
  overflow: auto;
  box-sizing: border-box;
  padding: 20px 0 0 10px;
  height: 386px;
}

.finder {
  max-height: 436px;
  display: flex;
  margin: 20px;
  background-color: #fff;
  width: 900px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0 8px 8px 0;
  ol {
    width: 140px;
    padding: 10px;
    background: rgba(212, 206, 205, 0.3);
    border-radius: 8px 0 0 8px;
    height: 436px;
    margin: 0;
    box-sizing: border-box;
  }
}
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  .loading_img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    animation: loading 1.5s infinite;
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4e96cd;
  }
}

@keyframes loading {
  100% {
    transform: rotate(360deg);
  }
}
.view-file-info-content {
  max-height: 70vh;
  overflow: auto;
}
pre {
  text-align: left;
}

.pop-up-layer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.view-file-info {
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  min-width: 40vw;
  min-height: 50vh;
  overflow: auto;
  h4 {
    margin-bottom: 0;
  }
  p {
    font-size: 12px;
    color: #666;
    margin-top: 0;
  }
}
.view-img-file {
  max-width: 40vw;
  width: unset;
}
.files_list {
  margin: 0;
  display: flex;
  flex-flow: wrap;
  padding-left: 0;
}
</style>
