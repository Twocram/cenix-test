<template>
  <v-list v-if="posts.length > 0">
    <v-post-list-item v-for="post in props.posts" :key="post.id" :post="post"/>
  </v-list>

  <div v-else>
    No posts found
  </div>

  <div ref="loadMoreTrigger" style="height: 1px;"></div>
</template>


<script setup lang="ts">
import {Post} from '@/types/post';
import VPostListItem from './VPostListItem.vue';
import {onMounted, ref} from 'vue';
import {usePosts} from '@/store/posts';
import {useObserver} from '@/composables/useObserver';

type Props = {
  posts: Post[],
  searchQuery: string,
}

const props = defineProps<Props>()

const postsStore = usePosts()

const loadMoreTrigger = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (loadMoreTrigger.value) {
    useObserver(loadMoreTrigger.value, () => {
      if (!props.searchQuery.length) {
        console.log('hello world')
        postsStore.nextPage()
      }
    })
  }
})

</script>

<style scoped></style>
