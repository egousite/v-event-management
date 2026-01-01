<template>
  <div class="content">
    <!-- 筛选 -->
    <div class="card">
      <div class="title">
        <span>文章管理</span>
      </div>
      <!-- <Filter /> -->
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
                id="approved"
              />
              <label class="form-check-label" for="approved"> 审核通过 </label>
            </div>
          </div>
          <div>
            <label class="form-label">频道:</label>
            <select class="form-select" name="channel_id">
              <option selected>请选择文章频道</option>
              <option value="1">频道1</option>
              <option value="2">频道2</option>
              <option value="3">频道3</option>
            </select>
          </div>
          <div>
            <button type="button" class="btn btn-primary sel-btn">筛选</button>
          </div>
        </form>
      </div>
    </div>
    <!-- 内容列表 -->
    <div class="card">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>封面</th>
            <th>标题</th>
            <th>状态</th>
            <th>发布时间</th>
            <th>阅读数</th>
            <th>评论数</th>
            <th>点赞数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody class="align-middle art-list">
          <tr>
            <td>
              <img
                src="https://img2.baidu.com/it/u=2640406343,1419332367&fm=253&fmt=auto&app=138&f=JPEG?w=708&h=500"
                alt=""
              />
            </td>
            <td>文章标题</td>
            <td>
              <span class="badge text-bg-success">审核通过</span>
              <span class="badge text-bg-primary">待审核</span>
            </td>
            <td>
              <span>2023-04-27 10:59:34</span>
            </td>
            <td>
              <span>0</span>
            </td>
            <td>
              <span>0</span>
            </td>
            <td>
              <span>0</span>
            </td>
            <td>
              <i class="bi bi-pencil-square edit"></i>
              <i class="bi bi-trash3 del"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <nav>
        <ul class="pagination">
          <li class="page-item last">
            <a class="page-link" href="javascript:;">
              <span>&laquo;</span>
            </a>
          </li>
          <li class="page-item page-now">第1页</li>
          <li class="page-item next">
            <a class="page-link" href="javascript:;">
              <span>&raquo;</span>
            </a>
          </li>
          <li>
            <span class="total-count page-now">共0条</span>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",
};
</script>

<style scoped>
/* 内容区域 */
.content {
  padding: 30px;
  max-height: calc(100vh - 60px);
  overflow: auto;
}
.card {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border: 1px solid #ebeef5;
  padding: 20px;
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

/* 分页 */
.page-now {
  line-height: 40px;
  padding: 0 20px;
}
</style>