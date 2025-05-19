import { fetchAllPosts, insertPost, newPost } from "../model/post.model.js";

// GET /posts
export async function listPosts(req, res, next) {
  try {
    const posts = await fetchAllPosts();
    res.render("posts-list", { posts: posts });
  } catch (err) {
    console.error("error fetching posts:", err);
    next(err);
  }
}

// POST /posts
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

// GET /new-post
export async function newPostForm(req, res, next) {
  try {
    const authors = await newPost();
    res.render("create-post", { authors });
  } catch (err) {
    next(err);
  }
}
