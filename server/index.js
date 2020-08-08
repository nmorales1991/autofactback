//express
const express = require("express");
const app = express();

//imports
const bodyParser = require('body-parser')
const morgan = require("morgan");
const cors = require('cors')

//config
const { mongoose } = require("../config/config");


//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan("dev"));
app.use(cors())


//routes
app.use(require("../routes/index.routes"));

//server
app.listen(3001, function() {
    console.log("Aplicación escuchando puerto 3001");
});
