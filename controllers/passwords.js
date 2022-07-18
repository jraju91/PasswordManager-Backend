import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Password from "../../PasswordManager-Backend/models/password.js";
import bcrypt from "bcryptjs";
export const getPasswords = async (req, res) => {
  console.log(req.userId);
  try {
    const password = await Password.find();
    console.log(password);

    res.status(200).json(password);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPassword = async (req, res) => {
  const { id } = req.params;
  try {
    const password = await Password.findById(id);
    // console.log(password);

    res.status(200).json(password);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPassword = async (req, res) => {
  // console.log(req.body);
  const password = req.body;
  bcrypt.hash(password, 10).then(async (hash) => {
    let newPassword = new Password({
      ...{ pasword: hash },
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    try {
      await newPassword.save();
      res.status(201).json(newPassword);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  });
};

export const updatePassword = async (req, res) => {
  const { id } = req.params;

  const { nameofwebsite, username, password, linktoreset } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No password with id: ${id}`);
  bcrypt.hash(password, 10).then(async (hash) => {
    const updatedPassword = {
      nameofwebsite,
      username,
      password: hash,
      linktoreset,
      _id: id,
    };

    await Password.findByIdAndUpdate(id, updatedPassword, { new: true });

    res.json(updatedPassword);
  });
};

export const deletePassword = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No password with id: ${id}`);

  await Password.findByIdAndRemove(id);

  res.json({ message: "This password has been successfully deleted" });
};
