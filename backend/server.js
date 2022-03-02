const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

const connectDB = require('./config/db');

const port = process.env.PORT || 5000;
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


console.log('ran');

app.listen(port, () => console.log(`Server started on port ${port}`));
