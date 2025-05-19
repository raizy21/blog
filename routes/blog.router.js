import express from "express";
import { pool } from "../util/database.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).redirect("/posts");
});

router.get("/posts", async (req, res) => {
  const query = `
  SELECT posts.*, authors.name AS author_name 
  FROM posts INNER JOIN authors ON posts.author_id = authors.id`;
  const [posts] = await pool.query(query);
  res.render("posts-list", { posts: posts });
});

router.post("/posts", async (req, res, next) => {
  const { title, summary, body, author_id } = req.body;

  try {
    await pool.query(
      "INSERT INTO posts (title, summary, body, author_id) VALUES (?, ?, ?, ?)",
      [title, summary, body, author_id]
    );
    res.status(201).redirect("/posts");
  } catch (err) {
    next(err);
  }
});

router.get("/new-post", async (req, res) => {
  const [authors] = await pool.query("SELECT * FROM authors");
  res.status(200).render("create-post", { authors: authors });
});

router.get("/posts/:id", async (req, res, next) => {
  const query = `
    SELECT posts.*, authors.name AS author_name, authors.email AS author_email
    FROM posts
    INNER JOIN authors ON posts.author_id = authors.id
    WHERE posts.id = ?`;
  const [posts] = await pool.query(query, [req.params.id]);

  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanReadableDate: posts[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  res.render("post-detail", { post: postData });
});

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

export default router;
