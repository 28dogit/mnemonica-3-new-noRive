<template>
  <div>
    <h1>WordPress Posts</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <!-- class="flex flex-row flex-nowrap items-stretch justify-around gap-5" -->
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
            <p class="font-light text-base" v-html="post.excerpt"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import striptags from "striptags";
import { ref, onMounted } from "vue";

const GET_POSTS = gql`
  query {
    posts(first: 100) {
      nodes {
        id
        title
        content
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
const { result, loading, error } = useAsyncQuery(GET_POSTS);

//const posts = result?.value?.posts?.nodes || [];

const posts = ref([]);

onMounted(() => {
  if (result.value) {
    posts.value = result.value.posts.nodes.map((post) => ({
      ...post,
      //content: striptags(post.content),
      excerpt: striptags(post.excerpt),
    }));
  }
});

let isLoading = ref(true);
let isError = ref(null);
let isPosts = ref([]);

onMounted(async () => {
  try {
    const { data } = await apolloClient.query({ query: GET_POSTS });
    isPosts.value = data.posts.nodes;
  } catch (e) {
    isError.value = e;
  } finally {
    isLoading.value = false;
  }
});

// let i = ref([]);

// for (i = 0; i < posts.length; i++) {
//   const postExcerpt = posts[i].excerpt;
//   console.log(postExcerpt);
//   const cleanExcerpt = striptags(postExcerpt);
//   console.log(plainTextContent);
// }
</script>

<style scoped>
/* Stili del componente */
</style>
