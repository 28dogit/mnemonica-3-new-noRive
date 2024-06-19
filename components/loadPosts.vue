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
            <!-- <h4>---Content----</h4>
          <div v-html="post.content"></div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
const { result, loading, error } = useQuery(GET_POSTS);

const posts = result?.value?.posts?.nodes || [];
</script>

<style scoped>
/* Stili del componente */
</style>
