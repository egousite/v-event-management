<template>
  <ArticleContent :id="id"></ArticleContent>
</template>

<script>
import ArticleContent from "@/components/ArticleContent/ArticleContent.vue";
export default {
  name: "ArticleEdit",
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    ArticleContent,
  },
};
</script>

<style>
</style>