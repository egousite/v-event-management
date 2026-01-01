<!-- About.vue -->
<template>
  <div class="about-container">
    <!-- 页面头部 -->
    <header class="about-header">
      <h1 class="title">关于我们</h1>
      <p class="subtitle">我们致力于创造更好的产品体验</p>
    </header>

    <!-- 主要内容区域 -->
    <main class="about-content">
      <!-- 联系方式 -->
      <section class="contact-section">
        <div class="contact-card">
          <h2>联系我们</h2>
          <p>如果您有任何问题或合作意向，欢迎随时联系我们</p>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <div>
                <h3>邮箱</h3>
                <p>xxx@xxx.com</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📞</span>
              <div>
                <h3>电话</h3>
                <p>+86 xxx-xxx-xxxx</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <div>
                <h3>地址</h3>
                <p>xxx省xxx市xxx区</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  /* background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%); */
}

/* 头部样式 */
.about-header {
  text-align: center;
  margin-bottom: 60px;
  padding: 40px 20px;
  /* background: linear-gradient(135deg, #667eea 0%, #667eea 100%); */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  color: #333;
}

.title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #333;
  background: linear-gradient(135deg, #409eff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 20px;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* 联系方式 */
.contact-section {
  margin-bottom: 40px;
}

.contact-card {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  padding: 50px;
  color: #333;
  text-align: center;
}

.contact-card h2 {
  font-size: 36px;
  margin-bottom: 16px;
  font-weight: 700;
  color: #409eff;
}

.contact-card > p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 40px;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.contact-icon {
  font-size: 32px;
  margin-top: 4px;
}

.contact-item h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.contact-item p {
  opacity: 0.9;
  font-size: 15px;
}

.contact-btn {
  background: white;
  color: #6366f1;
  border: none;
  padding: 16px 40px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.contact-btn:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title {
    font-size: 36px;
  }

  .intro-card {
    flex-direction: column;
    gap: 30px;
  }

  .intro-image {
    flex: none;
    width: 100%;
  }

  .timeline::before {
    left: 15px;
  }

  .timeline-year {
    flex: 0 0 50px;
    width: 50px;
    height: 50px;
    font-size: 16px;
  }

  .contact-card {
    padding: 30px 20px;
  }
}

@media (max-width: 480px) {
  .values-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }

  .contact-info {
    grid-template-columns: 1fr;
  }
}
</style>