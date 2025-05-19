import { fetchAllPosts, insertPost } from "../model/post.model.js";

export async function listPosts(req, res, next) {
  try {
    const posts = await fetchAllPosts();
    res.render("posts-list", { posts: posts });
  } catch (err) {
    console.error("error fetching posts:", err);
    next(err);
  }
}

export async function createPost(req, res, next) {
  try {
    const { title, summary, body, author_id } = req.body;

    await insertPost({ title, summary, body, author_id });
    res.status(201).redirect("/posts");
  } catch (err) {
    console.error("error creating post:", err);
    next(err);
  }
}
