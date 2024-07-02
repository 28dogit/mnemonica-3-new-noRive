<template>
  <div class="xl:max-w-[1100px] mx-auto md:w-[960px]">
    <div v-if="posts.length">
      <ClientOnly>
        <TransitionGroup
          id="PagesCardsWrapper"
          class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          name="fade"
          tag="div"
          appear
        >
          <div
            v-for="post in posts"
            :key="post.id"
            class="PageCard max-w-96 bg-white dark:bg-mine-shaft-800 rounded-b-2xl drop-shadow-lg"
          >
            <nuxt-img
              fit="cover"
              :src="post.featuredImage.node.link"
              :alt="post.featuredImage.node.altText"
              class="w-full h-auto"
            />
            <div class="py-6 px-5">
              <h2 class="text-chenin-300 mb-4">{{ post.title }}</h2>
              <p class="font-light text-base" v-html="post.cleanedExcerpt"></p>
            </div>
          </div>
        </TransitionGroup>
      </ClientOnly>
    </div>
    <UButton @click="loadMore" class="my-4">
      <template v-if="loading"> Loading... </template>
      <template v-else> Load More </template>
    </UButton>
    <div v-if="error">Error: {{ error.message }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
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

let first = ref(7);
let after = ref(null);
let { result, loading, error, fetchMore } = useQuery(GET_POSTS, {
  first: first.value,
  after: after.value,
});

let posts = ref([]);

// Aggiorna i post ogni volta che result cambia per forzare il caricamento iniziale
watch(
  result,
  (newValue) => {
    if (newValue && newValue.posts) {
      posts.value = newValue.posts.nodes.map((post) => ({
        ...post,
        cleanedExcerpt: striptags(post.excerpt),
      }));
      after.value = newValue.posts.pageInfo.endCursor;
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (result.value) {
    posts.value = result.value.posts.nodes.map((post) => ({
      ...post,
      cleanedExcerpt: striptags(post.excerpt),
    }));
    after.value = result.value.posts.pageInfo.endCursor;
  }

  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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

const handleScroll = () => {
  let bottomOfWindow =
    Math.max(
      window.scrollY,
      document.documentElement.scrollTop,
      document.body.scrollTop
    ) +
      window.innerHeight ===
    document.documentElement.offsetHeight;

  if (bottomOfWindow) {
    loadMore();
  }
};
</script>

<style scoped>
/* .fade-post {
  transition: all 1s;
} */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
