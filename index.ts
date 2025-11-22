// import { configDotenv } from "dotenv";
import dotenv from "dotenv";
dotenv.config();


import express from "express"
import { errorHandler } from "./middlewares/errorHandler";
import urlRoutes from "./routes/url.routes";
// configDotenv()
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000;

app.use(errorHandler);
app.use("/",urlRoutes)
app.get("/", (req, res) => {
  res.send("Server running");
});



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});