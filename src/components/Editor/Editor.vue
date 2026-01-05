<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 300px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { mapState } from "vuex";
export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: "<p></p>",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "simple", // or 'simple'
    };
  },
  computed: {
    ...mapState("article", ["articleDetail"]),
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },

    onChange(html) {
      // 触发自定义事件，将 html 内容传递给父组件
      let h = this.html.replaceAll(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
      this.$emit("onEditorBlur", h);
    },
  },
  mounted() {
    //  ajax 请求，异步渲染编辑器，需要定时器辅助显示
    if (this.$route.name !== "Publish") {
      setTimeout(() => {
        this.html = this.articleDetail.content;
      }, 1500);
    }
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>