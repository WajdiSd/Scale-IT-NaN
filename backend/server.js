const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");

const port = process.env.PORT || 5000;
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/members", require("./routes/memberRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
