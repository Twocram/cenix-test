import {Post} from "@/types/post";

export async function fetchPosts(): Promise<{ posts: Post[] }> {
  try {
    const response = await fetch("/posts.json");
    
    const {posts} = await response.json();

    return {posts};
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
}
