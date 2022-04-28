export default {
  name: "shortcuts",
  mounted() {
    window.addEventListener("keydown", this.handleEvent);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleEvent);
  },
  methods: {
    async handleEvent(event) {
      switch (event.keyCode) {
        case 65:
          if ((event.ctrlKey || event.metaKey) && event.code === "KeyA") {
            this.selectAll();
          }
          break;
      }
    },
    selectAll() {
      this.selectedList = [];
      this.getFileList.forEach((file) => {
        this.selectedList.push(file.name);
      });
    },
  },
};
