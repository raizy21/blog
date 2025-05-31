import express from "express";
import path from "path";
import * as blogRouterModule from "./routes/blog.router.js";

let blogRouter = blogRouterModule;
while (blogRouter && typeof blogRouter !== "function") {
  blogRouter = blogRouter.default;
}

if (typeof blogRouter !== "function") {
  throw new Error("could not find router function in blogRouterModule");
}
const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "views"));

// body parser
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static(path.resolve(process.cwd(), "public")));

// routes
app.use("/", blogRouter);

// 500 handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("500");
});

export default app;
