<template>
  <div>
    <div class="content" v-if="$route.name === 'Article'">
      <!-- 筛选 -->
      <div class="card left-card">
        <div class="title">
          <span>文章管理</span>
        </div>
        <div class="body">
          <form class="sel-form">
            <div>
              <label class="form-label">状态:</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  value=""
                  v-model="params.status"
                  id="all"
                  checked
                />
                <label class="form-check-label" for="all"> 全部 </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  value="1"
                  v-model="params.status"
                  id="audit"
                />
                <label class="form-check-label" for="audit"> 待审核 </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  value="2"
                  v-model="params.status"
                  id="approved"
                />
                <label class="form-check-label" for="approved">
                  审核通过
                </label>
              </div>
            </div>
            <div>
              <label class="form-label">频道:</label>
              <select
                class="form-select"
                name="channel_id"
                v-model="params.channel_id"
              >
                <option selected value="">请选择文章频道</option>
                <option v-for="c in channelList" :key="c.id" :value="`${c.id}`">
                  {{ c.name }}
                </option>
              </select>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-primary sel-btn"
                @click="hanldefilter"
              >
                筛选
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- 内容列表 -->
      <div class="card right-card">
        <div class="scroll-container">
          <el-table
            style="width: 100%"
            :data="articleList"
            max-height="500"
            empty-text="暂无数据"
            stripe
            :show-header="true"
            :highlight-current-row="true"
          >
            <el-table-column
              fixed
              prop="date"
              label="封面"
              width="200"
              :align="'center'"
            >
              <template slot-scope="scope">
                <div class="demo-image__error">
                  <div class="block">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="scope.row.cover.images[0]"
                      fit="cover"
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              min-width="160"
              :align="'center'"
            >
              <template slot-scope="scope">
                <el-link @click="handleDetail(scope.row.id)">{{
                  scope.row.title
                }}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              min-width="160"
              :align="'center'"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1" class="status-wait"
                  >待审核</span
                >
                <span v-else-if="scope.row.status === 2" class="status-agree"
                  >审核通过</span
                >
                <span v-else class="status-unknown">未知状态</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="pubdate"
              label="发布时间"
              min-width="160"
              :align="'center'"
            >
            </el-table-column>
            <el-table-column
              prop="read_count"
              label="阅读数"
              min-width="100"
              :align="'center'"
            >
            </el-table-column>
            <el-table-column
              prop="comment_count"
              label="评论数"
              min-width="100"
              :align="'center'"
            >
            </el-table-column>
            <el-table-column
              prop="like_count"
              label="点赞数"
              width="100"
              :align="'center'"
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="160"
              :align="'center'"
              style="background-color: orange !important"
            >
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit"
                  @click="handleEdit(scope.row.id)"
                  type="primary"
                  size="small"
                >
                </el-button>
                <el-button
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row.id)"
                  type="danger"
                  size="small"
                >
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="params.page"
            :page-sizes="[3, 5, 10, 20, 50, 100]"
            :page-size="params.per_page"
            layout=" prev, pager, next, sizes, total"
            :total="totalCount"
            v-if="totalCount > 0"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ArticleEdit from "@/pages/Article/ArticleEdit/ArticleEdit.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Article",
  components: {
    ArticleEdit,
  },
  data() {
    return {
      params: {
        status: "",
        channel_id: "",
        begin_pubdate: "",
        end_pubdate: "",
        page: 1,
        per_page: 10,
      },
    };
  },
  mounted() {
    this.getChannelList();
    this.getArticleList(this.params);
  },
  computed: {
    ...mapState("article", ["channelList"]),
    ...mapState("article", ["articleList", "totalCount"]),
  },
  methods: {
    ...mapActions("article", [
      "getChannelList",
      "getArticleList",
      "deleteArticle",
    ]),
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 上一页
    prev() {
      if (this.params.page <= 1) {
        this.$message({
          message: "已到第一页",
          type: "warning",
        });
        return;
      }
      this.params.page--;
      this.getArticleList(this.params);
    },
    // 下一页
    next() {
      if (
        this.params.page >= Math.ceil(this.totalCount / this.params.per_page)
      ) {
        this.$message({
          message: "已到最后一页",
          type: "warning",
        });
        return;
      }
      this.params.page++;
      this.getArticleList(this.params);
    },
    // 设置每页多少条数据
    handleSizeChange(val) {
      this.params.per_page = val;
      this.params.page = 1;
      this.getArticleList(this.params);
    },
    // 设置当前页码，比如当前第几页
    handleCurrentChange(val) {
      this.params.page = val;
      this.getArticleList(this.params);
    },
    // 筛选
    hanldefilter() {
      this.getArticleList(this.params);
    },
    // 编辑
    handleEdit(id) {
      this.$router.push({
        name: "ArticleEdit",
        params: {
          id,
        },
      });
    },
    // 删除
    handleDelete(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteArticle({ id, params: this.params });
      });
    },
    // 详情
    handleDetail(id) {
      this.$router.push({
        name: "ArticleDetail",
        params: {
          id,
        },
      });
    },
  },
};
</script>


<style scoped>
/* 标题 */
.art-title {
  cursor: pointer;
}
/* 编辑删除图标 */
.el-icon-edit {
  font-size: 20px;
  color: #409eff;
  cursor: pointer;
}
.el-icon-delete {
  font-size: 20px;
  color: #f56c6c;
  cursor: pointer;
}
/* 内容区域 */
.content {
  padding: 30px;
  min-height: calc(100vh - 60px);
  overflow: auto;
  display: flex;
  flex: auto;
  flex-direction: column;
}
.card {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border: 1px solid #ebeef5;
  padding: 30px;
}
.card:nth-child(n + 2) {
  margin-top: 30px;
}
.card .title {
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
}
.card.left-card {
  flex: 0 0 200px;
}
.card.right-card {
  flex: 1;
  padding-left: 0;
}
.scroll-container {
  position: absolute;
  width: 100%;
}

/* 表单部分 */
.form-check,
.form-select {
  display: inline-block;
  margin-left: 10px;
}
.form-select {
  width: auto;
}
.body form > div {
  margin-top: 20px;
}

/* 表格列表部分 */
.table img {
  width: 100px;
  height: 100px;
}
.table .bi {
  cursor: pointer;
}

.status-unknown {
  color: #909399;
}
.status-wait {
  color: #409eff;
}
.status-agree {
  color: #67c23a;
}

/* 分页 */
.page-now {
  line-height: 40px;
  padding: 0 20px;
}

/* 文章封面无图或加载失败时 */
.demo-image__error .image-slot,
.demo-image__placeholder .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 32px;
}
</style>