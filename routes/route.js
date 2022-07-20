import express from "express";
const router = express.Router();

import {
  createUser,
  login,
  deleteUser,
  getUsers,
  updateUser,
  getUser,
} from "../../PasswordManager-Backend/controllers/auth.js";

router.post("/signin", login);
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
