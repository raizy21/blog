import express from "express";
import { pool } from "../util/database.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).redirect("/posts");
});

router.get("/posts", (req, res) => {
  res.status(200).render("posts-list");
});

router.post("/posts", async (req, res) => {
  const { title, summary, body, author_id } = req.body;
  await pool.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?)",
    [title, summary, body, author_id]
  );

  res.status(201).redirect("/posts");
});

router.get("/new-post", async (req, res) => {
  const [authors] = await pool.query("SELECT * FROM authors");
  res.status(200).render("create-post", { authors: authors });
});

export default router;
