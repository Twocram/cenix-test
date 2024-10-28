<template>
  <v-container>
    <v-create-post/>
    <v-text-field v-model="search" label="Search" class="mb-4"/>

    <v-post-list :search-query="debouncedSearch" :posts="posts"/>
  </v-container>

</template>

<script lang="ts" setup>
import VPostList from '@/components/VPostList.vue';
import {usePosts} from '@/store/posts';
import {computed, ref, watch} from 'vue';
import VCreatePost from "@/components/VCreatePost.vue";
import {Post} from "@/types/post";
import {debounce} from "@/utils/debounce";

const postsStore = usePosts()

const search = ref<string>("")
const debouncedSearch = ref<string>("")

watch(search, debounce((newSearch: string) => {
  debouncedSearch.value = newSearch;
}, 300));

const posts = computed(() => {
  if (debouncedSearch.value.length > 0) {
    return postsStore.posts.filter((post: Post) =>
      post.name.toLowerCase().includes(debouncedSearch.value.toLowerCase()))
  } else {
    return postsStore.getPaginatedPosts()
  }
})

</script>
