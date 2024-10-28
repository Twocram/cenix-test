<template>
  <v-list-item class="post-item">
    <div class="d-flex align-center">
      <div class="mr-8 w-100">
        <v-list-item-title>ID: {{ post.id }}</v-list-item-title>
        <v-text-field @blur="blurHandler()" v-model="localPropsName"/>
      </div>

      <v-list-item-action>
        <v-btn icon @click="deletePost(post)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </div>
  </v-list-item>
</template>

<script setup lang="ts">
import {Post} from '@/types/post';
import {usePosts} from "@/store/posts";
import {ref} from "vue";

type Props = {
  post: Post
}

const props = defineProps<Props>()

const localPropsName = ref<string>(props.post.name)

const postsStore = usePosts()

const deletePost = (post: Post) => {
  postsStore.deletePost(post.id)
}

const blurHandler = () => {
  postsStore.editPost(props.post.id, localPropsName.value)
}

</script>

<style scoped>
.post-item {
  transition: all 0.1s ease-in-out;
  margin-bottom: 12px;
}

.post-item:hover {
  background-color: #f0f0f0;
}
</style>
