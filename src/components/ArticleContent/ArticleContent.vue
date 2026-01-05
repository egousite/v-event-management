<template>
  <!-- 内容区域 -->
  <div class="content">
    <!-- 发布文章 -->
    <div class="card">
      <div class="title">
        <span>发布文章</span>
      </div>
      <div class="body">
        <form class="art-form">
          <input type="text" name="id" hidden />
          <div>
            <label for="title" class="form-label">标题：</label>
            <input
              type="text"
              class="form-control"
              id="title"
              name="title"
              v-model="detail.title"
            />
          </div>
          <div>
            <label for="channel_id" class="form-label">频道：</label>
            <select
              id="channel_id"
              class="form-select"
              name="channel_id"
              v-model="detail.channel_id"
            >
              <option selected value="">请选择文章频道</option>
              <option v-for="c in channelList" :key="c.id" :value="`${c.id}`">
                {{ c.name }}
              </option>
            </select>
          </div>
          <div class="cover">
            <label for="img" class="img-label">封面：</label>
            <el-upload
              action="/upload"
              list-type="picture-card"
              name="image"
              :file-list="imageList"
              :before-upload="beforeUpload"
              :http-request="customUpload"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :on-preview="handlePictureCardPreview"
              :on-exceed="handleExceed"
              :limit="uploadLimit"
              :disabled="imageList?.length >= uploadLimit"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>

          <Editor @onEditorBlur="getEditorContent"></Editor>
          <div>
            <button
              type="button"
              class="btn btn-primary send"
              @click="updatedArtical"
            >
              发布
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { articleApi } from "@/api/index.js";
import { mapState, mapActions } from "vuex";
import Editor from "@/components/Editor/Editor.vue";
export default {
  name: "ArticleContent",
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    Editor,
  },
  data() {
    return {
      uploadLimit: 3,
      uploadedImages: 0,
      // 图片
      dialogImageUrl: "",
      dialogVisible: false,
      // 文章详情，初始值
      detail: {
        id: "",
        title: "",
        channel_id: "0",
        pub_date: "",
        content: "",
        cover: {
          type: 0,
          images: [],
        },
      },
      // 文章封面图片列表
      imageList: [],
    };
  },
  computed: {
    ...mapState("article", ["channelList", "articleDetail"]),
  },
  mounted() {
    this.getChannelList();
    this.getArticleDetail(this.id);
  },
  methods: {
    ...mapActions("article", [
      "getChannelList",
      "getArticleDetail",
      "updateArticle",
      "publishArticle",
    ]),

    // 处理删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 处理预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 处理上传图片变化
    handleChange(file, fileList) {
      // console.log(file, fileList);
    },
    // 超出上传数量限制
    handleExceed(files, fileList) {
      this.$message.warning(`最多只能上传 ${this.uploadLimit} 张图片`);
    },
    // 自定义上传图片
    async customUpload(options) {
      const { file } = options;

      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await articleApi.uploadImages(formData);
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
        // this.$message.success("图片上传成功");
        this.detail.cover.images.push(res?.data?.url);
      } else {
        // this.$message.error(res?.message || "图片上传失败");
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
      // this.$message.info("正在上传头像，请稍候...");
      return true;
    },

    // 头像上传失败
    handleError(err, file) {
      // console.error("头像上传错误:", err);
      // this.$message.error("头像上传失败，请重试");
    },
    // 获取富文本内容
    getEditorContent(html) {
      this.detail.content = html;
    },
    // 发布
    updatedArtical() {
      //  * cover 中 传递样例为
      //  * { type: 0, images: []  }（无图）
      //  * { type: 1, images: [“地址1”]  }（单图）
      //  * { type: 3, images: [“地址1”，‘地址2’，‘地址3’]  }
      if (this.detail.cover.images.length === 0) {
        this.detail.cover.type = 0;
      } else if (this.detail.cover.images.length === 1) {
        this.detail.cover.type = 1;
      } else if (this.detail.cover.images.length > 1) {
        this.detail.cover.type = 3;
      }

      if (this.$route.name === "Publish") {
        // 发布文章
        delete this.detail.id; // 发布时，id 不存在
        this.publishArticle(this.detail);
      } else {
        // 更新文章
        this.updateArticle({ id: this.id, data: this.detail });
      }
      // 跳转到文章列表页
    },
  },
  watch: {
    // 监听 articleDetail 变化，更新 detail
    articleDetail() {
      if (this.$route.name !== "Publish") {
        this.detail = this.articleDetail;

        // 处理初次打开页面，upload预览图片列表格式 [{name: 'food.jpeg', url: 'xxx'}]
        let images = this.detail.cover.images;
        this.imageList = images.map((item, index) => ({
          name: index,
          url: item,
        }));
      } else {
        // 发布页，清空 detail 数据
        this.articleDetail = {
          id: "",
          title: "",
          channel_id: "",
          pub_date: "",
          content: "",
          cover: {
            type: 0,
            images: [],
          },
        };
        this.imageList = [];
      }
    },
  },
};
</script>

<style scoped>
.el-upload-list__item-delete.el-icon-delete {
  display: none !important;
}
.wrap {
  min-height: 100%;
  display: flex;
}

/* 卡片容器布局 */
.content {
  padding: 30px 30px 0;
  max-height: calc(100vh - 60px);
  overflow: auto;
}
.card {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border: 1px solid #ebeef5;
  padding: 30px;
}
.card .title {
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
}

/* 表单 */
.body form > div {
  margin-top: 20px;
}
.body form input,
.body form select {
  width: auto;
  display: inline-block;
}

.img-label {
  margin-bottom: 10px;
}
</style>