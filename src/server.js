require("./db/connection");
const express = require("express");
const { User } = require("./models/User");
const { Post } = require("./models/Post");

const port = process.env.PORT || 5000;
// init instance of express
const app = express();

//Middleware
app.use(express.json());

//routes/endpoints health of server
app.get("/health", (req, res) => {
  console.log(req.body);
  res.send({
    message: "the server is working",
  });
});

//User accounts
app.get("/user", async (req, res) => {
  //this is the route to get a user
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/user", async (req, res) => {
  //this is the route to add a user
  try {
    const user = new User(req.body);
    const returnValue = await user.save();
    console.log(`Successfully added ${returnValue.name}`);
    res.status(201).send(`Successfully added ${returnValue.name}`);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/user/:id", async (req, res) => {
  //this will be our route to update a user
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({
      message: "user not found",
    });
  }
});

app.delete("/user/:id", async (req, res) => {
  //this will be our route to delete a user
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      message: "user not found",
    });
  }
});

//Blogposts
app.get("/posts", async (req, res) => {
  //gets all posts
  try {
    const allPosts = await Post.find({});
    res.status(200).send(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/posts/:user_id", async (req, res) => {
  //get all posts by user_id
  try {
    const allPosts = await Post.find({ author: req.params.user_id });
    res.status(200).send(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/posts/:user_id", async (req, res) => {
  //creates a post by user_id
  try {
    const post = new Post(req.body);
    post.author = req.params.user_id;
    const returnedValue = await post.save();

    res.status(201).send(returnedValue);
    console.log("New post created");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.patch("/posts/:id", async (req, res) => {
  //updates the post specific to user
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(post);
    console.log(post);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "post not found" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  //deletes a users post
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send(post);
    console.log("post deleted");
  } catch (error) {
    res.status(404).send({ message: "post cannot be found" });
  }
});

//server
app.listen(5000, () => {
  console.log(`Server listening on port ${port}`);
});
