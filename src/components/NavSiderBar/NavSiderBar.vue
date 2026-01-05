<template>
  <div class="aside">
    <h2>文章管理系统</h2>
    <ul class="nav">
      <li>
        <router-link to="/welcome" active-class="active">
          <span class="iconfont icon-16"></span>
          <span>首页</span>
        </router-link>
      </li>
      <li>
        <router-link to="/article" active-class="active">
          <span class="iconfont icon-16"></span>
          <span>文章管理</span>
        </router-link>
      </li>
      <li>
        <router-link to="/publish" active-class="active">
          <span class="iconfont icon-fabu"></span>
          <span>发布文章</span>
        </router-link>
      </li>
      <li>
        <router-link to="/profile" active-class="active">
          <span class="iconfont icon-geren"></span>
          <span>个人中心</span>
        </router-link>
      </li>
      <li>
        <router-link to="/about" active-class="active">
          <span class="iconfont icon-16"></span>
          <span>关于我们</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* 侧边栏 */
.aside {
  width: 200px;
  min-width: 200px;
  background-color: #023;
  padding-top: 40px;
}

.aside h2 {
  text-align: center;
  color: #fc6627;
  font-size: 26px;
  margin-bottom: 30px;
}

/* 侧边栏导航 */
.nav {
  padding-left: 0;
}
.nav li {
  width: 100%;
  height: 60px;
  cursor: pointer;
  list-style: none;
}
.nav li a {
  display: block;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  line-height: 60px;
  color: white;
  text-decoration: none;
  box-sizing: border-box;
}
.nav li a:hover {
  background-color: #046;
  /* color: #fff !important; */
}
.nav li a.active {
  color: #409eff !important;
}
</style>