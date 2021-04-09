const { Router } = require("express");
const {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controller/users");
const userRouter = Router();

userRouter.get("/user", getAllUsers);

userRouter.post("/user", addUser);

userRouter.patch("/user/:id", updateUser);

userRouter.delete("/user/:id", deleteUser);

module.exports = {
  userRouter,
};
