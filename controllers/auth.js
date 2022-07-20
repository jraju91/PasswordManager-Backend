import User from "../../PasswordManager-Backend/models/user.js";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const jwtSecret =
  "d41329a1f1352eda18fd4c521fe5899f3bff023554ea74ad7f77c88a1ca8ea98eaf29f";

export const getUsers = async (req, res) => {
  console.log("hello");
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  console.log("hello");
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      firstname,
      lastname,
      email,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign({ id: user._id, email }, jwtSecret, {
          expiresIn: maxAge,
        });
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        res.status(201).json({
          message: "User successfully created",
          user: user._id,
        });
      })

      .catch((error) =>
        res.status(400).json({
          message: "User not successful created",
          error: error.message,
        })
      );
  });
};

// rehash passwords
export const updateUser = async (req, res) => {
  // console.log("hello");
  const { id } = req.params;

  const { firstname, lastname, email, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);

  //   const updatedUser = { firstname, lastname, email, password: hash, _id: id };

  bcrypt.hash(password, 10).then(async (hash) => {
    const updatedUser = { firstname, lastname, email, password: hash, _id: id };
    await User.findByIdAndUpdate(id, updatedUser, { new: true });
    // console.log(password);

    res.json(updatedUser);
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.body;
  await User.findByIdAndRemove(id)
    .then((user) =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "email or Password not present",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Email does not exist",
    });
  }
  bcrypt
    .compare(password, user.password)
    .then(function (result) {
      if (result) {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign({ id: user._id, email }, jwtSecret, {
          expiresIn: maxAge,
        });
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        res.status(201).json({
          message: "User successfully Logged in",
          user: user._id,
        });
      } else {
        res.status(400).json({ message: "Login not succesful" });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message: "An error occurred while logging in",
        error: error.message,
      });
    });
};
