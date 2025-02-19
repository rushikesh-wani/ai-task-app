require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/dbConnect");
const authRouter = require("./routes/auth.routes");
const taskRouter = require("./routes/taskAI.routes");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/", authRouter);
app.use("/api/v1/", taskRouter);

connectDB()
  .then(() => {
    console.log("Successfully connected to DB");
    app.listen(process.env.PORT, () => {
      console.log("Server running on PORT: ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to DB");
    console.log("Error message : ", err);
  });
