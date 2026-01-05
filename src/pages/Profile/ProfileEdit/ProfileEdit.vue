<template>
  <div class="profile-edit-container">
    <el-card class="edit-card" shadow="never">
      <!-- 页面标题 -->
      <div slot="header" class="edit-header">
        <h2>编辑个人资料</h2>
        <p class="sub-title">完善您的个人信息</p>
      </div>

      <!-- 头像上传区域 -->
      <div class="avatar-section">
        <h3 class="section-title"><i class="el-icon-picture"></i> 头像设置</h3>
        <div class="avatar-upload-area">
          <div class="upload-controls">
            <el-upload
              class="avatar-uploader"
              action="/user/photo"
              name="photo"
              :show-file-list="false"
              :before-upload="beforeUpload"
              :http-request="customUpload"
            >
              <el-avatar :size="120" fit="cover" shape="circle" alt="用户头像">
                <img
                  v-if="formData.photo"
                  :src="formData.photo"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-avatar>
              <p class="avatar-spec">
                支持 JPG、PNG 格式，建议尺寸 200×200 像素
              </p>
            </el-upload>
          </div>
        </div>
      </div>

      <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-width="120px"
        class="profile-form"
      >
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入昵称"
            maxlength="20"
            show-word-limit
            clearable
          >
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
          <div class="form-tips">昵称将显示在您的个人主页</div>
        </el-form-item>

        <!-- 性别 -->
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio :label="0">
              <i
                class="el-icon-male"
                style="color: #409EFF; margin-right: 5px"
              ></i>
              男
            </el-radio>
            <el-radio :label="1">
              <i
                class="el-icon-female"
                style="color: #F56C6C; margin-right: 5px"
              ></i>
              女
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 生日 -->
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="formData.birthday"
            type="date"
            placeholder="选择生日"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            style="width: 100%"
          >
            <template slot="prepend">
              <i class="el-icon-date"></i>
            </template>
          </el-date-picker>
          <div class="form-tips">生日格式：年-月-日</div>
        </el-form-item>

        <!-- 个人介绍 -->
        <el-form-item label="个人介绍" prop="intro">
          <el-input
            v-model="formData.intro"
            type="textarea"
            :rows="3"
            placeholder="介绍一下自己吧，让大家更了解您..."
            maxlength="500"
            show-word-limit
            resize="none"
          ></el-input>
          <div class="form-tips">最多500个字符</div>
        </el-form-item>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <el-button @click="handleCancel" size="medium">取消</el-button>
          <el-button type="info" @click="handleReset" size="medium"
            >重置</el-button
          >
          <el-button
            type="primary"
            @click="handleSubmit"
            :loading="submitting"
            size="medium"
          >
            <i class="el-icon-check"></i> 保存修改
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { userApi } from "@/api/index.js";
import request from "@/api/request.js";
import { mapState, mapActions } from "vuex";
export default {
  name: "ProfileEdit",
  data() {
    // 验证生日
    const validateBirthday = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请选择生日"));
      } else {
        const selectedDate = new Date(value);
        const today = new Date();
        const minDate = new Date("1900-01-01");

        if (selectedDate > today) {
          callback(new Error("生日不能晚于今天"));
        } else if (selectedDate < minDate) {
          callback(new Error("生日不能早于1900年"));
        } else {
          callback();
        }
      }
    };

    // 验证个人介绍
    const validateIntro = (rule, value, callback) => {
      if (!value || value.trim().length === 0) {
        callback(new Error("请输入个人介绍"));
      } else if (value.trim().length < 10) {
        callback(new Error("个人介绍至少需要10个字符"));
      } else {
        callback();
      }
    };

    return {
      // 表单数据
      formData: {},
      // 原始数据备份
      originalData: {},
      // 提交状态
      submitting: false,
      // 日期选择器选项（限制可选日期）
      pickerOptions: {
        disabledDate(time) {
          // 不能选择未来的日期
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const today = new Date();
              picker.$emit("pick", today);
            },
          },
          {
            text: "10年前",
            onClick(picker) {
              const date = new Date();
              date.setFullYear(date.getFullYear() - 10);
              picker.$emit("pick", date);
            },
          },
          {
            text: "20年前",
            onClick(picker) {
              const date = new Date();
              date.setFullYear(date.getFullYear() - 20);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      // 验证规则
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
          {
            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/,
            message: "只能包含中文、英文、数字、下划线和减号",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        birthday: [{ validator: validateBirthday, trigger: "change" }],
        intro: [{ validator: validateIntro, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState("user", ["userProfile"]),
    ...mapState("user", ["userInfo"]),
    // 性别显示文本
    genderText() {
      return this.formData.gender === "0" ? "男" : "女";
    },
  },
  mounted() {
    // 加载用户数据
    this.formData = {
      ...this.userProfile,
      ...this.userInfo,
    };
    // 备份原始数据
    this.originalData = Object.assign({}, this.formData);
  },
  methods: {
    ...mapActions("user", ["getUserInfo", "updateProfile", "getUserProfile"]),
    // 自定义头像上传
    async customUpload(options) {
      const { file } = options;

      try {
        const formData = new FormData();
        formData.append("photo", file);

        const response = await userApi.updatePhoto(formData);
        // 调用成功回调
        this.handleSuccess(response, file);
      } catch (err) {
        // 调用失败回调
        this.handleError(err, file);
      }
    },
    // 头像上传成功
    handleSuccess(res, file) {
      if (res?.message === "OK") {
        this.formData.photo = res.data.photo;
        this.$message.success("头像上传成功");
        this.getUserInfo();
        this.getUserProfile();
      } else {
        this.$message.error(res?.message || "头像上传失败");
      }
    },

    // 头像上传前检查
    beforeUpload(file) {
      const isImage = file.type.startsWith("image/");
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error("只能上传图片文件");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB");
        return false;
      }

      // 显示上传进度
      this.$message.info("正在上传头像，请稍候...");
      return true;
    },

    // 头像上传失败
    handleError(err, file) {
      console.error("头像上传错误:", err);
      this.$message.error("头像上传失败，请重试");
    },

    // 提交表单,不含头像
    handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitting = true;

          // 构建提交数据
          const submitData = {
            name: this.formData.name,
            gender: this.formData.gender,
            birthday: this.formData.birthday,
            real_name: this.formData.real_name,
            intro: this.formData.intro,
          };

          try {
            await this.updateProfile(submitData);

            this.formData = {
              ...this.userProfile,
              ...this.userInfo,
            };
            this.originalData = Object.assign({}, this.formData);

            setTimeout(() => {
              this.$router.push({ name: "Profile" });
            }, 2000);
          } catch (error) {
            this.$message.error(error.message || "个人资料更新失败");
          }
        } else {
          this.$message.error("请检查表单填写是否正确");
          return false;
        }
      });
    },

    // 重置表单
    handleReset() {
      // 检查是否有修改
      const hasChanges =
        JSON.stringify(this.formData) !== JSON.stringify(this.originalData);

      if (hasChanges) {
        this.$confirm("确定要重置所有修改吗？", "提示", {
          type: "warning",
          confirmButtonText: "确定重置",
          cancelButtonText: "取消",
          center: true,
        })
          .then(() => {
            this.formData = Object.assign({}, this.originalData);
            this.$refs.form.clearValidate();
            this.$message({
              message: "已重置所有修改",
              type: "info",
              duration: 1500,
            });
          })
          .catch(() => {});
      } else {
        this.$message({
          message: "没有修改",
          type: "info",
          duration: 1500,
        });
      }
    },

    // 取消修改
    handleCancel() {
      // 检查是否有未保存的修改
      const hasChanges =
        JSON.stringify(this.formData) !== JSON.stringify(this.originalData);

      if (hasChanges) {
        this.$confirm("您有未保存的修改，确定要离开吗？", "提示", {
          type: "warning",
          confirmButtonText: "确定离开",
          cancelButtonText: "继续编辑",
          center: true,
        })
          .then(() => {
            // 返回到上一页
            this.$router.push({ name: "Profile" });
          })
          .catch(() => {});
      } else {
        this.$router.push({ name: "Profile" });
      }
    },
  },
};
</script>

