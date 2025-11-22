import express from "express"
import dotenv from "dotenv"
import { errorHandler } from "./middlewares/errorHandler";

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server running");
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});