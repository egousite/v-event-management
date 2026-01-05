<template>
  <div class="login-main">
    <!-- 登录页面 -->
    <div class="login-wrap">
      <div class="title">文章管理系统</div>
      <div>
        <form class="login-form" ref="loginForm">
          <div class="item">
            <input
              type="text"
              class="form-control"
              name="mobile"
              placeholder="请输入手机号"
              v-model="mobile"
            />
          </div>
          <div class="item">
            <input
              type="text"
              class="form-control"
              name="code"
              placeholder="默认验证码246810"
              v-model="code"
            />
          </div>
          <div class="item">
            <button type="button" class="btn btn-primary" @click="handleLogin">
              登 录
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import serialize from "form-serialize";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      mobile: "13888888888",
      code: "246810",
    };
  },
  methods: {
    ...mapActions("user", ["login"]),

    async handleLogin() {
      const data = serialize(this.$refs.loginForm, {
        hash: true,
        empty: true,
      });
      // .then() 处理成功的情况
      // this.login({ data: data, router: this.$router }); // 直接将 router 传递 给 login 方法
      try {
        await this.login(data);
        setTimeout(() => {
          this.$router.push({ name: "Welcome" });
        }, 2000);
      } catch (error) {
        Message.error({
          message: error.response.data.message,
        });
      }

      // const { data, message } = await userApi.login({
      //   mobile: this.mobile,
      //   code: this.code,
      // });
      // if (message === "OK") {
      //   // token 2天，refresh_token 14天
      //   SET_TOKEN(data.token);
      //   SET_REFRESH_TOKEN(data.refresh_token);
      //   Message.success({
      //     message: "登录成功",
      //   });
      //   setTimeout(() => {
      //     this.$router.push("Welcome");
      //   }, 500);
      // } else {
      //  不好拿到错误，得 try catch
      //   Message.error({
      //     message: message,
      //   });
      // }
    },
  },
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