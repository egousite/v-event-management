<template>
  <div class="wrap">
    <!-- 侧边栏 -->
    <NavSiderBar v-show="this.$route.meta.isShowNav"></NavSiderBar>
    <!-- 右侧区域 -->
    <div class="main" v-if="this.$route.meta.isShowNav">
      <!-- 顶部导航 -->
      <NavTopBar></NavTopBar>
      <!-- 内容区域 -->
      <router-view></router-view>
    </div>
    <!-- 登录页 -->
    <div class="main" v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavSiderBar from "../src/components/NavSiderBar/NavSiderBar.vue";
import NavTopBar from "../src/components/NavTopBar/NavTopBar.vue";
export default {
  name: "App",
  components: {
    NavSiderBar,
    NavTopBar,
  },
};
</script>

<style>
/* 页面整体 */
html,
body {
  margin: 0;
  padding: 0;
  /* overflow: hidden; */
}
.wrap {
  min-height: 100%;
  display: flex;
}
/* 内容容器 */
.main {
  height: 100vh;
  flex: 1;
}
</style>