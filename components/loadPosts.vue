<template>
  <div>
    <h1>WordPress Posts</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <div v-if="posts.length">
      <div v-for="post in posts" :key="post.id">
        <h1>Questo è {{ post.id }}</h1>
        <h2>------TITOLO------</h2>
        <h2>{{ post.title }}</h2>
        <h3>---Excerpt----</h3>
        <div v-html="post.excerpt"></div>
        <h4>---Content----</h4>
        <div v-html="post.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const GET_POSTS = gql`
  query {
    posts {
      nodes {
        id
        title
        content
        excerpt
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
