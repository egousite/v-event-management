import { userApi } from "@/api/index";
import { SET_TOKEN, SET_LOCALSTORAGE, GET_LOCALSTORAGE, REMOVE_TOKEN, REMOVE_REFRESH_TOKEN, REMOVE_LOCALSTORAGE } from "@/utils/user";
import { Message } from 'element-ui';
export default {
    namespaced: true,
    state: {
        userInfo: JSON.parse(GET_LOCALSTORAGE("userInfo")) || {},
        userProfile: JSON.parse(GET_LOCALSTORAGE("userProfile")) || {},
    },
    actions: {
        login({ dispatch }, data) {
            userApi.login(data).then(
                (response) => {
                    Message.success({
                        message: "登录成功",
                    });
                    SET_TOKEN(response.data.token);

                    dispatch('getUserInfo');
                    dispatch('getUserProfile');

                },
                (error) => {
                    Message.error({
                        message: error.response.data.message,
                    });
                }
            );
        },
        getUserInfo({ commit }) {
            userApi.getUserInfo().then((response) => {
                // 登录成功后，将用户信息存储到 Vuex 中
                commit("SET_USERINFO", response.data);
                SET_LOCALSTORAGE("userInfo", JSON.stringify(response.data));
            });
        },
        getUserProfile({ commit }) {
            userApi.getUserProfile().then((response) => {
                // 登录成功后，将用户个人信息存储到 Vuex 中
                commit("SET_USERPROFILE", response.data);
                SET_LOCALSTORAGE("userProfile", JSON.stringify(response.data));
            });
        },
        updateProfile({ dispatch }, submitData) {
            userApi.updateProfile(submitData).then((res) => {
                if (res.message === "OK") {
                    Message.success({
                        message: "个人资料更新成功",
                        duration: 2000,
                    });

                    dispatch('getUserInfo');
                    dispatch('getUserProfile');
                }
            });

        },
    },
    mutations: {
        SET_USERINFO(state, userInfo) {
            state.userInfo = userInfo;
        },
        SET_USERPROFILE(state, userProfile) {
            state.userProfile = userProfile;
        },
        LOGOUT(state) {
            state.userInfo = {};
            state.userProfile = {};
            REMOVE_TOKEN();
            REMOVE_REFRESH_TOKEN();
            REMOVE_LOCALSTORAGE("userInfo");
            REMOVE_LOCALSTORAGE("userProfile");
        }
    },
    getters: {},
}
