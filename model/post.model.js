import { pool } from "../util/database.js";

export async function fetchAllPosts() {
  const sql = `
  SELECT posts.*, authors.name AS author_name 
  FROM posts INNER JOIN authors ON posts.author_id = authors.id`;

  const [data] = await pool.query(sql);
  return data;
}
