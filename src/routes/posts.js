const { Router } = require("express");
const {
  getAllPosts,
  getAllUserPosts,
  addNewUserPost,
  updateUserPost,
  deleteUserPost,
} = require("../controller/posts");
const postsRouter = Router();

postsRouter.get("/posts", getAllPosts);

postsRouter.get("/posts/:user_id", getAllUserPosts);

postsRouter.post("/posts/:user_id", addNewUserPost);

postsRouter.patch("/posts/:id", updateUserPost);

postsRouter.delete("/posts/:id", deleteUserPost);

module.exports = {
  postsRouter,
};
