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

export default router;
