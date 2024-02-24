const express = require("express");
const cors = require("cors");
const errorHandling = require("./error/errorHandling");
const profesionalRouters = require("./routers/profesional.routers");


const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(profesionalRouters);
app.use(errorHandling);

module.exports = app; 