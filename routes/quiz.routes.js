const express = require("express");
const app = express();
const Quiz = require("../models/quiz");
const { verificarToken, verificaRol } = require("../middlewares/autenticacion");

app.get("/", verificarToken, async (req, res) => {
    let usuario = req.usuariobd
    if(usuario.rol === 'ADMIN'){
        await Quiz.find((err, quiz) => {
            res.json({
              quiz,
            });
          });
    }else{
        await Quiz.find({'usuario._id': usuario._id}).sort({fecha:-1}).limit(1).exec((err, quiz) => {
            res.json({
              quiz,
            });
          });
    }
});

app.post("/", verificarToken, (req, res) => {
  let usuario = req.usuariobd;
  console.log(req)
  let { respuestas } = req.body;
  Quiz.create({
    usuario,
    respuestas
  })
    .then((quiz) => {
      res.send({ mensaje: "respuesta creada", quiz });
    })
    .catch((err) => {
      return res.status(500).json({
        err,
      });
    });
});

module.exports = app;
