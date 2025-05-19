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

// get a post by ID with author details
export async function fetchPostById(id) {
  const sql = `
      SELECT posts.*, authors.name AS author_name, authors.email AS author_email
      FROM posts
      INNER JOIN authors ON posts.author_id = authors.id
      WHERE posts.id = ?`;
  const [data] = await pool.query(sql, [id]);

  const postData = {
    ...data[0],
    date: data[0].date.toISOString(),
    humanReadableDate: data[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  return postData ?? null;
}

// get posts for the edit form
export async function fetchPostByIdEdit(id) {
  const sql = `
    SELECT *  
    FROM posts 
    WHERE posts.id = ?`;
  const [data] = await pool.query(sql, [id]);
  return data[0] ?? null;
}

// update a post by ID
export async function updatePost(id, { title, summary, body }) {
  const sql = `
    update posts
       set title   = ?,
           summary = ?,
           body    = ?
     where id      = ?
  `;
  await pool.query(sql, [title, summary, body, id]);
}

// delete a post by ID
export async function deletePost(id) {
  const sql = `DELETE FROM posts WHERE id = ?`;
  await pool.query(sql, [id]);
}
