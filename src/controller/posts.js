const { Post } = require("../models/Post");

//exports.controllerFunctionName is the same as having module.exports at the bottom.

exports.getAllPosts = async (req, res) => {
  //gets all posts
  try {
    const allPosts = await Post.find({});
    res.status(200).send(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getAllUserPosts = async (req, res) => {
  //get all posts by user_id
  try {
    const allPosts = await Post.find({ author: req.params.user_id });
    res.status(200).send(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.addNewUserPost = async (req, res) => {
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
};

exports.updateUserPost = async (req, res) => {
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
};

exports.deleteUserPost = async (req, res) => {
  //deletes a users post
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send(post);
    console.log("post deleted");
  } catch (error) {
    res.status(404).send({ message: "post cannot be found" });
  }
};
