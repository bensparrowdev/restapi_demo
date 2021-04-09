require("./db/connection");
const express = require("express");
const { userRouter } = require("./routes/users");
const { postsRouter } = require("./routes/posts");

const port = process.env.PORT || 5000;
// init instance of express
const app = express();

//Middleware
app.use(express.json());
app.use(userRouter);
app.use(postsRouter);

//routes/endpoints health of server
app.get("/health", (req, res) => {
  console.log(req.body);
  res.send({
    message: "the server is working",
  });
});

//Blogposts

//server
app.listen(5000, () => {
  console.log(`Server listening on port ${port}`);
});
