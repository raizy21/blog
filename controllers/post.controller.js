import {
  fetchAllPosts,
  insertPost,
  newPost,
  fetchPostById,
  fetchPostByIdEdit,
  updatePost,
  deletePost,
} from "../model/post.model.js";

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

// GET /posts/:id
export async function showPost(req, res, next) {
  try {
    const post = await fetchPostById(req.params.id);
    if (!post) return res.status(404).render("404");
    res.render("post-detail", { post });
  } catch (err) {
    next(err);
  }
}

// GET /posts/:id/edit
export async function editPostForm(req, res, next) {
  try {
    const post = await fetchPostByIdEdit(req.params.id);
    if (!post) return res.status(404).render("404");
    res.render("update-post", { post });
  } catch (err) {
    next(err);
  }
}

// POST /posts/:id/edit
export async function updatePostHandler(req, res, next) {
  try {
    await updatePost(req.params.id, req.body);
    res.redirect("/posts");
  } catch (err) {
    next(err);
  }
}

// POST /posts/:id/delete
export async function deletePostHandler(req, res, next) {
  const postId = req.params.id;

  try {
    await deletePost(postId);
    res.redirect("/posts");
  } catch (err) {
    next(err);
  }
}
