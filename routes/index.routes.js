//express
const express = require("express");
const app = express();

app.use("/server/usuarios", require("./usuarios.routes"));
app.use("/server/login", require("./login.routes"));
app.use("/server/quiz", require("./quiz.routes"));

module.exports = app