<template>
  <div class="article-detail-container">
    <div class="article-wrap">
      <!-- 文章头部 -->
      <div class="article-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/article' }"
            >文章</el-breadcrumb-item
          >
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>

        <h1 class="article-title">{{ article?.title }}</h1>

        <div class="article-meta">
          <div class="author-info">
            <el-avatar
              :size="60"
              :src="article.photo"
              class="author-avatar"
            ></el-avatar>
            <div class="author-detail">
              <div class="author-name">{{ article?.name }}</div>
              <div class="publish-info">
                <span class="publish-time">{{
                  formatTime(article?.pub_date)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 文章封面 -->
      <div
        class="demo-image__error article-cover"
        :class="{ 'is-error': article.cover.images.length === 0 }"
      >
        <el-image
          fit="scale-down"
          class="cover-image"
          v-for="url in article.cover.images"
          :key="url"
          :src="url"
          :preview-src-list="article.cover.images"
          lazy
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>

      <!-- 文章内容 -->
      <div class="article-content">
        <!-- 富文本内容区域 -->
        <div class="rich-content" v-html="article.content"></div>

        <!-- 如果内容为空，显示默认内容 -->
        <div v-if="!article.content" class="empty-content">
          <i class="el-icon-document"></i>
          <p>暂无内容</p>
        </div>
      </div>

      <!-- 作者信息卡片 -->
      <div class="author-card">
        <div class="card-header">
          <h3>关于作者</h3>
        </div>
        <div class="card-body">
          <div class="author-intro">
            <el-avatar
              :size="60"
              :src="article?.photo"
              class="author-card-avatar"
            ></el-avatar>
            <div class="author-card-info">
              <div class="author-card-name">{{ article?.name }}</div>
              <div class="author-card-desc">
                {{ article?.intro || "暂无个人介绍" }}
              </div>
              <div class="author-card-stats">
                <span>粉丝 {{ article?.fans_count || 0 }}</span>
                <span>文章 {{ article?.art_count || 0 }}</span>
                <span>获赞 {{ article?.like_count || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ArticleDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      article: {
        name: "",
        photo: "",
        intro: "",
        art_count: 0,
        follow_count: 0,
        fans_count: 0,
        like_count: 0,
        mobile: "",
        gender: 0,
        birthday: "",
        title: "",
        channel_id: 0,
        content: "",
        cover: {
          type: 0,
          images: [],
        },
        pub_date: "",
      },
      imgList: [],
    };
  },
  computed: {
    ...mapState("user", ["userInfo", "userProfile"]),
    ...mapState("article", ["articleDetail"]),
  },
  mounted() {
    this.getArticleDetail(this.id);
    this.getUserInfo();
    this.getUserProfile();
  },
  methods: {
    ...mapActions("article", ["getArticleDetail"]),
    ...mapActions("user", ["getUserInfo", "getUserProfile"]),

    // 格式化时间
    formatTime(time) {
      if (!time) return "";
      const date = new Date(time);
      const now = new Date();
      const diff = now - date;

      // 一分钟内
      if (diff < 60000) return "刚刚";
      // 一小时内
      if (diff < 3600000) return Math.floor(diff / 60000) + "分钟前";
      // 一天内
      if (diff < 86400000) return Math.floor(diff / 3600000) + "小时前";
      // 一周内
      if (diff < 604800000) return Math.floor(diff / 86400000) + "天前";

      // 超过一周显示具体日期
      return date.toLocaleDateString();
    },
  },
  watch: {
    articleDetail(newVal, oldVal) {
      this.article = Object.assign(
        {},
        this.articleDetail,
        this.userInfo,
        this.userProfile
      );
      this.imgList = this.article.cover.images.map((i) => i);
      return this.imgList || [];
    },
  },
};
</script>

<style scoped>
.article-detail-container {
  background-color: red;
  width: 100%;
  padding: 30px 30px 0;
  background: #fff;
  max-height: calc(100vh - 60px);
  overflow: auto;
  box-sizing: border-box;
}

.article-wrap {
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
}

/* 文章头部 */
.article-header {
  margin-bottom: 30px;
}

.article-title {
  font-size: 32px;
  font-weight: 600;
  margin: 20px 0;
  color: #1a1a1a;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.author-info {
  display: flex;
  align-items: center;
}

.author-avatar {
  margin-right: 12px;
}

.author-detail {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.publish-info {
  display: flex;
  align-items: center;
  color: #999;
  font-size: 14px;
}

.publish-time {
  margin-right: 10px;
}

.channel-tag {
  font-size: 12px;
}

.article-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  color: #666;
  font-size: 14px;
}

.stat-item i {
  margin-right: 4px;
  color: #999;
}

/* 文章封面 */
.article-cover {
  position: relative;
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: auto;
  display: flex;
  justify-content: space-around;
  align-content: center;
}

.cover-image {
  flex: 1;
  width: 100%;
  height: 400px;
  max-height: 400px;
}

/* 文章内容 */
.article-content {
  position: relative;
  margin-bottom: 40px;
}

.content-toolbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  padding: 12px 0;
  margin-bottom: 20px;
  transition: all 0.3s;
  border-bottom: 1px solid #f0f0f0;
}

