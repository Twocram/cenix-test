<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { usePosts } from './store/posts';

const postsStore = usePosts()


onMounted(() => {
  if (!localStorage.getItem('posts')) {
    postsStore.loadPosts()
  }
})
</script>
