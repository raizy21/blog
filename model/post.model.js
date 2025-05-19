import { pool } from "../util/database.js";

// get all posts with author names
export async function fetchAllPosts() {
  const sql = `
  SELECT posts.*, authors.name AS author_name 
  FROM posts INNER JOIN authors ON posts.author_id = authors.id`;

  const [data] = await pool.query(sql);
  return data;
}

// insert a new post
export async function insertPost({ title, summary, body, author_id }) {
  const sql = `INSERT INTO posts (title, summary, body, author_id) VALUES (?, ?, ?, ?)`;

  const [data] = await pool.query(sql, [title, summary, body, author_id]);
}

// get authors for the new post form
export async function newPost() {
  const sql = `SELECT * FROM authors`;
  const [data] = await pool.query(sql);

  return data;
}
