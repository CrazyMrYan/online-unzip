<template>
  <ol>
    <li>
      <h5 class="sidebar_title">个人收藏</h5>
      <p class="sidebar_content">
        <img src="../assets/distance.png" />
        隔空投送
      </p>

      <p class="sidebar_content">
        <img src="../assets/time.png" />
        最近使用
      </p>
      <p class="sidebar_content">
        <img src="../assets/page.png" />
        桌面
      </p>
    </li>
  </ol>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style lang="less" scoped>
.sidebar_title {
  color: #8c8685;
  font-size: 12px;
  margin: 10px 0 10px 6px;
  font-size: 12px;
}
.sidebar_content {
  color: #413f3f;
  font-size: 14px;
  margin-bottom: 10px;
  margin-top: 0;
  margin-left: 6px;
  display: flex;
  align-items: center;
  img {
    width: 16px;
    margin-right: 6px;
  }
}
ul,
ol,
li {
  list-style: none;
}
</style>
