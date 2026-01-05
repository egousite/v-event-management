<template>
  <div class="top-nav">
    <div class="nav-item">
      <router-link :to="{ name: 'Profile' }" class="nick-name">{{
        userInfo.name || "请登录"
      }}</router-link>
      <span class="quit" @click="handleQuit">退出</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "NavTopBar",
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  methods: {
    ...mapMutations("user", ["LOGOUT"]),
    handleQuit() {
      this.LOGOUT();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
a.nick-name {
  color: #409eff;
  text-decoration: none;
}
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