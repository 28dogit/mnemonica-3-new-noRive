<template>
  <div>
    <h1>WordPress Posts</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <div v-if="posts.length">
      <div id="PagesCardsWrapper" class="grid grid-cols-3 gap-3">
        <div
          v-for="post in posts"
          :key="post.id"
          class="PageCard bg-white dark:bg-mine-shaft-800 rounded-b-2xl drop-shadow-lg"
        >
          <img
            :src="post.featuredImage.node.link"
            :alt="post.featuredImage.node.altText"
          />
          <div class="py-6 px-5">
            <h2 class="text-chenin-300 mb-4">{{ post.title }}</h2>
            <p class="font-light text-base" v-html="post.cleanedExcerpt"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import striptags from "striptags";

const GET_POSTS = gql`
  query {
    posts(first: 100) {
      nodes {
        id
        title
        excerpt
        featuredImage {
          node {
            link
            altText
          }
        }
      }
    }
  }
`;

let { result, loading, error } = useQuery(GET_POSTS);

let posts = ref([]);

onMounted(() => {
  if (result.value) {
    posts.value = result.value.posts.nodes.map((post) => ({
      ...post,
      cleanedExcerpt: striptags(post.excerpt),
    }));
  }
});
</script>

<style scoped>
/* Stili del componente */
</style>
