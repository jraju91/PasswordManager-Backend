import express from "express";
const router = express.Router();

import {
  createUser,
  login,
  deleteUser,
  getUsers,
  updateUser,
} from "../../PasswordManager-Backend/controllers/auth.js";

router.get("/login", login);
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
