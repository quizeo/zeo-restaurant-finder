import express from "express";
import dotenv from "dotenv";
import executeRoute from "./routes/executeRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/execute", executeRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
