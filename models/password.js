import mongoose from "../../PasswordManager-Backend/db/connection.js";

const Schema = mongoose.Schema;
const passwordSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },

  nameofwebsite: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  linktoreset: String,

  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "user",
  // },
});

const Password = mongoose.model("Password", passwordSchema);

export default Password;
