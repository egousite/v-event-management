import { articleApi } from "@/api/index";
import { SET_USERNAME, SET_REFRESH_TOKEN } from "@/utils/user";
import { Message } from 'element-ui';
import router from '../router'

export default {
    namespaced: true,
    state: {
        channelList: [],
        articleList: [],
        totalCount: 0,
        articleDetail: {},
    },
    actions: {
        // 获取文章频道列表
        getChannelList({ commit }) {
            articleApi.getChannelList().then(
                res => {
                    commit('SET_CHANNEL_LIST', res.data.channels)
                },
                err => {
                    console.log(err)
                }
            )
        },
        // 获取文章列表
        getArticleList({ commit }, params) {
            articleApi.getArticleList(params).then(
                (res) => {
                    commit('SET_ARTICLE_LIST', res.data.results)
                    commit('SET_ARTICLE_TOTAL_COUNT', res.data.total_count)
                },
                (err) => {
                    console.log(err);
                }
            )
        },
        // 删除文章
        deleteArticle({ dispatch }, { id, params }) {
            articleApi.deleteArticle(id).then(
                (res) => {
                    if (res.message === "OK") {
                        Message.success({
                            message: "删除成功",
                        });
                        dispatch('getArticleList', params);
                    } else {
                        Message.error({
                            message: "删除失败"
                        });
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
        },
        // 获取文章详情
        getArticleDetail({ commit }, articleId) {
            if (!articleId) {
                // 文章列表若为空，会默认查询文章列表。这里直接退出 
                return;
            }
            articleApi.getArticleDetail(articleId).then(
                (res) => {
                    if (res?.message === "OK") {
                        commit('SET_ARTICLE_DETAIL', res.data);
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
        },
        // 更新文章
        updateArticle({ dispatch }, { id, data }) {
            articleApi.editArticle(id, data).then(
                (res) => {
                    if (res.message === "OK") {
                        Message.success({
                            message: "更新成功",
                        });
                        dispatch('getArticleList', {})
                        router.app.$router.push({ name: 'Article' })
                    } else {
                        Message.error({
                            message: "更新失败"
                        });
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
        },
        // 发布文章
        publishArticle({ dispatch }, data) {
            articleApi.publishArticle(data).then(
                (res) => {
                    if (res.message === "OK") {
                        Message.success({
                            message: "发布成功",
                        });

                        dispatch('getArticleList', {})
                        router.app.$router.push({ name: 'Article' })
                    } else {
                        Message.error({
                            message: "发布失败"
                        });
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
        },

    },
    mutations: {
        SET_CHANNEL_LIST(state, channelList) {
            state.channelList = channelList;
        },
        SET_ARTICLE_LIST(state, articleList) {
            state.articleList = articleList;
        },
        SET_ARTICLE_TOTAL_COUNT(state, totalCount) {
            state.totalCount = totalCount;
        },
        SET_ARTICLE_DETAIL(state, articleDetail) {
            state.articleDetail = articleDetail;
        }
    },
    getters: {},
}
