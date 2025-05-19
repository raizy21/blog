import express from "express";
import { pool } from "../util/database.js";

import {
  listPosts,
  createPost,
  newPostForm,
  showPost,
  editPostForm,
  updatePostHandler,
} from "../controllers/post.controller.js";

const router = express.Router();

// redirect root URL to /posts
router.get("/", (req, res) => {
  res.status(200).redirect("/posts");
});

// GET /posts
router.get("/posts", listPosts);

// POST /posts
router.post("/posts", createPost);

// GET /new-post
router.get("/new-post", newPostForm);

// GET /posts/:id
router.get("/posts/:id", showPost);

// GET /posts/:id/edit
router.get("/posts/:id/edit", editPostForm);

// POST /posts/:id/edit
router.post("/posts/:id/edit", updatePostHandler);

router.post("/posts/:id/delete", async function (req, res, next) {
  const postId = req.params.id;

  try {
    await pool.query("DELETE FROM posts WHERE id = ?", [postId]);
    res.redirect("/posts");
  } catch (err) {
    next(err);
  }
});

router.get("/fail", (req, res) => {
  throw new Error("test 500 page");
});

export default router;
