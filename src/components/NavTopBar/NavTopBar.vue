<template>
  <div class="top-nav">
    <div class="nav-item">
      <span class="nick-name">昵称</span>
      <span class="quit" @click="handleQuit">退出</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavTopBar",
  methods: {
    handleQuit() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
/* 顶部导航 */
.top-nav {
  height: 60px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 40px;
}
.nav-item span {
  cursor: pointer;
}
.nav-item span:last-of-type {
  margin-left: 20px;
}
</style>