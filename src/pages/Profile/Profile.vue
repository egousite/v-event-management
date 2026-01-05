<template>
  <div class="profile-wrap">
    <el-card
      v-if="$route.name === 'Profile'"
      class="profile-card user-profile-container"
      shadow="hover"
    >
      <div class="profile-header">
        <el-avatar
          :size="120"
          :src="userInfo.photo"
          class="user-avatar"
        ></el-avatar>
        <div class="user-basic-info">
          <h2>{{ userInfo.name }}</h2>
          <div class="user-id">ID: {{ userInfo.id }}</div>
        </div>
      </div>

      <div class="profile-section">
        <h3>个人简介</h3>
        <p class="intro-content">{{ userInfo.intro }}</p>
      </div>

      <div class="stats-section">
        <el-row :gutter="20">
          <el-col :xs="12" :sm="6">
            <div class="stat-item">
              <div class="stat-number">{{ userInfo.art_count }}</div>
              <div class="stat-label">发布文章</div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="6">
            <div class="stat-item">
              <div class="stat-number">{{ userInfo.follow_count }}</div>
              <div class="stat-label">关注</div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="6">
            <div class="stat-item">
              <div class="stat-number">{{ userInfo.fans_count }}</div>
              <div class="stat-label">粉丝</div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="6">
            <div class="stat-item">
              <div class="stat-number">{{ userInfo.like_count }}</div>
              <div class="stat-label">获赞</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <el-button type="primary" icon="el-icon-edit" @click="handleEdit">
          编辑资料
        </el-button>
      </div>
    </el-card>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProfileEdit from "@/pages/Profile/ProfileEdit/ProfileEdit.vue";

export default {
  name: "Profile",
  components: {
    ProfileEdit,
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  methods: {
    handleEdit() {
      // 这里可以跳转到编辑页面或打开编辑对话框
      this.$router.push({ name: "ProfileEdit" });
    },
  },
};
</script>

<style scoped>
.profile-wrap {
  padding: 30px;
}

.user-profile-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

.profile-card {
  padding: 30px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.user-avatar {
  border: 3px solid #f0f0f0;
}

.user-basic-info {
  margin-left: 30px;
}

.user-basic-info h2 {
  margin: 0 0 8px 0;
  font-size: 28px;
  color: #333;
}

.user-id {
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

.media-tag {
  font-size: 14px;
  padding: 6px 12px;
}

.profile-section {
  margin-bottom: 25px;
}

.profile-section h3 {
  color: #333;
  font-size: 18px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.intro-content,
.certi-content {
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.stats-section {
  margin: 35px 0;
  padding: 20px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.stat-item {
  text-align: center;
  padding: 15px 0;
}

.stat-number {
  font-size: 28px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 14px;
}

.action-buttons {
  margin-top: 25px;
  text-align: center;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .user-basic-info {
    margin-left: 0;
    margin-top: 20px;
  }

  .stat-number {
    font-size: 24px;
  }
}
</style>