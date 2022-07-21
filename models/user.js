import mongoose from "../../PasswordManager-Backend/db/connection.js";

const Schema = mongoose.Schema;
// const websitePasswordsSchema = new Schema({
//   website: String,
//   password: String,
//   username: String,
// });

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  websitePasswords: [{ website: String, password: String, username: String }],
});

const User = mongoose.model("User", userSchema);

export default User;