.content-toolbar.fixed {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.toolbar-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}

/* 富文本内容 */
.rich-content {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.rich-content >>> p {
  margin-bottom: 1.5em;
}

.rich-content >>> h1,
.rich-content >>> h2,
.rich-content >>> h3 {
  margin-top: 1.5em;
  margin-bottom: 0.8em;
  font-weight: 600;
}

.empty-content {
  text-align: center;
  padding: 60px 0;
  color: #999;
  font-size: 16px;
}

.empty-content i {
  font-size: 48px;
  margin-bottom: 16px;
}

/* 文章标签 */
.article-tags {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.tag-item {
  margin-right: 10px;
  margin-bottom: 10px;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

/* 作者信息卡片 */
.author-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 40px;
  border: 1px solid #f0f0f0;
}

.card-header {
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.author-intro {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.author-card-avatar {
  margin-right: 16px;
}

.author-card-info {
  flex: 1;
}

.author-card-name {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
}

.author-card-desc {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
}

.author-card-stats {
  display: flex;
  gap: 20px;
  color: #999;
  font-size: 13px;
}

.author-actions {
  display: flex;
  gap: 12px;
}

/* 评论区域 */
.comment-section {
  margin-bottom: 50px;
}

.comment-header {
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.comment-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.comment-form {
  margin-bottom: 30px;
}

.comment-submit {
  margin-top: 12px;
  text-align: right;
}

/* 评论列表 */
.comment-item {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #f8f8f8;
}

.comment-avatar {
  margin-right: 12px;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.comment-user {
  font-weight: 500;
  color: #333;
}

.comment-time {
  color: #999;
  font-size: 13px;
}

.comment-text {
  color: #333;
  line-height: 1.6;
  margin-bottom: 8px;
}

.comment-actions {
  display: flex;
  gap: 16px;
}

.comment-actions .el-button--text {
  color: #999;
  font-size: 13px;
  padding: 0;
}

.comment-actions .liked {
  color: #f56c6c;
}

.empty-comments {
  text-align: center;
  padding: 40px 0;
  color: #999;
}

.empty-comments i {
  font-size: 36px;
  margin-bottom: 12px;
}

/* 相关文章推荐 */
.section-header {
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.section-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.related-item {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #f8f8f8;
  cursor: pointer;
  transition: background-color 0.2s;
}

.related-item:hover {
  background-color: #f9f9f9;
}

.related-content {
  flex: 1;
  padding-right: 20px;
}

.related-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
}

.related-meta {
  color: #999;
  font-size: 13px;
}

.related-author {
  margin-right: 12px;
}

.related-cover {
  width: 100px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  background: #f5f7fa;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-detail-container {
    padding: 15px;
  }

  .article-title {
    font-size: 24px;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .cover-image {
    height: 200px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .author-intro {
    flex-direction: column;
    text-align: center;
  }

  .author-card-avatar {
    margin-right: 0;
    margin-bottom: 12px;
  }

  .author-actions {
    justify-content: center;
  }

  .related-item {
    flex-direction: column;
  }

  .related-content {
    padding-right: 0;
    margin-bottom: 12px;
  }

  .related-cover {
    width: 100%;
    height: 150px;
  }
}
</style>

<style>
/* 文章封面无图或加载失败时 */
.is-error.article-cover {
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
}
.is-error.demo-image__error .image-slot,
.is-error.demo-image__placeholder .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 52px;
}
</style>