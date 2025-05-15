import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).redirect("/posts");
});

router.get("/posts", (req, res) => {
  res.status(200).render("posts-list");
});

router.get("/new-post", (req, res) => {
  res.status(200).render("create-post");
});
export default router;
