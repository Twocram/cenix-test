<template>
  <div class="d-flex ga-6 align-center">
    <v-text-field v-model="newPostName" label="New post name"/>
    <v-btn @click="createPost">
      Create
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {usePosts} from "@/store/posts";

const postsStore = usePosts()


const newPostName = ref<string>("")

const createPost = () => {
  postsStore.addPost(newPostName.value)
  newPostName.value = ""
}
</script>

<style scoped>

</style>
