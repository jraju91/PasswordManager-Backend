import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import PasswordRoutes from "../passwordmanager-backend/routes/password.js";
import AuthRoutes from "../PasswordManager-Backend/routes/route.js";

// app.use(bodyParser.json({ limit: "30mb", extended: true }))
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use("/password", PasswordRoutes);
app.use("/auth", AuthRoutes);

app.get("/", (req, res) => {
  res.send({ message: "We did it!" });
});
app.get("/favicon.ico", (req, res) => {
  res.send({ message: "We did it!" });
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
