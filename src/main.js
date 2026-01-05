import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// 状态管理
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css';

// 全部引入 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 按需引入，在使用的地方，还需要导入需要用的组件
// import { Message } from 'element-ui';
// Vue.use(Message);// 页面刷新会自己提示一个空的消息弹窗
// Vue.component(Message)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    // console.log(this);
  },
}).$mount('#app')