<style scoped>
.profile-edit-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0;
  max-height: calc(100vh - 60px);
  overflow: auto;
  box-sizing: border-box;
}

.edit-card,
.preview-card {
  border-radius: 8px;
  border: 1px solid #e6ebf5;
}

.edit-header {
  padding: 10px 0;
}

.edit-header h2 {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 24px;
  font-weight: 500;
}

.sub-title {
  margin: 0;
  color: #909399;
  font-size: 14px;
}
/* 头像上传区域样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

/* 头像区域样式 */
.avatar-section {
  margin-bottom: 30px;
  padding-bottom: 25px;
  border-bottom: 1px solid #e6ebf5;
}

.section-title {
  color: #303133;
  font-size: 16px;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
}

.section-title i {
  margin-right: 8px;
  color: #409EFF;
}

.avatar-upload-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.avatar-preview {
  display: flex;
  align-items: center;
  gap: 25px;
}

.current-avatar {
  border: 4px solid #f0f2f5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.current-avatar:hover {
  transform: scale(1.05);
}

.avatar-placeholder-text {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
}

.avatar-info {
  flex: 1;
}

.avatar-tip {
  margin: 0 0 8px 0;
  color: #606266;
  font-size: 15px;
}

.avatar-spec {
  margin: 0;
  color: #909399;
  font-size: 13px;
  line-height: 1.5;
}

.upload-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.avatar-actions {
  display: flex;
  gap: 15px;
}

.profile-form {
  padding: 10px 0;
}

.form-tips {
  margin-top: 8px;
  font-size: 12px;
  color: #909399;
  line-height: 1.5;
}

.readonly-section {
  margin: 30px 0;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 6px;
  border-left: 4px solid #409EFF;
}

.readonly-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-item {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.field-label {
  min-width: 80px;
  color: #606266;
  font-weight: 500;
}

.field-value {
  color: #303133;
}

.action-buttons {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #e6ebf5;
  margin-top: 10px;
}

.action-buttons .el-button {
  min-width: 120px;
  margin: 0 8px;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .profile-edit-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .preview-card {
    order: -1;
  }

  .avatar-preview {
    flex-direction: column;
    text-align: center;
  }

  .upload-controls {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .profile-edit-container {
    padding: 0 10px;
  }

  .action-buttons .el-button {
    margin: 5px;
    width: calc(100% - 10px);
  }

  .readonly-section {
    padding: 15px;
  }

  .upload-controls {
    flex-direction: column;
    align-items: center;
  }

  .avatar-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>