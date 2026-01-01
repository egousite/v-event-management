<template>
  <div class="welcome-container">
    <div class="welcome-content">
      <!-- Logo/图标区域 -->
      <div class="logo-section">
        <div class="logo-circle">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4F46E5" />
            <path d="M2 17L12 22L22 17" stroke="#4F46E5" stroke-width="2" />
            <path d="M2 12L12 17L22 12" stroke="#4F46E5" stroke-width="2" />
          </svg>
        </div>
        <h1 class="app-name">欢迎使用</h1>
        <h2 class="app-title">文章管理系统</h2>
      </div>

      <!-- 欢迎信息 -->
      <div class="welcome-message">
        <p class="subtitle">简单、高效、易用</p>
        <p class="description">这是一个全新的开始，让我们一起探索更多可能性</p>
      </div>

      <!-- 底部信息 -->
      <div class="footer-info">
        <p>版本 v1.0.0</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style scoped>
.welcome-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  padding: 20px;
}

.welcome-content {
  background: white;
  border-radius: 24px;
  padding: 60px 40px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-section {
  margin-bottom: 40px;
}

.logo-circle {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.app-name {
  font-size: 28px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
}

.app-title {
  font-size: 36px;
  color: #4F46E5;
  margin: 0;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-message {
  margin-bottom: 40px;
}

.subtitle {
  font-size: 18px;
  color: #666;
  margin-bottom: 16px;
  font-weight: 500;
}

.description {
  font-size: 16px;
  color: #888;
  line-height: 1.6;
  max-width: 320px;
  margin: 0 auto;
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 40px;
}

.primary-btn {
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(79, 70, 229, 0.3);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(79, 70, 229, 0.4);
}

.secondary-btn {
  background: white;
  color: #4F46E5;
  border: 2px solid #E5E7EB;
  padding: 12px 30px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-btn:hover {
  border-color: #4F46E5;
  background: #F9FAFB;
}

.footer-info {
  color: #9CA3AF;
  font-size: 14px;
}

.footer-info p {
  margin: 4px 0;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .welcome-content {
    padding: 40px 24px;
    margin: 20px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .app-title {
    font-size: 32px;
  }
}
</style>
