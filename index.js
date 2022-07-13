import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import PasswordRoutes from "../PasswordManager-Backend/routes/password.js";
import AuthRoutes from "../PasswordManager-Backend/routes/route.js";

// app.use(bodyParser.json({ limit: "30mb", extended: true }))
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
// app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use("/password", PasswordRoutes);
app.use("/auth", AuthRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
