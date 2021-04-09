const { User } = require("../models/User");

//exports.controllerFunctionName is the same as having module.exports at the bottom.

exports.getAllUsers = async (req, res) => {
  //this is the route to get all user
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addUser = async (req, res) => {
  //this is the route to add a user
  try {
    const user = new User(req.body);
    const returnValue = await user.save();
    console.log(`Successfully added ${returnValue.name}`);
    res.status(201).send(`Successfully added ${returnValue.name}`);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateUser = async (req, res) => {
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
};

exports.deleteUser = async (req, res) => {
  //this will be our route to delete a user
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      message: "user not found",
    });
  }
};
