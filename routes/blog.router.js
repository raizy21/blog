import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).redirect("/posts");
});

router.get("/posts", (req, res) => {
  res.status(200).render("posts-list");
});

export default router;
