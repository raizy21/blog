import express from "express";
import { pool } from "../util/database.js";

import {
  listPosts,
  createPost,
  newPostForm,
  showPost,
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

router.get("/posts/:id/edit", async function (req, res) {
  const query = `
    SELECT *  
    FROM posts 
    WHERE posts.id = ?`;
  const [posts] = await pool.query(query, [req.params.id]);

  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  res.render("update-post", { post: posts[0] });
});

router.post("/posts/:id/edit", async function (req, res, next) {
  const postId = req.params.id; // read id from URL
  const { title, summary, body } = req.body; // now matches the form

  const query = `
    update posts
       set title   = ?,
           summary = ?,
           body    = ?
     where id      = ?
  `;
  try {
    await pool.query(query, [title, summary, body, postId]);
    res.redirect("/posts");
  } catch (err) {
    next(err);
  }
});

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
