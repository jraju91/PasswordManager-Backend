import mongoose from "mongoose";

const mongoURI =
  process.env.NODE_ENV === "production"
    ? process.env.CONNECTION_URL
    : "mongodb+srv://test:test@cluster0.0evvb.mongodb.net/passwordapp?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI)
  .then((instance) =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch((error) => console.log("Connection failed!", error));

export default mongoose;
