const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')
const viewsDir = path.resolve(__dirname,'../', 'views');
const dotenv = require("dotenv");
dotenv.config();

// initialize nodemailer
var transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }

    }
);

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: viewsDir,
        defaultLayout: false,
    },
    viewPath: viewsDir,
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))

module.exports = transporter;
