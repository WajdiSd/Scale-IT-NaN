const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
var path = require("path");
const Workspace = require("./models/workspaceModel");
const Project = require("./models/projectModel");
//Loads the handlebars module
const schedule = require("node-schedule");
const { engine } = require("express-handlebars");

const connectDB = require("./config/db");
var dir = path.join(__dirname, "public");
const transporter = require("./config/nodemailer");
const {
  updatescoremembersinworkspace,
  updatescoremembersinproject,
} = require("./helpers/functions");

const port = process.env.PORT || 5000;
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/workspace", require("./routes/workspaceRoutes"));
app.use("/api/project", require("./routes/projectRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));
app.use("/api/performance", require("./routes/performanceRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

// const job = schedule.scheduleJob("*/5 * * * * *", async () => {
//   console.log("updating workspace leaderboard");
//   const workspaces = await Workspace.find({
//     isDeleted: false,
//   });
//   const projects = await Project.find({
//     isDeleted: false,
//   });
//   if (workspaces.length > 0)
//     for (worksp of workspaces) {
//       await updatescoremembersinworkspace(worksp._id);
//     }
//   // if (projects.length > 0)
//   //   for (proj of projects) {
//   //     updatescoremembersinproject(proj._id);
//   //   }
// });

// var mailOptions = {
//   from: '"Scale IT" <no-reply@scaleitbynan@gmail.com>', // sender address
//   to: "wajdi.sadouki@gmail.com", // list of receivers
//   subject: "Welcome!",
//   template: "email", // the name of the template file i.e email.handlebars
//   context: {
//     link: "https://www.google.tn/", // replace {{link}}
//   },
// };

// trigger the sending of the E-mail
