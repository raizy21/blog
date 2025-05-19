import { fetchAllPosts } from "../model/post.model.js";

export async function listPosts(req, res, next) {
  try {
    const posts = await fetchAllPosts();
    res.render("posts-list", { posts: posts });
  } catch (err) {
    console.error("error fetching posts:", err);
    next(err);
  }
}
