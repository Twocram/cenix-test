import {fetchPosts} from "@/services/postService";
import {Post} from "@/types/post";
import {defineStore} from "pinia";


export const usePosts = defineStore("posts", {
  state: () => ({
    posts: localStorage.getItem("posts")
      ? (JSON.parse(localStorage.getItem("posts")!) as Post[])
      : [],
    currentPage: 1,
    pageSize: 20,
  }),
  actions: {
    savePosts() {
      localStorage.setItem("posts", JSON.stringify(this.posts));
    },

    async loadPosts(): Promise<void> {
      try {
        const data = await fetchPosts();

        this.posts = data.posts;

        this.savePosts();
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    },

    getPaginatedPosts() {
      const end = this.currentPage * this.pageSize;

      return this.posts.slice(0, end);
    },

    nextPage() {
      if (this.currentPage * this.pageSize < this.posts.length) {
        this.currentPage++;
      }
    },

    addPost(name: string) {
      const newPost: Post = {
        id: Date.now().toString(),
        name,
      };

      this.posts.push(newPost);

      this.savePosts();
    },

    editPost(id: string, newName: string) {
      const post = this.posts.find((post) => post.id === id);

      if (post) {
        post.name = newName;
      }

      this.savePosts();
    },

    deletePost(id: string) {
      this.posts = this.posts.filter((post) => post.id !== id);

      this.savePosts();
    },
  },
});
