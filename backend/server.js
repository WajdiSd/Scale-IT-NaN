const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
var path = require('path');
//Loads the handlebars module
const { engine } = require ('express-handlebars');

const connectDB = require("./config/db");
var dir = path.join(__dirname, 'public');
const transporter = require("./config/nodemailer")


const port = process.env.PORT || 5000;
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));


app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/workspace", require("./routes/workspaceRoutes"));
app.use("/api/project", require("./routes/projectRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));


var mailOptions = {
    from: '"Scale IT" <no-reply@scaleitbynan@gmail.com>', // sender address
    to: 'wajdi.sadouki@gmail.com', // list of receivers
    subject: 'Welcome!',
    template: 'email', // the name of the template file i.e email.handlebars
    context:{
        link: "https://www.google.tn/", // replace {{link}}
    }
};

// trigger the sending of the E-mail
/*transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});*/