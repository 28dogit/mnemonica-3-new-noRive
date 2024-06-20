<template>
  <div class="w-[1100px] max-w-[1100px] mx-auto">
    <div v-if="posts.length">
      <div id="PagesCardsWrapper" class="grid grid-cols-3 gap-8">
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
    <UButton @click="loadMore" class="my-4">
      <template v-if="loading"> Loading... </template>
      <template v-else> Load More </template>
    </UButton>
    <div v-if="error">Error: {{ error.message }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import striptags from "striptags";

const GET_POSTS = gql`
  query getPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
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
      pageInfo {
        endCursor
      }
    }
  }
`;

let first = ref(3);
let after = ref(null);
let { result, loading, error, fetchMore } = useQuery(GET_POSTS, {
  first: first.value,
  after: after.value,
});

let posts = ref([]);

onMounted(() => {
  if (result.value) {
    posts.value = result.value.posts.nodes.map((post) => ({
      ...post,
      cleanedExcerpt: striptags(post.excerpt),
    }));
    after.value = result.value.posts.pageInfo.endCursor;
  }
});

const loadMore = () => {
  fetchMore({
    variables: {
      first: first.value,
      after: after.value,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      posts.value = posts.value.concat(
        fetchMoreResult.posts.nodes.map((post) => ({
          ...post,
          cleanedExcerpt: striptags(post.excerpt),
        }))
      );
      after.value = fetchMoreResult.posts.pageInfo.endCursor;
    },
  });
};
</script>
