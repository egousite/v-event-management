<template>
  <div class="login-main">
    <!-- 警告框 -->
    <div class="alert info-box">操作结果</div>
    <!-- 登录页面 -->
    <div class="login-wrap">
      <div class="title">文章管理系统</div>
      <div>
        <form class="login-form">
          <div class="item">
            <input
              type="text"
              class="form-control"
              name="mobile"
              placeholder="请输入手机号"
              value="13888888888"
            />
          </div>
          <div class="item">
            <input
              type="text"
              class="form-control"
              name="code"
              placeholder="默认验证码246810"
              value="246810"
            />
          </div>
          <div class="item">
            <button type="button" class="btn btn-primary btn">登 录</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped>
html,
body {
  height: 100%;
}
.login-main {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../Login/images/login-bg.png") no-repeat center/cover !important;
}
/* 提示框 */
.alert {
  width: 400px;
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
}
.show {
  display: block !important;
}

/* 登录 */
.login-wrap {
  width: 400px;
  min-width: 400px;
  padding: 20px;
  background-color: #fff;
}
.login-wrap .title {
  font-size: 28px;
  text-align: center;
  color: #fc6627;
}
.login-wrap .login-form {
  margin-top: 20px;
}
input::-webkit-input-placeholder {
  color: #dcdfe6 !important;
}
.login-form .btn {
  width: 100%;
  background-color: #66b1ff;
  border: 1px solid #66b1ff;
}
.login-form .item:nth-child(n + 1) {
  margin-top: 20px;
}
</style>