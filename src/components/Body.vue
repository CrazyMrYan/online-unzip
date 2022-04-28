<template>
  <div @click.self="shuntEmit('cancel')" class="files-list_container">
    <ul
      @click.self="shuntEmit('cancel')"
      :class="[displayMode + '-type', 'files_list']"
    >
      <li
        :class="[
          selectedList.includes(file.name) ? 'active' : undefined,
          'file_item',
        ]"
        v-for="file in data"
        :key="file.name"
        @dblclick="shuntEmit('findSubFiles', file)"
        @click="shuntEmit('selectTheFile', file)"
      >
        <div class="file_logo">
          <img v-if="file.dir" src="../assets/folder.png" alt="" />
          <img class="text" v-else src="../assets/text.png" alt="" />
        </div>
        <p style="box-sizing: border-box; border-radius: 3px">
          <span> {{ file.id }} </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    selectedList: {
      type: Array,
      default: () => [],
    },
    displayMode: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    shuntEmit(event, data = null) {
      this.$emit(event, data);
    },
  },
};
</script>

<style lang="less" scoped>
.file_logo {
  height: 73.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 60px;
  }
}
.text {
  width: 68px;
}
.list-type {
  display: block;
  .file_item {
    margin-left: 20px;
    width: 100%;
    height: 30px;
    display: flex;
    text-align: left;
    align-items: center;
    div,
    p {
      text-align: left;
    }
    div > img,
    .text {
      width: 20px;
    }
    div {
      display: flex;
      align-items: center;
    }
    p {
      margin: 0;
      margin-left: 6px;
    }
  }
}
.files_list {
  margin: 0;
  display: flex;
  flex-flow: wrap;
  padding-left: 0;
}
.active {
  span {
    background: #2961d9;
    color: #fff;
    padding: 0 10px;
    border-radius: 3px;
  }
}
ul,
ol,
li {
  list-style: none;
}

.file_item > p {
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  margin-top: 0;
  width: 100px;
  margin: 0 10px;
}
.file_item > div {
  text-align: center;
}

.active {
  span {
    background: #2961d9;
    color: #fff;
    padding: 0 10px;
    border-radius: 3px;
  }
}
</style>
